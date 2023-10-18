import { combineReducers } from "redux";

const initMember = {
    "members": [
        {
            name: "Julia",
            position: "President",
            pic: "member1.jpg"
        },
        {
            name: "David",
            position: "Vice President",
            pic: "member2.jpg"
        },
        {
            name: "Emily",
            position: "UI Designer",
            pic: "member3.jpg"
        },
        {
            name: "Paul",
            position: "Front-end Engineer",
            pic: "member4.jpg"
        },
        {
            name: "Sara",
            position: "Back-end Engineer",
            pic: "member5.jpg"
        },
        {
            name: "Michael",
            position: "Project Manager",
            pic: "member6.jpg"
        }
    ]
}
// 초기 데이터를 state에 저장했다가 추구 action 객체가 전달되면
// 액션 타입에 따라서 기존의 데이터(state)를 변경해서 리턴하는 함수
// 디폴트 파라미터
const memberReducer = (state = initMember, action)=>{
    switch(action.type){
        case 'SET_MEMBERS':
            return{...state, members: action.payload};
        default:
            return state;
    }
    // 상태값이 변하지 않음
    // 왜? -> member를 추가하는 것이 아닌, state값을 가지고 와서 사용하는 것이 목적임
    // 때문에 지금 예제에서는 상태값의 변화가 일어나지 않는다
}

const reducers = combineReducers({memberReducer});
export default reducers;
// 밖으로 내보내 주자 reducers를

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
    별도의 라이브러리로 리액트와 독립적으로 사용이 가능힘
    어플리케이션의 전역 상태 관리를 위한 고급 도구임
    .여러 컴포넌트에서 전역 상태를 공유하고 업데이트를 진행한다 (전역적)



*/ 