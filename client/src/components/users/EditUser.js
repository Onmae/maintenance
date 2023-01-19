import Button from "../Button";
import React, {useEffect, useState} from "react";
import BigColumn from "../board/BigColumn";
import Column, {ColumnHomePage, ColumnMax} from "../board/Column";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../board/modal/Loading";

export const EditUser = () => {
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [loadingOpen, setLoadingOpen] = useState(false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [board, setBoard] = useState({
        facility: "",
        siteName: "",
        siteAddress: "",
        id: "",
        password: "",
        name: "",
        callNo: "",
        phoneNo: "",
        faxNo: "",
        email: "",
        department: "",
        position: "",
    })

    useEffect(() => {
        axios.get(`/api/member/${id}`)
            .then(res => {
                setBoard((prevState) => {
                        return {...res.data,}
                    }
                )
            })
            .catch(err => console.log(err))
    }, [])

    const onChangeBoardInput = (e) => {
        setBoard({
            ...board,
            [e.target.name]: e.target.value,
        });
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }


    const goToList = () => {
        navigate("/users")
    }

    const editUser = () => {
        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인이 같지 않습니다.')
        }

        setLoadingOpen(true)
        if(Password) board.password = Password
        axios.post(`/api/member/${id}`, board)
            .then(res => {
                alert('수정이 완료되었습니다.')
                navigate("/users")
            })
            .catch(err => {
                setLoadingOpen(false)
                alert("회원정보 수정에 실패하였습니다.")
            })
        .finally(() => setLoadingOpen(false))

    }

    return (
        <>
            {loadingOpen && <Loading />}
            <div className="container">
                <div className="container border-b-2 border-t-2 border-gray-700 grid grid-rows-8 mt-8 mb-8 py-2">
                    <BigColumn>
                        <ColumnMax title="기관명">
                            <input className="h-7 border-gray-400 px-2 rounded w-80" required type="text"
                                   onChange={onChangeBoardInput} name="facility" value={board.facility} readOnly={true}/>
                        </ColumnMax>
                    </BigColumn>

                    <BigColumn>
                        <Column title="사이트명">
                            <input className="h-7 border-gray-400 px-2 rounded w-72" required type="text"
                                   onChange={onChangeBoardInput} name="siteName" value={board.siteName} readOnly/>
                        </Column>

                        <ColumnHomePage title="사이트주소" content={board.siteAddress}>
                        </ColumnHomePage>
                    </BigColumn>

                    <BigColumn>

                        <ColumnMax title="사용자 아이디">
                            <input className="h-7 border-gray-400 px-2 rounded w-40 " type="text"
                                   onChange={onChangeBoardInput} name="id" value={board.id} readOnly/>
                        </ColumnMax>
                    </BigColumn>

                    <BigColumn>
                        <ColumnMax title="사용자 암호">
                            <span> 입력 : </span>
                            <input className="h-7 border-gray-400 px-2 rounded w-25" required type="password"
                                   onChange={onPasswordHandler} value={Password} name="password"/>
                            <br/>
                            <span> 확인 : </span><input className="h-7 border-gray-400 px-2 rounded w-25"
                                                      required type="password" value={ConfirmPassword}
                                                      onChange={onConfirmPasswordHandler} name="passwordConfirm"/>
                        </ColumnMax>
                    </BigColumn>

                    <BigColumn>
                        <ColumnMax title="성명">
                            <input className="h-7 border-gray-400 px-2 rounded w-72" required type="text"
                                   onChange={onChangeBoardInput} name="name" value={board.name}/>
                        </ColumnMax>
                    </BigColumn>

                    <BigColumn>
                        <ColumnMax title="전화번호">
                            <input className="h-7 border-gray-400 px-2 rounded w-72 mr-2" required type="text"
                                   onChange={onChangeBoardInput} name="callNo" value={board.callNo || ""}/> (예 :
                            052-555-5555)
                        </ColumnMax>
                    </BigColumn>

                    <BigColumn>
                        <ColumnMax title="휴대폰">
                            <input className="h-7 border-gray-400 px-2 rounded w-72 mr-2" type="text"
                                   onChange={onChangeBoardInput} name="phoneNo" value={board.phoneNo || ""}/> (예 :
                            010-555-5555)
                        </ColumnMax>
                    </BigColumn>

                    <BigColumn>
                        <ColumnMax title="팩스번호">
                            <input className="h-7 border-gray-400 px-2 rounded w-72 mr-2" type="text"
                                   onChange={onChangeBoardInput} name="faxNo" value={board.faxNo || ""}/> (예 :
                            052-555-5555)
                        </ColumnMax>
                    </BigColumn>

                    <BigColumn>
                        <Column title="이메일">
                            <input className="h-7 border-gray-400 px-2 rounded w-72" type="text"
                                   onChange={onChangeBoardInput} name="email" value={board.email || ""}/>
                        </Column>
                    </BigColumn>

                    <BigColumn>
                        <ColumnMax title="부서">
                            <input className="h-7 border-gray-400 px-2 rounded w-72" type="text"
                                   onChange={onChangeBoardInput} name="department" value={board.department || ""}/>
                        </ColumnMax>
                    </BigColumn>

                    <BigColumn>
                        <ColumnMax title="직급">
                            <input className="h-7 border-gray-400 px-2 rounded w-72" type="text"
                                   onChange={onChangeBoardInput} name="position" value={board.position || ""}/>
                        </ColumnMax>
                    </BigColumn>


                </div>

                <div className="container flex justify-content-between my-4">
                    <Button value="목록" clickEvent={goToList}/>
                    <Button value="수정" clickEvent={editUser}/>
                </div>
            </div>


        </>

    )

}

export default EditUser