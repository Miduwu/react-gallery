import { useState } from 'react';
import "./Endpoint.css";

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
        setTimeout(() => setCopy(<Copy path={path} done={false} />), 5000)
        setCopy(<Copy path={path} done={true} />)
        navigator.clipboard.writeText(GLOBAL_URL + path)
    }

    

    return (
        <div className='endpoint'>
            <strong>{name}</strong>
            <span className="method" style={{"backgroundColor": method == "get" ? "royalblue": "green"}}><strong className="method-text">{method}</strong></span>
            <p className='description'>{description}</p>
            <a onClick={copyButton} className='path'>{getCopy}</a>
            <div className='btns'>
            <a className='btn link' href="https://google.com"><i className="fa fa-external-link" aria-hidden="true"></i> Link</a>
            <a className='btn doc' href="https://google.com"><i className="fa fa-book" aria-hidden="true"></i> Docs</a>
            </div>
        </div>
    )
}

export default Endpoint