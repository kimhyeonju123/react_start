import { useEffect, useState } from 'react';
import Layout from '../common/Layout'
import Pop from '../common/Pop';
import axios from 'axios';


function Gallery() {
	const base = "https://www.flickr.com/services/rest/?";
	const method = "flickr.interestingness.getList";
	const key = "6583107ee02a2fb33475eebe21213fbd";
	const per_page = 8;
	const format = "json";
	const url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1`;

	const [Items, setItems] = useState([]);
	const [Index, setIndex] = useState(0);
	const [Open, setOpen] = useState(false);
	
	console.log(Index)

	useEffect(()=>{
		axios.get(url).then((json)=>{
			setItems(json.data.photos.photo)
		})
	},[])
	// 리액트에서 컴포넌트는 재사용성이 있어야 한다
	// 즉 같은 기능을 하는 컴포넌트라면 재사용할 수 있어야 한다는 뜻 (Pop.js를 재사용할 예정)
	
	return (
		<>
			<Layout name={'Gallery'}>
				{/* map은 특별하게 반복이 아니라 콜백함수를 적용한 뒤
				배열로 반환하는 성질이 있음 */}
				{Items.map((el,index)=>{
					let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;
					return(
						<article key={index} onClick={()=>{setIndex(index); setOpen(true
						)}}>
							<div className="pic">
								<img src={imgSrc} alt={el.title} />
							</div>
							<h2>{el.title}</h2>
						</article>
					)
				})}
			</Layout>
			{Open && <Pop setOpen={setOpen}>
				<img src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`} alt={Items[Index].title} />
			</Pop>}
		</>
	)
}

export default Gallery