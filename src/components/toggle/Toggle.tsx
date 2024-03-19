import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { themeSlice } from "../../store/slices/themeSlice";
import cl from "./Toggle.module.css"

const Toggle = () => {
    const [toggled, setToggled] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const { theme } = useAppSelector(state => state.theme)

    const handleToggle = () => {
        setToggled(!toggled)
        dispatch(themeSlice.actions.changeTheme())
    }

    useEffect(() => {
        theme === "dark" ? document.body.classList.add("dark") : document.body.classList.remove("dark")
    }, [theme])
    return (
        <div className={cl.toggleContainer}>
            <button
                className={toggled ? `${cl.toggleBtn} ${cl.toggled}` : `${cl.toggleBtn}`}
                onClick={handleToggle}>
                <div className={cl.thumb}></div>
            </button>
        </div>
    );
};

export default Toggle;