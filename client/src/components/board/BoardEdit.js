import {useNavigate, useParams} from "react-router-dom";
import Button from "../Button";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {BoardTemplate} from "./BoardTemplate";
import Loading from "./modal/Loading";

export const BoardEdit = () => {
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id
    const formData = new FormData();

    const [loadingOpen, setLoadingOpen] = useState(false)
    const [board, setBoard] = useState({
        id: "",
        createdDate: "",
        facility: "",
        name: "",
        siteName: "",
        siteAddress: "",
        processing: "",
        processedTime: "",
        files: "",
        title: "",
        content: "",
        chargedName: "",
        comment: "",
        multipartFile: [],
    })
    let files

    useEffect(() => {
        axios.get(`/api/board/${id}`)
            .then(res => {
                setBoard(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    const goToList = () => {
        navigate("/main")
    }

    const onChangeBoardInput = (e) => {
        setBoard({
            ...board,
            [e.target.name]: e.target.value,
        });
    }

    const fileInputEventHandler = (e) => {
        files = e
    }
    const fileDeleteEventHandler = (value, index) => {
        axios.delete(`/api/boardFileDelete/${value.file.id}`)
            .then(r => {
                alert("파일 삭제가 성공되었습니다")
                setBoard({
                    ...board,
                    files : board.files.filter(x => x.file.id !== value.file.id)
                })
            })
            .catch(err => alert("파일 삭제가 실패하였습니다."))
    }

    const requireHandler = () => {
        if (!board.title) {
            alert("제목을 입력해주세요")
            return false
        }

        if (!board.content) {
            alert("내용을 입력해주세요")
            return false
        }

        return true
    }

    const editBoard = () => {
        if (!requireHandler()) return
        setLoadingOpen(true)

        formData.append("data", new Blob([JSON.stringify(board)], {type: "application/json"}))

        if (files) {
            for (let file of files) {
                formData.append("file", file)
            }
        }

        setLoadingOpen(true)
        axios.post(`/api/board/${id}`, formData,{
            header: {
                contentType: false,
                processData: false,
            }
        })
            .then(res => {
                navigate(`/read/${id}`)
            })
            .catch(err => {
                alert("게시글 수정에 실패하였습니다.")
            })
            .finally(() => {
                setLoadingOpen(false)
                formData.delete('data')
                formData.delete('file')
            });
    }

    return (
        <>
            {loadingOpen && <Loading />}
            <BoardTemplate onChangeBoardInput={onChangeBoardInput} data={board}
                           fileInputEventHandler={fileInputEventHandler} fileDeleteEventHandler={fileDeleteEventHandler}>
                <div className="container flex justify-content-between my-4">
                    <Button value="목록" clickEvent={goToList}/>
                    <Button value="저장" clickEvent={editBoard}/>
                </div>
            </BoardTemplate>
        </>
    )

}

export default BoardEdit