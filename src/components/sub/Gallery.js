import { useEffect, useState,useRef } from 'react';
import Layout from '../common/Layout'
import Pop from '../common/Pop';
import axios from 'axios';
import Masonry from 'react-masonry-component';


function Gallery() {
	const frame = useRef(null);
	const input = useRef(null);
	const pop = useRef(null);
	const [Items, setItems] = useState([]);
	const [Index, setIndex] = useState(0);
	const [Loading, setLoading] = useState(true);
	const [PrevItems, setPrevItems] = useState([]); //검색결과를 저장해두는 상태(State)

	const masonryOptions = {
		transitionDuration: '0.5s'
	};
	/*
	async/await 를 사용한 코드는 비동기 작업의 흐름을 더 명확하게 보여준다
	또한 await 를 통해서 axios호출이 완료될 때까지 기다리게 함으로써 코드의 실행순서가 더 직관적이다
	*/ 
    const num = 500;
    const user = '164021883@N04';
	
	// url이라는 매개변수가 아닌 객체형식으로 변경할거임
	const getFlickr = async (obj)=>{
		const key = '4612601b324a2fe5a1f5f7402bf8d87a';
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';

		let url = '';//getFlickr 함수 호출 시 초기화하도록 한다
		// 매개변수로 받은 객체의 키값인 type에 따라서 url을 새로 만든다
		if(obj.type === 'interest'){
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
		}
		if( obj.type === 'user'){
			url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${obj.user}`;
		}
		if(obj.type === 'search'){
			url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${obj.tag}`;
		}
		try {
			const response = await axios.get(url); //json의 형식 data가 담겨져 있는 변수
			// data있냐? -> 포토즈 있냐? -> 포토즈안에 포토는 있냐?
			if(response.data && response.data.photos && response.data.photos.photo){
				setItems(response.data.photos.photo);
				setTimeout(() => {
					frame.current.classList.add("on");
					setLoading(false);
				}, 1000);
			}else{
				console.log('데이터 형식이 JSON과 일치하지 않습니다');
			}
		} catch (error) {
			console.log('데이터를 가져오는 동안 오류가 발생했습니다.');
		}
	}
	const showSearch = ()=>{
		const result = input.current.value.trim();
		if(!result) return alert('검색어를 입력하세요');
		setLoading(true);
		frame.current.classList.remove('on');
		getFlickr({type:'search', tag: result});
		input.current.value ='';
	}
	// 검색결과가 없을 때 호출할 함수
	const handleNoSearchResult = ()=>{
		// 이전 검색결과가 있으면? PrevItems의 값을 물어봄
		if(PrevItems.length > 0){
			// 있으면 setItems에 이전 결과값인 PrevItems를 넣어서 관리한다
			setItems(PrevItems);
			setTimeout(() => {
				frame.current.classList.add('on');
				setLoading(false)
			}, 1000);
		}else{
			// 없으면 초기값으로 설정된 interest로 변경해서 보여주기
			setLoading(true);
			frame.current.classList.remove('on');
			getFlickr({type:'interest'});

		}
	}
	useEffect(()=>{
		if(Items.length === 0 && Loading === false){
			// 검색결과가 없고 로딩이 한 번 돌고 사라진다면
			alert('해당 검색어의 결과값이 없습니다.');
			handleNoSearchResult();
		}
	},[Items, Loading])
	
	console.log(Index)

	useEffect(()=>{
		getFlickr({type:'interest'});
	},[])
	// 리액트에서 컴포넌트는 재사용성이 있어야 한다
	// 즉 같은 기능을 하는 컴포넌트라면 재사용할 수 있어야 한다는 뜻 (Pop.js를 재사용할 예정)
	
	return (
		<>
			<Layout name={'Gallery'}>
				{Loading && <img className='loading' src={process.env.PUBLIC_URL + '/img/loading.gif'} alt='loading' />}
				{/* map은 특별하게 반복이 아니라 콜백함수를 적용한 뒤
				배열로 반환하는 성질이 있음 */}
				<div className="frame" ref={frame}>
					<button onClick={()=>{
						setLoading(true);
						frame.current.classList.remove('on');
						getFlickr({type:'user', user: user});
					}}>나의 그림</button>
					<button onClick={()=>{
						setLoading(true);
						frame.current.classList.remove('on');
						getFlickr({type:'interest'});
					}}>흥미있는 그림</button>

					<div className="searchBox">
						<input type="text" ref={input}  onKeyUp={(e)=>{
							if(e.key === 'Enter'){
								showSearch();
							}
						}}/>
						<button onClick={()=>{
							// const result = input.current.value.trim();
							// // 검색어가 입력되지 않았을 때 return해버리고 경고창 띄워주기
							// if(!result) return alert('검색어를 입력하세요');
							// setLoading(true);
							// frame.current.classList.remove('on');
							// getFlickr({type:'search', tag: result});
							// // 검색이 그대로 남아있는 게 거슬리니까 인풋 창을 초기화하는 코드
							// input.current.value ='';
							showSearch();
						}}>검색</button>
					</div>

					<Masonry elementType={'div'} options={masonryOptions}>
						{Items.map((el,index)=>{
							let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;
							return(
								<article key={index} onClick={()=>{setIndex(index);
								//  setOpen(true)
									pop.current.open();
									// 부모 컴포넌트가 자식 Pop의 메소드인 open()을 호출
								}}>
									<div className="inner">
										<div className="pic">
											<img src={imgSrc} alt={el.title} />
										</div>
										<h2>{el.title}</h2>
									</div>
								</article>
							)
						})}

					</Masonry>
				</div>
			</Layout>
			{/* {Open && <Pop setOpen={setOpen}>
				<img src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`} alt={Items[Index].title} />
			</Pop>} */}
			<Pop ref={pop}>
				{/* 팝 컴포넌트에 참조객체 pop을 연결해줌, 원래 컴포넌트엔 참조객체 연결이 불가능하다
				하지만 forwardRef로 전달되고 있다면 가능하다 */}
				{Items.length !== 0 && 
					<img src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`} alt={Items[Index].title} />}
			</Pop>
		</>
	)
}

export default Gallery