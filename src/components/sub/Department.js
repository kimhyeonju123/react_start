import { useState,useEffect } from 'react'
import React from 'react'
import Layout from '../common/Layout'
import axios from 'axios';

// 여긴 if, 기본 for문 같은 건 사용해도 무방함
function Department() {
	// jsx문법
	const [Members, setMembers] = useState([]);
	const [Colors, setColors] = useState([]);
	const path = process.env.PUBLIC_URL;
	useEffect(()=>{
		axios.get(process.env.PUBLIC_URL + '/DB/members.json')
			.then(
				(json)=>{
					setMembers(json.data.members);
					setColors(json.data.backGround);
				}
			)
	},[]);

	useEffect(()=>{
		console.log(Members)
	},[Members])

	return (
		// 엄격하게 얘기한다면 여기가 jsx문법 (반드시 지켜야 함)
		// if문을 사용하면 안되는 이유 + 기본 for문을 사용하면 안되는 이유
		// if문 같은 경우. if(){}else if/else 의 순서가 꼬임(그대로 읽지를 못하기 때문) 
		// -> 삼항연산자 / &&등의 논리연산자로 조건문을 수행해야 함
		// 반복문도 리액트에서는 반복할 때 각 요소 별로 고유 키값이 부여되어야 함
		// 하지만 기본 for문은 불가능
		// -> map으로 반복문을 사용한다
		<Layout name={'Department'}>
			{Members.map((el, index)=>(
				<article key={index}>
					<div className="inner">
						<div className="picFrame">
							<div className="reflect">
								<img src={`${path}/img/${el.pic}`} alt={el.name} />
							</div>
							<div className="pic" >
								<img src={`${path}/img/${el.pic}`} alt={el.name} />
							</div>
						</div>
						<h2>{el.name}</h2>
						<p>{el.position}</p>
					</div>
				</article>
			))}
			{/* members에 반복을 돌면서 백그라운드를 가져와서 임의로 꾸며보세요 */}
			{/* {Colors.map((el,index)=>(
				<article key={index}>
					<div className="inner">
						<h1 style={{backgroundColor:`${el.backGroundColor}`}}>{el.color}</h1>
						<p style={{color:`${el.color}`}}>{el.backGroundColor}</p>
					</div>
				</article>
			))} */}
		</Layout>
	)
}

export default Department

/*
axios vs fetch

axios
- 설치가 필요함
- 보안기능 제공
- 자동 json 데이터 변환 지원
- http 요청 기본 제공
- 다운로드 프로세스 지원

fetch
- 설치 필요 X
- 보안기능 X **중요**
- 수동 json 데이터 변환 핸들링 필요
- http 요청 제공 X
- 다운로드 프로세스 지원 X

*/ 



/*
SSR vs CSR
:웹페이지 렌더링 방식에 대한 개념임
(서버 vs 클라이언트)

SPA vs MPA
SPA (Single Page Application)
MPA (Multi Page Application)

웹 애플리케이션의 구조와 페이지 전환 방식에 대한 개념

SPA : 한 개의 html페이지만 가지며, 필요한 콘텐츠는 동적으로 js를 통해서 로드
이후 사용자와의 상호작용에 따라서 페이지를 새로고침 없이 동적으로만 업데이트
-> react (SPA + CSR)

MPA : 전통적인 웹 애플리케이션 방식
각각의 페이지마다 고유한 URL을 부여한다
사용자 요청에 따라 새로운 페이지를 전달하는 방식


리액트 - CSR의 렌더링 방식으로 SPA의 구조와 페이지 전환 방식으로 구현된 웹 어플리케이션을 만드는 도구

(리액트를 사용하면서 추가적으로 알아야하는 사항)
SSR을 사용하는 SPA
NEXT.js : 리액트 기반 SSR 지원 프레임워크

MPA -> CSR을 덧입히는 것 : 블로그 포스팅 방식

상품목록 페이지 는 전통적인 SSR을 가져옴
하지만 필터링을 하거나 정렬을 할 때는 동적으로만 하도록 CSR을 덧붙이는 하이브리드로 사용하기도 한다

(오늘날 사용 방법)
전부 사용함 but 기준은 사용성, 개발의 편의성을 고려해서 전부 사용하는 것


*/ 