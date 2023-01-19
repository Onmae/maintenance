import {
    DocumentArrowUpIcon,
    DocumentIcon
} from '@heroicons/react/24/outline'
import axios, {get} from "axios";
import {useEffect, useState} from "react";

export const Column = ({title, content, children}) => {
    return (
        <>
            <div
                className="grid col-span-1 justify-content-center align-items-center px-2 py-2 my-0.5 bg-gray-200 rounded text-center border-b-2 border-gray-100">{title}</div>
            <div
                className="col-span-2 grid align-items-center xl:col-end-auto mx-2 px-2 py-2 border-b-2 border-gray-100 leading-5">{children} {content}</div>
        </>
    )
}

export const ColumnMax = ({title, content, children}) => {
    return (
        <>
            <div
                className="grid col-span-1 justify-content-center align-items-center px-2 py-2 my-0.5 bg-gray-200 rounded text-center border-b-2 border-gray-100">{title}</div>
            <div
                className="col-span-2 grid align-items-center xl:col-span-5 xl:col-end-auto mx-2 px-2 py-2 border-b-2 border-gray-100 leading-5">{children} {content}</div>
        </>
    )
}

export const ColumnForChargedPerson = ({title, info, children}) => {

    return (
        <>
            <div
                className="grid col-span-1 justify-content-center align-items-center px-2 py-2 my-0.5 bg-gray-200 rounded text-center border-b-2 border-gray-100">{title}</div>
            <div
                className="flex justify-content-between align-items-center col-span-2 align-items-center xl:col-span-5 xl:col-end-auto mx-2 px-6 py-2 border-b-2 border-gray-100 leading-5">{children}
                <div>
                    {info.name}
                </div>
                <div>
                    {info.phoneNo} / {info.email}
                </div>
            </div>
        </>
    )
}

export const ColumnTextBox = ({title, content, children}) => {
    return (
        <>
            <div
                className="grid col-span-1 justify-content-center align-items-center px-2 py-2 my-0.5 bg-gray-200 rounded text-center border-b-2 border-gray-100">{title}</div>
            <p
                style={{textIndent: '-5px'}}
                className="h-80 whitespace-pre-wrap overflow-auto col-span-2 xl:col-span-5 xl:col-end-auto mx-2 px-2 py-2 border-b-2 border-gray-100 leading-5">{children} {content}</p>
        </>
    )
}

export const ColumnHomePage = ({title, content, children}) => {
    content = `http://${content}`
    return (
        <>
            <div
                className="grid col-span-1 justify-content-center align-items-center px-2 py-2 my-0.5 bg-gray-200 rounded text-center border-b-2 border-gray-100">{title}</div>
            <div
                className="xl:col-span-2 grid align-items-center xl:col-end-auto mx-2 px-2 py-2 border-b-2 border-gray-100 leading-5">
                <a href={content} target="_blank">
                    {content}
                </a>
            </div>

        </>
    )
}

export const ColumnButton = ({title, content, children, checkId}) => {
    return (
        <>
            <div
                className="grid col-span-1 justify-content-center align-items-center px-2 py-2 my-0.5 bg-gray-200 rounded text-center border-b-2 border-gray-100">{title}</div>
            <div
                className="col-span-2 xl:col-end-auto mx-2 px-2 py-2 border-b-2 border-gray-100 leading-5">{children} {content}</div>
        </>
    )
}

export const ColumnFiles = ({title, content, children}) => {
    return (
        <>
            <div
                className="grid col-span-1 justify-content-center align-items-center px-2 py-2 my-0.5 bg-gray-200 rounded text-center border-b-2 border-gray-100">{title}</div>
            <div
                className="col-span-2 xl:col-span-5 mx-2 px-2 py-2 border-b-2 border-gray-100 leading-5">{children}
                {
                    Object.values(content).map((value, index) => {
                        return (<div key={index}>
                            <a href={`/api/fileDownload/${value.file.id}`}>
                                <DocumentArrowUpIcon className="w-10 inline"></DocumentArrowUpIcon>
                                {value.file.originFileName}
                            </a>
                        </div>)
                    })
                }
            </div>
        </>
    )
}

export const ColumnFilesForDelete = ({title, content, fileDeleteEventHandler, children}) => {
    return (
        <>
            <div
                className="mx-2 px-2 py-2 border-b-2 border-gray-100 leading-5">{children}
                {
                    Object.values(content).map((value, index) => {
                        return (<div key={index}>
                            <a>
                                <DocumentIcon className="w-10 inline"></DocumentIcon>
                                {value.file.originFileName}
                            </a>
                            <button
                                className="ml-4 inline-flex bg-red-700 justify-center rounded-md border border-transparent py-1 px-2 text-sm font-medium text-white shadow-sm hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                                onClick={() => {
                                    fileDeleteEventHandler(value, index)
                                }}>삭제
                            </button>
                        </div>)
                    })
                }
            </div>
        </>
    )
}
export default Column