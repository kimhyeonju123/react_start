import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import Menu from "./Menu";
export default function Header({ type }) {
    const menu = useRef(null);
    const active = { color: "#000" };
    let logoURL = "";

    type === "main" ? (logoURL = "/img/logo_w.png") : (logoURL = "/img/logo_b.png");


    return (
        <header className={type}>
            <h1>
                <Link to="/">
                    <img src={process.env.PUBLIC_URL + logoURL} alt="LOGO" />
                </Link>
                <span>Here comse logo is</span>
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


            <FontAwesomeIcon icon={faBars}
                onClick={() => menu.current.toggle()} />
            <Menu ref={menu} />
        </header>
    )
}

