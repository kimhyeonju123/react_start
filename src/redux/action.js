/*
1. 액션을 생성합니다
액션이란 상태를 변경하도록 요청하는 객체입니다
*/

export const setMembers = (member) => {
    return {
        type: "SET_MEMBERS",
        payload: member
    }
}

export const setYoutube = (data) => {
    return {
        type: "SET_YOUTUBE",
        payload: data,
    }
}



/*
                         redux를 사용하기 위해 필요한 내용

- 액션 :
    어플리케이션에서 어떤 일이 일어나야 하는지를 나타내는 객체로써, 주로 사용자 상호작용, API호출, 타이머
    등으로 인한 이벤트 등이 있다.
    ex) 사용자가 로그인 버튼을 클릭하는 액션이 있음 or 서버에서 데이터를 성공적으로 받았음
    이런 이벤트 등의 액션으로 표현할 수 있다
    액션은 주로 타입(type)과 그와 필요한 데이터를 포함시킨 객체이다

- 리듀서 :
    현재 상태와 액션을 받아서 새로운 상태를 반환한다
    중요 @@@@@@ 무조건 순수 함수 @@@@@@
    ex) 로그인 액션을 처리해서 로그인 상태를 변경해야 한다
        -> 로그인 액션이 있으면 리듀서는 로그인 이전 상태를 로그인 이후의 상태로 바꿔주는 것
    * 왜 순수함수여야 하는가?
    - 네이버 로그인했는데 갑자기 쿠팡이 뜨면 어떤 기분이겠음? (UX 떡락)
    - 로그인 액션을 취하면 항상 똑같은 로그인 상태가 되어야하기 때문에 중요한 것 

    - 순수함수 : 동일한 값을 주면 언제나 똑같은 값을 내뱉는다. 
              또한 외부에도 독립적이기 때문에 외부상태에 의존하지 않는다.
              그래서 동일한 값과 동일한 결과를 보장할 수 있는 것이다.

    => 순수함수인 리듀서의 장점
        1. 디버깅이 쉽다. (버그가 일어났을 경우 찾는 경로가 정해져있기 때문에 금방 찾을 수 있음)

- 스토어 :
    애플리케이션 액션과 리듀서를 연결하고 상태(데이터)를 저장하고 관리하는 객체
    (지금 있는 DB를 스토어에 저장하면 department에서도 DB를 사용할 수 있고 다른 곳에서도 사용할 수 있다)
    스토어에 데이터를 저장하면 동일한 조건으로 같은 애플리케이션 안에서 데이터 접근이 용이함

*/