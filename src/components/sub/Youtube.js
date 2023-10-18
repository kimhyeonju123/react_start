import React, { useState,useEffect,useRef } from 'react'
import Layout from '../common/Layout'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import Pop from '../common/Pop';

/*
*/ 



function Youtube() {
	const line = useRef(null);
	const pop = useRef(null);
	const [Vid, setVid] = useState([]); //url정보를 받아오는 state
	// const [open, setOpen] = useState(false); //유튜브 보여줄까~말까 state
	const [Index, setIndex] = useState(0); // 인덱스 관리 state
	
	const getYoutube = async ()=>{
		let key = "AIzaSyDaWo16cEje7ftd9bF_heih_RBi6QSU7EY";
		let playlistId = "PLNCVsPGJtmt8lvwCwXTR31wX42XL2z3vn";
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}`;
	
		axios.get(url).then((json)=>{setVid(json.data.items);})
	}
	
	useEffect(()=>{
		getYoutube()
	},[])

	useEffect(()=>{
		console.log(Vid)
	},[Vid])

	return (
		<>
			<Layout name={'Youtube'}>
				{Vid.map((el,index)=>(
					<article key={index}>
						{/* <h2>{el.snippet.title.substr(0, 30)+'...'}</h2> */}
						<h2>{el.snippet.title.length > 30 ? el.snippet.title.substr(0,30) + '...' : el.snippet.title}</h2>
						<div className="txt">
							<p>{el.snippet.description.substr(0,200) + '...'}</p>
							<span>{el.snippet.publishedAt.split('T')[0]}</span>
						</div>
						<div className="pic">
							<img src={`${el.snippet.thumbnails.standard.url}`} alt={el.snippet.title}/>
							<FontAwesomeIcon icon={faYoutube} ref={line} onClick={()=>{pop.current.open(); setIndex(index);}}/>
							{/* useRef에 current라는 공간안에 line을 넣어두면 참조할 수 있다 */}
							{/* 참조할 수 있을줄 알았는데 안됨 -> index관리하는 State(Index, setIndex)만들어서 관리해준다 */}
						</div>
					</article>
				))}
			</Layout>	
			{/* {open && <Pop setOpen={setOpen}>
			레이아웃 거기서 뭔가를 클릭하는 순간 그 false가 true로 바뀌면서 pop이 딱 하고 나타남 (원래 false라서 무시)
				<iframe src={`https://www.youtube.com/embed/${Vid[Index].snippet.resourceId.videoId}`} frameBorder={0}></iframe>
			</Pop>} */}
			<Pop ref={pop}>
				{Vid.length !== 0 && 
				(<iframe src={`https://www.youtube.com/embed/${Vid[Index].snippet.resourceId.videoId}`} frameBorder={0}></iframe>)}
			</Pop>

		</>
	)
}

export default Youtube