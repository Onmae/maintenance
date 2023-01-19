import Button from "../Button";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import BigColumn from "../board/BigColumn";
import Column, {ColumnButton, ColumnMax} from "../board/Column";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"
import Loading from "../board/modal/Loading";

let isIdCheck = false

export const AddUser = () => {
    const navigate = useNavigate()
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [loadingOpen, setLoadingOpen] = useState(false)
    const inputRef = useRef();

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

    useLayoutEffect(() => {
        if (inputRef.current !== null) inputRef.current.focus()
    }, [])

    useEffect(() => {
        setBoard({
            ...board,
            facility: Cookies.get("facility")
        })
    }, [])

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const goToList = () => {
        navigate("/users")
    }

    const requireHandler = (e) => {
        if (!board.facility) {
            alert("기관명을 입력해주세요")
            return false
        }

        if (!board.siteName) {
            alert("사이트명을 입력해주세요")
            return false
        }

        if (!board.siteAddress) {
            alert("사이트주소를 입력해주세요")
            return false
        }

        if (!board.name) {
            alert("이름을 입력해주세요")
            return false
        }

        return true
    }

    const checkId = () => {
        axios.get(`/api/member/${board.id}/exists`)
            .then(res => {
                if (!res.data) {
                    isIdCheck = true
                    return alert("사용 가능한 아이디 입니다")
                }
                return alert("사용 불가능한 아이디 입니다.")
            })
            .catch(err => console.log(err))
    }

    const onChangeBoardInput = (e) => {
        if (e.target.name === "id") isIdCheck = false

        setBoard({
            ...board,
            [e.target.name]: e.target.value,
        });
    }

    const saveUser = () => {
        if (!requireHandler()) return

        if (isIdCheck === false) return alert("아이디를 확인해주세요")
        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인이 같지 않습니다.')
        }

        setLoadingOpen(true)
        board.password = Password
        axios.post('/api/memberCreate', board)
            .then(res => {
                alert('회원 가입이 완료되었습니다.')
                navigate("/users")
            })
            .catch(err => {
                alert("회원 가입에 실패되었습니다.")
            })
            .finally(() => setLoadingOpen(false))
    }


    return (
        <>
            {loadingOpen && <Loading/>}
            <div className="container">
                <div className="container border-b-2 border-t-2 border-gray-700 grid grid-rows-8 mt-8 mb-8 py-2">
                    <BigColumn>
                        <ColumnMax title="기관명">
                            <input className="h-7 border-gray-400 px-2 rounded w-80" required type="text"
                                   value={board.facility} onChange={onChangeBoardInput} name="facility" maxLength={30}
                                   readOnly={Cookies.get("role") !== "ADMIN"}/>
                        </ColumnMax>
                    </BigColumn>

                    <BigColumn>
                        <Column title="사이트명">
                            <input className="h-7 border-gray-400 px-2 rounded w-72" required type="text"
                                   onChange={onChangeBoardInput} value={board.siteName} name="siteName" maxLength={30}
                                   ref={inputRef}/>
                        </Column>

                        <Column title="사이트주소">
                            <div>http:// <input className="h-7 border-gray-400 px-2 rounded w-80" required
                                                type="text" value={board.siteAddress} maxLength={100}
                                                onChange={onChangeBoardInput} name="siteAddress"/></div>
                        </Column>
                    </BigColumn>

                    <BigColumn>

                        <ColumnButton title="사용자 아이디">
                            <input className="h-7 border-gray-400 px-2 rounded w-40" required type="text"
                                   onChange={onChangeBoardInput} value={board.id} name="id" maxLength={30}/>
                            <Button value="아이디 확인" clickEvent={checkId}/>
                        </ColumnButton>


                        <Column title="사용자 암호">
                            <span> 입력 : </span>
                            <input className="h-7 border-gray-400 px-2 rounded w-40" required type="password"
                                   onChange={onPasswordHandler} value={Password} name="password"/>
                            <br/>
                            <span> 확인 : </span><input className="h-7 border-gray-400 px-2 rounded w-40"
                                                      required type="password" value={ConfirmPassword} maxLength={30}
                                                      onChange={onConfirmPasswordHandler} name="passwordConfirm"/>
                        </Column>

                    </BigColumn>

                    <BigColumn>
                        <ColumnMax title="성명">
                            <input className="h-7 border-gray-400 px-2 rounded w-72" required type="text" maxLength={20}
                                   onChange={onChangeBoardInput} value={board.name} name="name"/>
                        </ColumnMax>
                    </BigColumn>

                    <BigColumn>
                        <Column title="전화번호">
                            <input className="h-7 border-gray-400 px-2 rounded w-72 mr-2" required type="text"
                                   maxLength={20}
                                   onChange={onChangeBoardInput} value={board.callNo} name="callNo"/> (예 : 052-555-5555)
                        </Column>

                        <Column title="휴대폰">
                            <input className="h-7 border-gray-400 px-2 rounded w-72 mr-2" type="text" maxLength={20}
                                   onChange={onChangeBoardInput} value={board.phoneNo} name="phoneNo"/> (예 :
                            010-555-5555)
                        </Column>
                    </BigColumn>

                    <BigColumn>
                        <ColumnMax title="팩스번호">
                            <input className="h-7 border-gray-400 px-2 rounded w-72 mr-2" type="text" maxLength={20}
                                   onChange={onChangeBoardInput} value={board.faxNo} name="faxNo"/> (예 : 052-555-5555)
                        </ColumnMax>
                    </BigColumn>

                    <BigColumn>
                        <ColumnMax title="이메일">
                            <input className="h-7 border-gray-400 px-2 rounded w-72" type="text" maxLength={50}
                                   onChange={onChangeBoardInput} value={board.email} name="email"/>
                        </ColumnMax>
                    </BigColumn>

                    <BigColumn>
                        <Column title="부서">
                            <input className="h-7 border-gray-400 px-2 rounded w-72" type="text" maxLength={20}
                                   onChange={onChangeBoardInput} value={board.department} name="department"/>
                        </Column>
                        <Column title="직급">
                            <input className="h-7 border-gray-400 px-2 rounded w-72" type="text" maxLength={20}
                                   onChange={onChangeBoardInput} value={board.position} name="position"/>
                        </Column>

                    </BigColumn>
                    <div className="container flex justify-content-between my-4">
                        <Button value="목록" clickEvent={goToList}/>
                        <Button value="저장" clickEvent={saveUser}/>
                    </div>
                </div>
            </div>
        </>

    )
}


export default AddUser