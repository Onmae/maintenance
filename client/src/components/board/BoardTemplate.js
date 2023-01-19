import BigColumn from "./BigColumn";
import Column, {ColumnHomePage, ColumnMax} from "./Column";
import FileUpload from "./FileInput";
import {useEffect, useLayoutEffect, useRef} from "react";

export const BoardTemplate = ({onChangeBoardInput, fileInputEventHandler, fileDeleteEventHandler, data, focus, children}) => {
    const inputRef = useRef();

    useLayoutEffect(() => {
        if (inputRef.current !== null) inputRef.current.focus()
    }, [])

    let files = []

    return (
        <div className="container">
            <div className="container border-b-2 border-t-2 border-gray-700 grid grid-rows-9 mt-8 mb-8 py-2">
                <BigColumn>
                    <Column title="기관명">
                        <input className="h-7 w:30 ld:w-60 border-gray-400 px-2 rounded w-40" type="text"
                               onChange={onChangeBoardInput} value={data.facility} readOnly/>
                    </Column>

                    <Column title="담당자">
                        <input className="h-7 w-auto border-gray-400 px-2 rounded w-40" type="text"
                               onChange={onChangeBoardInput} value={data.name} readOnly/>
                    </Column>
                </BigColumn>


                <BigColumn>
                    <Column title="사이트명">
                        <input className="h-7 w-auto border-gray-400 px-2 rounded w-40" type="text"
                               onChange={onChangeBoardInput} value={data.siteName} readOnly/>
                    </Column>
                    <ColumnHomePage title="사이트주소" content={data.siteAddress}/>
                </BigColumn>

                <BigColumn>
                    <ColumnMax title="제목">
                        <input className="h-7 w-3/4 border-gray-400 px-2 rounded w-3/4" type="text" name="title"
                               onChange={onChangeBoardInput} value={data.title} maxLength={100} ref={inputRef}/>
                    </ColumnMax>
                </BigColumn>

                <BigColumn>
                    <ColumnMax title="내용">
                            <textarea onChange={onChangeBoardInput} value={data.content} name="content"
                                      className="min-w-full h-80 col-span-2 pl-2 my-2 border-gray-300 rounded"
                                      maxLength={4000}></textarea>
                    </ColumnMax>
                </BigColumn>

                <BigColumn>
                    <ColumnMax title="첨부파일">
                        <FileUpload
                            accept=""
                            label=""
                            multiple
                            updateFilesCb={fileInputEventHandler}
                            file={data.files}
                            name="file"
                            fileDeleteEventHandler={fileDeleteEventHandler}
                        />
                    </ColumnMax>
                </BigColumn>

            </div>
            {children}
        </div>
    )
}