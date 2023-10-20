import { combineReducers } from "redux";

//초기 데이터를 state에 저장했다가 추구 action 객체가 전달되면
// 액션의 타입에 따라서 기존의 데이터(state)를 변경해서 리턴하는 함수
//디폴트 파라미터 
const memberReducer = (state = { members: [] }, action) => {
    switch (action.type) {
        case "SET_MEMBERS":
            return { ...state, members: action.payload };
        // case "SET_COLORS" :

        default:
            return state;
    }
    // 상태값이 변화가 없습니다
    //왜냐하면 member를 추가하는것이 아니라, state값을 가지고와서 사용하는 목적이라서 지금예제에서는 상태값의 변화는 없습니다
}

const youtubeReducer = (state = { youtube: [] }, action) => {
    switch (action.type) {
        case "SET_YOUTUBE":
            return { ...state, youtube: action.payload }
        default:
            return state;
    }
}



const reducers = combineReducers({ memberReducer, youtubeReducer });

export default reducers

/*
라이브러리
- hook :
    리액트에서 사용하는 기능

- useReducer :
    리액트의 내장된 hook 중 하나
    리액트 어플리케이션 상태관리를 위한 방법이다
    일반적으로 컴포넌트 내부에서 상태를 관리한다
    .한 컴포넌트 내에서만 상태를 공유하고 업데이트를 진행한다 (지역적)

반면 Redux :
    별도의 라이브러리로 리액트와 독립적으로 사용이 가능함
    어플리케이션의 전역 상태 관리를 위한 고급 도구임
    .여러 컴포넌트에서 전역 상태를 공유하고 업데이트를 진행한다 (전역적)

*/