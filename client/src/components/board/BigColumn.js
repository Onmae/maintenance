export const BigColumn = ({children}) => {
    return (
        <>
            <div className="grid grid-cols-3 xl:grid-cols-6 ">
                {children}
            </div>
        </>
    )
}

export const BigColumnForTextBox = ({children}) => {
    return (
        <>
            <div className="grid h-50 grid-cols-3 xl:grid-cols-6">
                {children}
            </div>
        </>
    )
}

export default BigColumn