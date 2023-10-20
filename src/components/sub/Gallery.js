import Layout from '../common/Layout'
import Pop from "../common/Pop";
import axios from 'axios';
import Masonry from "react-masonry-component";
import { useEffect, useState, useRef } from 'react';
function Gallery() {
  const frame = useRef(null);
  const input = useRef(null);  ///
  const pop = useRef(null);
  const [Items, setItems] = useState([]);
  const [Index, setIndex] = useState(0);
  // const [Open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [PrevItems, setPrevItems] = useState([]); //검색결과를 저장해두는 상태

  const masonryOptions = { transitionDuration: '0.5s' };
  ////////
  const num = 500;
  const user = '164021883@N04';



  //url이라는 매개변수가 아닌 객체형식으로 변경하려고합니다
  const getFlickr = async (obj) => {
    const key = '4612601b324a2fe5a1f5f7402bf8d87a';
    const method_interest = 'flickr.interestingness.getList';
    const method_user = 'flickr.people.getPhotos';
    const method_search = 'flickr.photos.search';

    let url = ""; //getFlickr함수 호출시초기화하도록합니다
    //매개변수로 받은 객체의 키값인 type에 따라서 url을 새로 만듦
    if (obj.type === "interest") {
      url = `https://www.flickr.com/services/rest/?method=${method_interest}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1`;
    }
    if (obj.type === "user") {
      url = `https://www.flickr.com/services/rest/?method=${method_user}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&user_id=${obj.user}`;
    }
    if (obj.type === "search") {
      url = `https://www.flickr.com/services/rest/?method=${method_search}&per_page=${num}&api_key=${key}&format=json&nojsoncallback=1&tags=${obj.tag}`
    }

    try {
      const response = await axios.get(url); //json의 형식Data가 담겨져 있는 변수
      if (response.data && response.data.photos && response.data.photos.photo) {
        setItems(response.data.photos.photo);
        setTimeout(() => {
          frame.current.classList.add("on");
          setLoading(false);
        }, 1000)

      } else {
        console.log("데이터 형식이 JSON과 다릅니다");
      }
    } catch (error) {
      console.log("데이터를 가져오는 동안 오류가 발생했습니다")
    }
  }
  const showSearch = () => {
    const result = input.current.value.trim();
    if (!result) return alert("검색어를 입력하세요");//
    setLoading(true);
    frame.current.classList.remove("on");
    getFlickr({ type: "search", tag: result });
    //인풋창을 초기화하는 코드
    input.current.value = "";
  }
  //검색결과가 없을때 호출할 함수
  const handleNoSearchResults = () => {
    //이전 검색결과가 있으면? PrevItems의 값을 물어봄
    if (PrevItems.length > 0) {
      //있으면 setItems에 이전 결과값인 PrevItems를 넣어서 관리합니다
      setItems(PrevItems);
      setTimeout(() => {
        frame.current.classList.add("on");
        setLoading(false);
      }, 1000);
    } else {
      //이전 검색결과가 없으면?
      //초기값으로 설정된 interist로 변경해서 보여주게합니다
      setLoading(true);
      frame.current.classList.remove("on");
      getFlickr({ type: 'interest' });
    }
  }
  useEffect(() => {
    if (Items.length === 0 && Loading === false) {
      alert("해당검색어의 결과값이 없습니다, 다시 검색해주세요")
      handleNoSearchResults();
    }
  }, [Items, Loading]);


  useEffect(() => {
    getFlickr({ type: "interest" })
  }, []);
  return (
    <>
      <Layout name={"Gallery"}>

        {Loading && <img className='loading' src={process.env.PUBLIC_URL + '/img/loading.gif'} alt="loading" />}




        <div className="frame" ref={frame}>

          <button onClick={() => {
            setLoading(true);
            frame.current.classList.remove("on");
            getFlickr({ type: "user", user: user });
          }}>나의 그림</button>

          <button onClick={() => {
            setLoading(true);
            frame.current.classList.remove("on");
            getFlickr({ type: "interest" });
          }}
          >흥미있는 그림</button>

          <div className="searchBox">
            <input type="text" ref={input}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  showSearch();
                }
              }}
            />
            <button onClick={() => {
              const result = input.current.value.trim();
              if (!result) return alert("검색어를 입력하세요");//
              setLoading(true);
              frame.current.classList.remove("on");
              getFlickr({ type: "search", tag: result });
              //인풋창을 초기화하는 코드
              input.current.value = "";
            }}>검색</button>
          </div>

          <Masonry elementType={"div"} options={masonryOptions}>
            {Items.map((el, index) => {
              return (
                <article key={index} onClick={() => {
                  setIndex(index);
                  //  setOpen(true); 
                  pop.current.open();
                  //부모 컴포넌트가 자식Pop의 매소드인 open()을 호출
                }}>
                  <div className="inner">
                    <div className="pic">
                      <img src={`https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`}
                        alt={el.title} />
                    </div>
                    <h2>{el.title}</h2>
                  </div>
                </article>
              )
            })}
          </Masonry>
        </div>
      </Layout>
      {/* {Open && (<Pop setOpen={setOpen}>
        <img src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`} alt={Items[Index].title} />
      </Pop>)
      } */}

      <Pop ref={pop}>
        {/* 팝 컴포넌트에 참조객체 pop을 연결을 해줌, 원래 컴포넌트에는 참조객체 연결이 불가능합니다
        forwardRef로 전달되고 있다면 가능합니다 */}

        {Items.length !== 0 && (
          <img src={`https://live.staticflickr.com/${Items[Index].server}/${Items[Index].id}_${Items[Index].secret}_b.jpg`} alt={Items[Index].title} />
        )}
      </Pop>
    </>
  )
}

export default Gallery