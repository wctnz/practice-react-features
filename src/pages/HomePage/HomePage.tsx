import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchItems } from '../../store/actions/fetchItems';
import { itemsSlice } from '../../store/slices/itemsSlice';
import { Item } from '../../types/types';
import { RxCross2 } from "react-icons/rx";
import Toogle from "../../components/toggle/Toggle"
import cl from "./HomePage.module.css"

const HomePage = () => {

    const [limit, setLimit] = useState<number>(10)
    const pages: number[] = []
    const [search, setSearch] = useState<string>("")
    const [select, setSelect] = useState<string>("")
    const { error, loading, items, page, totalCount } = useAppSelector(state => state.main)
    const dispatch = useAppDispatch()
    const totalPages = Math.ceil(totalCount / limit)
    const handlePostRemove = (id: number) => {
        dispatch(itemsSlice.actions.removePost(id))
    }

    for (let i = 0; i < totalPages; i++) {
        pages.push(i + 1)
    }

    useEffect(() => {
        dispatch(fetchItems(page, limit))
    }, [page, limit, totalCount])

    return (
        <div className={cl.container}>
            <div className={cl.topSection}>
                <div>
                    <input type="search" name="search" placeholder='Поиск...' value={search} onChange={(event) => setSearch(event.target.value)} />
                </div>
                <div>
                    <select name="sort" value={select} onChange={(event) => setSelect(event.target.value)}>
                        <option value="" disabled>Отсортировать по...</option>
                        <option value="">без сортировки</option>
                        <option value="title">Заголовку</option>
                        <option value="body">Сообщению</option>
                    </select>
                </div>
                {
                    loading ? <h1>Идет загрузка...</h1> :
                        error ? <h1>{error}</h1> : (
                            items.filter(item => item.title.includes(search)).sort((a: Item, b: Item) => {
                                const selectA = (a as Record<string, any>)[select]
                                const selectB = (b as Record<string, any>)[select]
                                if (selectA < selectB) {
                                    return -1
                                } return 1
                            }).map((item: Item) => (
                                <p
                                    key={item.id}
                                >
                                    {item.id}.
                                    <Link className={cl.links} to={`/${item.id}`}>{item.title}</Link>
                                    <RxCross2
                                        className="removePostIcon"
                                        onClick={() => handlePostRemove(item.id)}
                                    /></p>
                            )))
                }
            </div>
            <div style={{ display: "flex" }}>
                {pages.map(p => (
                    <div
                        key={p}
                        onClick={() => dispatch(itemsSlice.actions.setPage(p))}
                        style={{ border: p === page ? "2px solid black" : "1px solid grey", padding: "10px", cursor: "pointer" }}
                    >{p}</div>
                ))}
            </div>
        </div >
    );
};

export default HomePage;