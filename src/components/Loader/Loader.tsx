import React from 'react';
import "./loader.css";
function Loader() {
    return (
        <div className={"loader-main"}>
            <div className={"loader-inner"}>
                <span className="loader"></span>
            </div>
        </div>
    );
}

export default Loader;
