import Button from "../Button";
import Column, {ColumnFiles, ColumnForChargedPerson, ColumnHomePage, ColumnMax, ColumnTextBox} from "./Column"
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import BigColumn from "./BigColumn";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Cookies from "js-cookie"
import SelectBox from "../SelectBox";
import {categoryList} from "../../global_variables";
import {BoardDeleteConfirmModal} from "./modal/BoardDeleteConfirmModal";

export const BoardRead = () => {
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id
    const date = new Date()
    const inputRef = useRef()
    const formData = new FormData();

    const [modalOpen, setModalOpen] = useState(false);
    const [board, setBoard] = useState({
        id: "",
        createdDate: "",
        facility: "",
        name: "",
        siteName: "",
        siteAddress: "",
        processing: "",
        processedTime: "",
        title: "",
        content: "",
        files: "",
        chargedName: "",
        comment: "",
        multipartFile: [],
    })
    const [info, setInfo] = useState({})

    useLayoutEffect(() => {
        if (inputRef.current !== null && Cookies.get("role") === "ADMIN") inputRef.current.focus()
    }, [])

    const showModal = () => {
        setModalOpen(true)
    }
    const goToList = () => {
        navigate("/main")
    }

    const editBoard = () => {
        navigate(`/edit/${board.id}`)
    }

    useEffect(() => {
        axios.get(`/api/board/${id}`)
            .then(res => {
                setBoard(res.data)
                axios.get(`/api/memberCharged/${res.data.name}`)
                    .then(res => {
                        setInfo({
                            ...res.data
                        })
                    })
            })
            .catch(err => console.log(err))
    }, [])

    function fastEdit() {
        board.chargedName = Cookies.get("name")

        if (board.processing === "처리완료") {
            board.processedTime = `(완료일 : ${date.toLocaleString('ko-kr')})`
        } else {
            board.processedTime = ""
        }

        formData.append("data", new Blob([JSON.stringify(board)], {type: "application/json"}))
        axios.post(`/api/board/${id}`, formData, {
            header: {
                contentType: false,
                processData: false,
            }
        })
            .then(res => navigate(`/read/${id}`))
            .catch(err => console.log(err))
            .finally(() => {
                formData.delete('data')
            })
    }

    const onChangeBoardInput = (e) => {
        setBoard({
            ...board,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <>
            <div className="container ">
                <div className="container border-b-2 border-t-2 border-gray-700 grid grid-rows-9 mt-8 mb-8 py-2">
                    <BigColumn>
                        <Column title="처리번호" content={board.id}/>
                        <Column title="접수일" content={board.createdDate}/>
                    </BigColumn>

                    <BigColumn>
                        <Column title="시설명" content={board.facility}/>
                        <Column title="담당자" content={board.name}/>
                    </BigColumn>

                    <BigColumn>
                        <Column title="사이트명" content={board.siteName}/>
                        <ColumnHomePage title="사이트주소" content={board.siteAddress}/>
                    </BigColumn>

                    <div className="mb-4">
                        <BigColumn>
                            {Cookies.get("role") !== "ADMIN" ?
                                <ColumnMax title="처리상태">{board.processing} {board.processedTime}</ColumnMax>
                                : <ColumnMax title="처리상태"><SelectBox name="processing" options={categoryList}
                                                                     clickEvent={onChangeBoardInput}
                                                                     defaultValue={board.processing}/>{board.processedTime}
                                </ColumnMax>
                            }
                        </BigColumn>
                    </div>

                    <div className="mb-4">
                        <BigColumn>
                            <ColumnMax title="제목" content={board.title}/>
                        </BigColumn>

                        <BigColumn>
                            <ColumnTextBox title="내용" content={board.content}/>
                        </BigColumn>

                        <BigColumn>
                            <ColumnFiles title="첨부파일" content={board.files}/>
                        </BigColumn>
                    </div>


                    <BigColumn>
                        <ColumnForChargedPerson title="처리담당자" info={info}/>
                    </BigColumn>

                    <BigColumn>
                        {Cookies.get("role") !== "ADMIN" ? <ColumnTextBox title="작업코멘트" content={board.comment}/>
                            : <ColumnMax title="작업코멘트">
                                <textarea defaultValue={board.comment} name="comment" onChange={onChangeBoardInput}
                                          className="w-3/4 h-56 col-span-2 mx-2 my-2 border-gray-300 whitespace-pre-wrap"
                                          ref={inputRef}>
                                   </textarea></ColumnMax>
                        }
                    </BigColumn>


                </div>
            </div>

            <div className="container flex justify-content-between my-4">
                <div>

                    <Button value="목록" clickEvent={goToList}/>
                </div>
                <div className="justify-end">
                    {Cookies.get("role") !== "USER" ? (<Button value="저장" clickEvent={fastEdit}/>) : ""}
                    {((Cookies.get("role") === "USER" && Cookies.get("name") === board.name) || Cookies.get("role") === "ADMIN") ?
                        <Button value="삭제" clickEvent={showModal}/> : ""}
                    {((Cookies.get("name") === board.name) || Cookies.get("role") === "ADMIN") ?
                        <Button value="수정" clickEvent={editBoard}/> : ""}
                    {modalOpen &&
                        <BoardDeleteConfirmModal setModalOpen={setModalOpen} modalOpen={modalOpen} id={board.id}/>}
                </div>
            </div>

        </>

    )
}

export default BoardRead