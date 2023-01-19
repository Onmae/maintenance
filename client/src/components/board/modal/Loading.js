export const Loading = () => {
    return (
        <div className='absolute w-screen h-screen top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center '>
            <div style={{borderTopColor:'transparent'}}
                 className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"></div>
        </div>
    )
}

export default Loading