import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import Endpoint from './Endpoint';
import "./Gallery2.css";

function Gallery() {
    let [Routes, setRoutes] = useState([])
    let [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 5000)
        const fetchRoutes = async() => {
            let b = await fetch("https://api.munlai.me/openapi.json", { mode: "cors" });
            let json = await b.json(), d = []
            for(const key of Object.keys(json.paths)) {
                let m = Object.keys(json.paths[key])[0]
                d.push({ name: json.paths[key][m].summary, description: json.paths[key][m].description, path: key, method: m })
            }
           setRoutes(d)
       }
       fetchRoutes()
    }, [])
    if(isLoading) return <LoadingScreen />

    return (
        <>
        <header id='header'>
            <div className="logo">
                <strong>APY<i className="fa fa-moon-o" aria-hidden="true"></i></strong>
                <p>A powerful API written in <span className="python">Python</span></p>
            </div>
        </header>
        <section className='container'>
            {Routes.map((r, index) => <Endpoint key={index} name={r.name} description={r.description} path={r.path} method={r.method}/>)}
        </section>
        </>
    )
}

export default Gallery