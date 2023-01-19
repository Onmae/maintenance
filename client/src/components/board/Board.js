import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import SearchBar from "./SearchBar";
import BBS from "./BBS";
import axios from "axios";
import Button from "../Button";
import Pagination from './Pagination';

export const Board = () => {
    const [info, setInfo] = useState([]);
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const limit = 10;
    const offset = (page-1)*limit

    const postsData = (info) => {
        if(info) {
            return info.slice(offset, offset + limit)
        }
    }

    const WriteEvent = () => {
        navigate("/write");
    }

    useEffect(() => {
        axios.get('/api/board')
            .then(res => {
                setInfo(res.data)
            })
            .catch(err => console.log(err));
    },[])

    return <>
        <div style={{
            display : 'flex', flexDirection : 'column', justifyContent : 'center'}
        }  className='my-2'>
            <SearchBar setInfo={setInfo}/>
            <BBS info={postsData(info)}/>
            <Pagination limit={limit} page={page} totalPosts={info.length} setPage={setPage}/>
            <div className='container flex justify-content-end'>
                <Button value="글쓰기" clickEvent={WriteEvent}/>
            </div>
        </div>
    </>
}

export default Board