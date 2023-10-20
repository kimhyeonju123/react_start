import React from 'react'
import { useSelector } from 'react-redux'


function News() {

    const path = process.env.PUBLIC_URL;
    const Members = useSelector((store) => store.memberReducer.members);

    return (
        <section id="news" className="myScroll">
            <h1>News</h1>

            <ul>
                {Members.map((el, index) => {
                    return (
                        <li key={index}>
                            <img src={`${path}/img/${el.pic}`} alt={el.name} />
                            <p>{el.name}</p>

                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default News