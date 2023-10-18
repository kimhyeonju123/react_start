import React from 'react'

function Visual() {

  return (
    <figure id='visual' className='myScroll'>
      <video src={process.env.PUBLIC_URL + '/img/vid.mp4'} loop muted autoPlay></video>
      {/* 비디오를 넣을 때 기존의 방법으로 하면 비디오가 검은색 어? */}
    </figure>
  )
}

export default Visual