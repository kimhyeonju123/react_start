import { useEffect, useState,useRef } from 'react';
import Layout from '../common/Layout'
import Pop from '../common/Pop';
import axios from 'axios';
import Masonry from 'react-masonry-component';


function Gallery() {
	const frame = useRef(null);
	const [Items, setItems] = useState([]);
	const [Index, setIndex] = useState(0);
	const [Open, setOpen] = useState(false);
	const [Loading, setLoading] = useState(true);
	const masonryOptions = {
		transitionDuration: '0.5s'
	};
	/*
	async/await 를 사용한 코드는 비동기 작업의 흐름을 더 명확하게 보여준다
	또한 await 를 통해서 axios호출이 완료될 때까지 기다리게 함으로써 코드의 실행순서가 더 직관적이다
	*/ 
	const key = '4612601b324a2fe5a1f5f7402bf8d87a';
    const method_interest = 'flickr.interestingness.getList';
    const method_user = 'flickr.people.getPhotos';
    const num = 500;
    const user = '164021883@N04';
    const url_interest = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
    const url_user = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${user}`;

	const getFlickr = async (url)=>{
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
	
	console.log(Index)

	useEffect(()=>{
		getFlickr(url_interest);
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
						getFlickr(url_user);
					}}>나의 그림</button>
					<button onClick={()=>{
						setLoading(true);
						frame.current.classList.remove('on');
						getFlickr(url_interest);
					}}>흥미있는 그림</button>
					<Masonry elementType={'div'} options={masonryOptions}>
						{Items.map((el,index)=>{
							let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;
							return(
								<article key={index} onClick={()=>{setIndex(index); setOpen(true)}}>
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
			{Open && <Pop setOpen={setOpen}>
				<img src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`} alt={Items[Index].title} />
			</Pop>}
		</>
	)
}

export default Gallery