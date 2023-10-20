import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { setYoutube, setMembers } from "./redux/action";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
//common
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
//main
import Main from "./components/main/Main";
//sub
import Community from "./components/sub/Community";
import Department from "./components/sub/Department";
import Gallery from "./components/sub/Gallery";
import Location from "./components/sub/Location";
import Members from "./components/sub/Members";
import Youtube from "./components/sub/Youtube";

import "./scss/style.scss";

function App() {
	const dispatch = useDispatch();

	const getYoutube = async () => {
		let key = "AIzaSyBxnZ1kg_BJjZCcQrxHM4iiBdGWtEnUNgE";
		let playlistId = "PLOUTaH0Ih5K8zV_dti0-4B_G39jP84oq2";
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}`;
		axios.get(url).then((json) => {
			dispatch(setYoutube(json.data.items))
		})
	}
	const getMember = async () => {
		const url = process.env.PUBLIC_URL + "/DB/members.json";
		await axios.get(url).then((json) => {
			dispatch(setMembers(json.data.members));
		})
	}

	//마운트될때 한번만 겟유트브함수가 실행되도록 useEffect사용
	useEffect(() => {
		getYoutube();
		getMember();
	}, [])

	return (
		<>
			<Switch>
				<Route exact path="/" component={Main} />
				<Route path="/" render={() =>
					<Header type={"sub"} />
				} />
			</Switch>
			<Route path="/department" component={Department} />
			<Route path="/community" component={Community} />
			<Route path="/gallery" component={Gallery} />
			<Route path="/location" component={Location} />
			<Route path="/members" component={Members} />
			<Route path="/youtube" component={Youtube} />
			<Footer />
		</>
	);
}

export default App;
