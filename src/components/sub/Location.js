import React, { useEffect, useRef, useState } from 'react'
import Layout from '../common/Layout'


function Location() {
	const {kakao} = window;
	const info = [{
		title:'우리인재개발원',
		latlng:new kakao.maps.LatLng(37.4868352, 126.780001),
		imgSrc:process.env.PUBLIC_URL + '/img/marker1.png', 
		imgSize: new kakao.maps.Size(232,99),
		imgPoz: {offset: new kakao.maps.Point(116,99)}
	},{
		title : "지점1",
		latlng : new kakao.maps.LatLng(37.579617, 126.977041),
		imgSrc : process.env.PUBLIC_URL +"/img/marker2.png",
		imgSize : new kakao.maps.Size(232, 99),
		imgPos : {offset: new kakao.maps.Point(116, 99)},
	},{
		title : "지점2",
		latlng : new kakao.maps.LatLng(36.3727807, 127.3536125),
		imgSrc : process.env.PUBLIC_URL +"/img/marker3.png",
		imgSize : new kakao.maps.Size(232, 99),
		imgPos : {offset: new kakao.maps.Point(116, 99)}, 
	}]
	
	const container = useRef(null);
	const [Info, setInfo] = useState(info);
	const [Location, setLocation] = useState(null);
	// 출력 여부를 결정할 불린값을 useState로 담는다
	const [Traffic, setTraffic] = useState(false);
	const [Index,setIndex] = useState(0);

	var option ={
		center: Info[Index].latlng,
		level: 3,
	}
	const imgSrc = Info[Index].imgSrc;
	const imgSize = Info[Index].imgSize;
	const imgPoz = Info[Index].imgPoz;

	const markerImg = new kakao.maps.MarkerImage(imgSrc,imgSize,imgPoz);

	const marker = new kakao.maps.Marker({
		position:option.center,
		image: markerImg
	})
	// 여기에서의 useEffect가 하는 역할 : 지도를 그리는 역할 
	useEffect(()=>{
		container.current.innerHTML = '';
		// innerHTML은 태그 안의 내용을 모두 리셋하는데
		// 그것을 이용해서, 기존의 지도를 리셋하고 다시 지도를 그리도록 한다
		// => 지도 중첩 현상을 해결 

		// 토글버튼으로 작업 -> trffic
		const map_instance = new kakao.maps.Map(container.current, option);
		marker.setMap(map_instance);
		setLocation(map_instance);
		const mapTypeControl = new kakao.maps.MapTypeControl();
		map_instance.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMLEFT);
		const zoomControl = new kakao.maps.ZoomControl();
		map_instance.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

		// 리사이즈 시 계속 지도를 가운데 위치하도록 하는 함수를 만듦
		const handleResize = ()=>{
			map_instance.setCenter(Info[Index].latlng);
		}
		// 리사이즈 이벤트가 일어날 때 위의 핸들리사이즈함수를 호출하도록 한다
		window.addEventListener('resize',handleResize);
		// (클린업 함수) 언마운트 될 때 removeEventListener를 발생해서 전역객체인 window에 resize이벤트를 제거해준다
		return ()=>{
			window.removeEventListener('resize',handleResize);
		}

	},[Index])
	/*
	처음 마운트 될 때 실제적으로 map을 그려주는 map_instance에 담긴 값들이 구현되어야 맵이 그려진다
	따라서 setLocation을 통해서 map_instance를 state값으로 변경시켜서 처음 렌더링에서 그려줌 -> 결과로 Location이라는 state에 값이 담김

		@@@ 중요 @@@
		useState와 useEffect를 섞어서 사용할 때
		반드시 선후관계를 생각해야 됨
		즉 state값이 없는 상태에서 useEffect가 실행되는 경우를 막아야 한다
		예시) if(!Location) return

	*/ 
	useEffect(()=>{
		if(!Location) return;
		// 초기 마운트 시에는 Location에는 값이 없으므로 아래의 오버레이를 븥일 수 없기에 오류가 발생함
		// -> if문으로 return해야 됨
		Traffic ? 
		// 1. 트래픽이 보이려면, 트래픽함수가 실행되어야 한다            // 2. 트래픽이 안보이려면 트래픽 제거함수가 실행되어야 한다
		Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC) : Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
	},[Traffic])
	

	return (
		<Layout name={'Location'}>
		<p>Location</p>
		<div id="map" ref={container}></div>
		{/* 지금 Traffic이 false인데 저거 눌럿으면 ! 때문에 true로 바뀜 */}
		<button onClick={()=>setTraffic(!Traffic)}>{Traffic ? "트래픽 오프" : "트래픽 온"}</button>
		{/* <button onClick={()=>Location.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)}>트래픽 온</button>
		<button onClick={()=>Location.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)}>트래픽 오프</button> */}
		<ul className="branch">
			{/* <li onClick={()=>setIndex(0)}>{Info[0].title}</li>
			<li onClick={()=>setIndex(1)}>{Info[1].title}</li>
			<li onClick={()=>setIndex(2)}>{Info[2].title}</li> */}
			{Info.map((el,index)=>{
				return(
					<li className={index === 0 ? 'on' : ''} key={index} onClick={()=>setIndex(index)}>{el.title}</li>
				)
			})}
		</ul>
		</Layout>
	)
}

export default Location