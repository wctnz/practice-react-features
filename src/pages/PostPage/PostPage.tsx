import { FOCUSABLE_SELECTOR } from '@testing-library/user-event/dist/utils';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchItem } from '../../store/actions/fetchItems';
import cl from "./PostPage.module.css"
import { RxCross2 } from "react-icons/rx";

const PostPage = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const { error, loading, item } = useAppSelector(state => state.currentItem)
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const navigate = useNavigate()
    const goBack = () => navigate(-1)

    const handleModal = () => {
        setVisible(prev => !prev)
        console.log("visible", visible)
    }

    useEffect(() => {
        dispatch(fetchItem(Number(id)))
    }, [])

    return (
        loading ? <h1>Идет загрузка...</h1> :
            <div className={ cl.container }>
                <div 
                onClick={ () => setVisible(false) }
                className={visible ? `${cl.myModal} ${cl.active}` : `${cl.myModal}`}>
                    <div 
                    onClick={ e => e.stopPropagation() }
                    className={cl.myModalContent}>
                        <div
                            className={cl.buttonClose}
                        ><RxCross2
                                onClick={() => setVisible(false)}
                            /></div>
                        {item.body}
                    </div>
                </div>
                <h1>{item.title}</h1>
                <p
                    onClick={handleModal}
                >{item.body}</p>
                <div>
                    <button
                        onClick={goBack}
                    >Назад</button>
                </div>
            </div >
    );
};

export default PostPage;