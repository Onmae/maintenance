export const Button = ({value, clickEvent ,children}) => {
    return (
        <>
        <button className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={clickEvent}>{value} {children}</button>
        </>
    )
}

export default Button