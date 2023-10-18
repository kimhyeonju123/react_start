import { createStore } from "redux";
import reducers from "./reducer";

// reducers는 왜 가져왔는가? -> 스토어 공간을 createStore로 생성한 다음
// 전달된 reducer를 받아서 저장하고 내보내는 작업이 필요하다
// 그래서
const store = createStore(reducers);
export default store