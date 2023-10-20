import {useRef, useState, useEffect} from 'react'
import Layout from '../common/Layout'


function Community() {

	const dummyPosts = [{
		title: '부럽다',
		content: '집가고싶다'
	},{
		title: '1번 인격 김현주',
		content: '배가고프다'
	},{
		title: '2번 인격 김현주',
		content: '배가고프다'
	},{
		title: '3번 인격 김현주',
		content: '배가고프다'
	},{
		title: '4번 인격 김현주',
		content: '배가고프다'
	}]
	
	const input = useRef(null);
	const textarea = useRef(null);
	const inputEdit = useRef(null);
	const textareaEdit = useRef(null);
	const [Posts, setPosts] = useState(dummyPosts);

	// 폼요소 초기화 함수
	const resetForm = ()=>{
		input.current.value = "";
		textarea.current.value = "";
	}

	//   글 저장 함수
  	const createPost = ()=>{
		// 작성하지 않으면 리턴하면서 경고창 만들기
		if(!input.current.value.trim() || !textarea.current.value.trim()){
			resetForm();
			return alert('제목과 본문을 입력주세요')
		}
		setPosts([...Posts,{title:input.current.value, content: textarea.current.value}])
		resetForm();
	};

	// 글 삭제함수		삭제할인덱스
	const deletePost = (index)=>{
		// 고차함수 filter함수 : map하고 같은 동작원리
		// 모든 요소를 방문하여 filter에 콜백함수 내용을 적용시켜 참인 값만 배열로 반환함
		// 반면 map은 콜백함수의 내용을 적용시켜서 모두 새로운 배열로 반환하였다
		setPosts(Posts.filter((el,idx)=> idx !== index))
		/*
		index라는 매개변수는 삭제버튼을 클릭했을 때 매개변수로 들어오는 삭제할 순번에 해당되는 값
		따라서 filter로 그 index를 제외한 나머지만 따로 반환해주면 글 삭제가 되는 것

		filter고차함수를 사용해서 삭제할 때 장점
		1. 불변성 유지의 도움을 준다 (기존의 값이 새 값이 아님)
		*/ 
	}
	// 글 수정 모드로 변경하는 함수
	const enableUpdate = (index)=>{
		setPosts(
			Posts.map((el,idxx)=>{
				if(idxx === index){ el.enableUpdate = true; }return el;
			})
		)
	}
	// 실제로 업데이트를 하는 함수
	const updatePost = (index)=>{
		if(!inputEdit.current.value.trim() || !textareaEdit.current.value.trim()){
			resetForm();
			return alert('수정할 제목과 본문을 입력주세요')
		}
		setPosts(
			Posts.map((el,idxxx)=>{
				if(idxxx === index){
					el.title = inputEdit.current.value;
					el.content = textareaEdit.current.value;
					el.enableUpdate = false;
				}
				return el;
			})
		)
	}



	// 업데이트를 취소해 원상태로 되돌리눈 함수
	// 클릭해서 받은 인덱스를 매개변수로 가지고 온다
	const disableUpdate = (index)=>{
		// setPosts함수를 사용해서
		// posts에 반복을 돌면서 반복도는 index와 매개변수로 가져온 인덱스가 같다면
		// enableUpdate false로 바꾸면서 반환한다 - 원래 값을
		setPosts(
			Posts.map((el,idxxxx)=>{
				if(idxxxx === index){
					el.enableUpdate = false;
				}
				return el;
			})
		)
	}

	useEffect(() => {
	  console.log(Posts);
	}, [Posts]);
	

	return (
		<Layout name={"Community"}>
			<div className="inputBox">
				<input type="text" placeholder="제목을 입력하세요" ref={input} />
			
				<br/>

				<textarea placeholder='본문을 입력하세요' ref={textarea}></textarea>

				<br/>

				<div className="btnSetting">
				<button onClick={resetForm}>취소</button>
				<button onClick={createPost}>작성</button>
				</div>
			</div>
			<div className="showBox">
				{Posts.map((el,index)=>{
					return(
						<article key={index}>
							{/* <div className="txt">
								<h2>{el.title}</h2>
								<p>{el.content}</p>
							</div> */}
							{/* <div className="btn">
								<button onClick={()=>enableUpdate(index)}>수정</button>
								<button onClick={()=>deletePost(index)}>삭제</button>
							</div> */}
							{el.enableUpdate ? (
								<>
									<div className="editTxt">
										<input type="text" defaultValue={el.title} ref={inputEdit} />
										<br/>
										<textarea defaultValue={el.content} ref={textareaEdit}></textarea>
									</div>
									<div className="btn">
										<button onClick={()=>disableUpdate(index)}>수정취소</button>
										<button onClick={()=>updatePost(index)}>업데이트</button>
									</div>
								</>
							):(
								<>
									<div className="txt">
										<h2>{el.title}</h2>
										<p>{el.content}</p>
									</div>
									<div className="btn">
										<button onClick={()=>enableUpdate(index)}>수정</button>
										<button onClick={()=>deletePost(index)}>삭제</button>
									</div>
								</>
							)}
						</article>
					)
				})}
			</div>
		</Layout>
	)
}

export default Community