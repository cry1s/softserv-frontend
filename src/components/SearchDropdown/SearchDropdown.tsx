import React, {useRef, useState} from 'react';
import "./SearchDropdown.css"
import useOutsideAlerter from "../../util/OutsideClickAlterter";
function SearchDropdown({items, callback}) {
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const wrapper = useRef(null);
    useOutsideAlerter(wrapper, () => setOpen(false));
    return (
        <div className={"position-relative"} ref={wrapper}>
            <input className={"form-control"} placeholder={"Тег"} type={"text"} value={value} onChange={(e) => setValue(e.target.value)} onClick={() => setOpen(true)}/>
            {open && <div className={"position-absolute dropdown-results"}>
                {items.filter(i => i.name.startsWith(value)).map(i =>
                    <div className={"dropdown-selector"} onClick={() => {
                        setOpen(false)
                        callback(i)
                    }} key={i.id + "_dd"}>
                        {i.name}
                    </div>
                )}
            </div>}
        </div>
    );
}

export default SearchDropdown;
