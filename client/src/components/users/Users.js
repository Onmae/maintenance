import Tr from "../grid/Tr";
import axios from "axios";
import {useEffect, useState} from "react";

export const Users = () => {
    const [info, setInfo] = useState([])

    useEffect(() => {
        axios.get('/api/member')
            .then(res => setInfo(res.data))
            .catch(err => console.log(err));

    }, [])

    return (
        <>
            <table className="container border-b-2 border-gray-700 mt-8 mb-8 py-2">
                <thead className='justify-between'>
                <tr className='border-b-2 border-t-2 text-gray-300 border-black text-sm text-center'>
                    <th className="text-gray-700 px-1 py-3 ">아이디</th>
                    <th className="text-gray-700 px-4 py-3 ">부서</th>
                    <th className="text-gray-700 px-4 py-3 ">직위</th>
                    <th className="text-gray-700 px-4 py-3 ">이름</th>
                    <th className="text-gray-700 px-4 py-3 ">전화번호</th>
                    <th className="text-gray-700 px-4 py-3 ">FAX</th>
                    <th className="text-gray-700 px-4 py-3 ">이메일</th>
                    <th className="text-gray-700 px-4 py-3 ">사이트명</th>
                </tr>
                </thead>
                <Tr info={info} whereFrom="edituser" linkLocation={0} className={"text-center user"}/>
            </table>
            <div className="container max-w-screen-lg mx-auto">
            </div>
        </>
    )
}

export default Users