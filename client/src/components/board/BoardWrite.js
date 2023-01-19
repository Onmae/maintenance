import {useNavigate} from "react-router-dom";
import Button from "../Button";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {BoardTemplate} from "./BoardTemplate";
import {Loading} from "./modal/Loading";

export const BoardWrite = () => {
    const navigate = useNavigate()
    const formData = new FormData();
    const [loadingOpen, setLoadingOpen] = useState(false)
    const [board, setBoard] = useState({
        facility: "",
        name: "",
        siteName: "",
        siteAddress: "",
        title: "",
        content: "",
        multipartFile: [],
    })

    let files

    useEffect(() => {
        axios.get(`/api/member/${Cookies.get("id")}`)
            .then(res => {
                setBoard((prevState) => {
                        return {
                            ...board,
                            facility: res.data.facility,
                            name: res.data.name,
                            siteName: res.data.siteName,
                            siteAddress: res.data.siteAddress,
                        }
                    }
                )
            })
            .catch(err => console.log(err))
    }, [])

    const goToList = () => {
        navigate("/main")
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


    const saveBoard = () => {
        if (!requireHandler()) return
        setLoadingOpen(true)

        formData.append("data", new Blob([JSON.stringify(board)], {type: "application/json"}))

        if (files) {
            for (let file of files) {
                formData.append("file", file)
            }
        }

        axios.post('/api/boardCreate', formData, {
            header: {
                contentType: false,
                processData: false,
            }
        })
            .then(res => {
                navigate(`/read/${res.data}`)
            })
            .catch(err => {
                alert("게시글 작성에 실패하였습니다.")
            })
            .finally(() => {
                setLoadingOpen(false)
                formData.delete('data')
                formData.delete('file')
            })
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

    return (
        <>
            {loadingOpen && <Loading/>}
            <BoardTemplate onChangeBoardInput={onChangeBoardInput} fileInputEventHandler={fileInputEventHandler}
                           data={board}>
                <div className="container flex justify-content-between my-4">
                    <Button value="목록" clickEvent={goToList}/>
                    <Button value="저장" clickEvent={saveBoard}/>
                </div>
            </BoardTemplate>
        </>

    )

}

export default BoardWrite