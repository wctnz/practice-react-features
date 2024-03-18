import { useState } from "react";
import cl from "./Toggle.module.css"

const Toggle = () => {
    const [toggled, setToggled] = useState<boolean>(false)
    return (
        <div className={cl.toggleContainer}>
            <button
                className={toggled ? `${cl.toggleBtn} ${cl.toggled}` : `${cl.toggleBtn}`}
                onClick={() => setToggled(!toggled)}>
                <div className={cl.thumb}></div>
            </button>
        </div>
    );
};

export default Toggle;