import { NavLink, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRef  } from "react";
import Menu from "./Menu";
// props는 상위 파일에서 하위 파일로 전해지는 모든 것을 받는 매개변수
export default function Header({ type }) {
    const menu = useRef(null);
    const active = { color: "#000" };
    let logoURL = "";
    // 메인일 경우 어떤 URL이 들어가고
    // 서브일 경우 어떤 URL이 들어가는지
    // 삼항연산자로 사용해서 구분할 예정(if문 사용불가)
    // 삼항연산자로 type의 값이 main인지를 물어본다
    // 참이면 logoURL에 ./img/logo_w.png
    // 거짓이면 logoURL에 ./img/logo_b.png
    // (type === 'main') ? (logoURL = './img/logo_w.png') : (logoURL = './img/logo_b.png') 쌤코드
    logoURL = (type === 'main') ? ('./img/logo_w.png') : ('./img/logo_b.png')
    return (
        <header className={type}>
            <h1>
                <Link to="/">
                    <img src={process.env.PUBLIC_URL + logoURL} alt="LOGO" />
                </Link>
                <span>Here comes logo is</span>
            </h1>
            <nav id="webGnb">
                <ul id="gnb">
                    <li>
                        <NavLink to="/department" activeStyle={active}>
                            Department
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/community" activeStyle={active}>
                            Community
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/gallery" activeStyle={active}>
                            Gallery
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/youtube" activeStyle={active}>
                            Youtube
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/location" activeStyle={active}>
                            Location
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/members" activeStyle={active}>
                            Members
                        </NavLink>
                    </li>
                </ul>
            </nav>


            <FontAwesomeIcon icon={faBars} onClick={()=>menu.current.toggle()} />
            <Menu ref={menu}/>

        </header>
    )
}

