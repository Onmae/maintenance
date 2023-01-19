import React, {useEffect, useRef, useState} from "react";
import {
    FileUploadContainer,
    FormField,
    DragDropText,
    UploadFileBtn,
    FilePreviewContainer,
    ImagePreview,
    PreviewContainer,
    PreviewList,
    FileMetaData,
    InputLabel
} from "./file-upload.styles";
import {
    ArrowUpOnSquareStackIcon,
    TrashIcon
} from "@heroicons/react/24/outline";
import {Loading} from "./modal/Loading";
import BigColumn from "./BigColumn";
import {ColumnFiles, ColumnFilesForDelete} from "./Column";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 104857600;

const convertNestedObjectToArray = (nestedObj) =>
    Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

export const FileUpload = ({
                               label,
                               name,
                               updateFilesCb,
                               file,
                               maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
                               fileDeleteEventHandler,
                               ...otherProps
                           }) => {
    const fileInputField = useRef(null);
    const [files, setFiles] = useState({});
    const [loadingOpen, setLoadingOpen] = useState(false)

    const handleUploadBtnClick = () => {
        fileInputField.current.click();
    };

    const addNewFiles = (newFiles) => {
        for (let file of newFiles) {
            if (file.size < maxFileSizeInBytes) {
                if (!otherProps.multiple) {
                    return {file};
                }
                files[file.name] = file;
            } else alert("첨부파일 사이즈는 100Mb 이내로 등록 가능합니다.")
        }
        return {...files};
    };

    const callUpdateFilesCb = (files) => {
        const filesAsArray = convertNestedObjectToArray(files);
        updateFilesCb(filesAsArray);
    };

    const handleNewFileUpload = (e) => {
        setLoadingOpen(true)
        const {files: newFiles} = e.target;
        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles);
            setFiles(updatedFiles)
            callUpdateFilesCb(updatedFiles);
        }
        setLoadingOpen(false)
    };

    const removeFile = (fileName) => {
        delete files[fileName];
        setFiles({...files});
        callUpdateFilesCb({...files});
    };

    return (
        <>
            {loadingOpen && <Loading/>}
            {file && <ColumnFilesForDelete title="첨부파일" content={file} fileDeleteEventHandler={fileDeleteEventHandler}/>}

            <FileUploadContainer>
                <InputLabel>{label}</InputLabel>
                <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
                    <ArrowUpOnSquareStackIcon/>
                    <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
                </UploadFileBtn>
                <FormField
                    type="file"
                    ref={fileInputField}
                    onChange={handleNewFileUpload}
                    title=""
                    value=""
                    {...otherProps}
                    name={name}
                />
            </FileUploadContainer>
            <FilePreviewContainer>
                <PreviewList>
                    {Object.keys(files).map((fileName, index) => {
                        let file = files[fileName];
                        let isImageFile = file.type.split("/")[0] === "image";
                        return (
                            <PreviewContainer key={fileName}>
                                <div>
                                    {isImageFile && (
                                        <ImagePreview
                                            src={URL.createObjectURL(file)}
                                            alt={`file preview ${index}`}
                                        />
                                    )}
                                    <FileMetaData isImageFile={isImageFile}>
                                        <span>{file.name}</span>
                                        <aside>
                                            <span>{convertBytesToKB(file.size)} kb</span>
                                            <TrashIcon
                                                className="w-5"
                                                onClick={() => removeFile(fileName)}
                                            />
                                        </aside>
                                    </FileMetaData>
                                </div>
                            </PreviewContainer>
                        );
                    })}
                </PreviewList>
            </FilePreviewContainer>
        </>
    );
};

export default FileUpload;