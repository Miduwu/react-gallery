import './Gallery.css'
import { useState, useEffect } from 'react';

const GLOBAL_URL = "https://api.munlai.me"

function Copy({ path, done }) {
    return (
        <>
            <span className='text'>{path}</span>{done ? <i className="fa fa-check" aria-hidden="true"></i>: <i className="fa fa-clipboard" aria-hidden="true"></i>}
        </>
    )
}

function Endpoint({ name, description, path, method }) {
    let [getCopy, setCopy] = useState(<Copy path={path} done={false} />)
    function copyButton() {
        setCopy(<Copy path={path} done={true} />)
        navigator.clipboard.writeText(GLOBAL_URL + path)
        setTimeout(() => {
            setCopy(<Copy path={path} done={false} />)
        }, 5000)
    }

    return (
        <div className='endpoint'>
            <strong>{name}</strong>
            <span className="method" style={{"backgroundColor": method == "get" ? "royalblue": "green"}}><strong className="method-text">{method}</strong></span>
            <p className='description'>{description}</p>
            <a onClick={copyButton} className='path'>{getCopy}</a>
            <div className='btns'>
            <button className='btn link' href={`https://api.munlai.me${path}`}><i className="fa fa-external-link" aria-hidden="true"></i> Link</button>
            <button className='btn doc' href={"https://google.com"}><i className="fa fa-book" aria-hidden="true"></i> Docs</button>
            </div>
        </div>
    )
}

function Gallery() {
    let [endpoints, setEndpoints] = useState([])
    useEffect(() => {
       async function fetchAPI() {
            let b = await fetch("https://api.munlai.me/openapi.json", { mode: "cors" });
            let json = await b.json()
            let d = []
            for(const key of Object.keys(json.paths)) {
                let m = Object.keys(json.paths[key])[0]
                d.push({ name: json.paths[key][m].summary, description: json.paths[key][m].description, path: key, method: m })
            }
           setEndpoints(d)
       }
       fetchAPI()
   }, [])

    return (
        <>

        <header id='header'>
            <div className="logo">
                <strong>Moonlight API <i className="fa fa-moon-o" aria-hidden="true"></i></strong>
                <p>A powerful API written in TypeScript.</p>
            </div>
        </header>
        <section className='container'>
            {endpoints.map((r, index) => <Endpoint key={index} name={r.name} description={r.description} path={r.path} method={r.method}/>)}
        </section>
        </>
    )
}

export default Gallery
