export const Pagination = ({totalPosts, limit, page, setPage, count}) => {
    const numPages = Math.ceil(totalPosts / limit)

    return (
        <div className="container flex justify-content-center">
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <button
                        onClick={() => {
                            setPage(page - 1)
                        }}
                        disabled={page === 1}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === numPages}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </button>
                </div>

                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button
                                onClick={() => {
                                    setPage(page - 1);
                                }}
                                className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20 hover:bg-gray-200"
                                disabled={page === 1}>
                                &lt;
                            </button>

                            {Array(numPages).fill().map((_, i) =>
                                (
                                    <button
                                        key={i + 1}
                                        onClick={() => setPage(i + 1)}
                                        aria-current={page === i + 1 ? "page" : null}
                                        className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20 hover:bg-gray-200 active:bg-gray-100">
                                        {i + 1}
                                </button>
                                )
                            )
                            }
                            <button
                                onClick={() => {
                                    setPage(page + 1);
                                }}
                                className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20 hover:bg-gray-200"
                                disabled={page === numPages}>

                                &gt;
                            </button>
                            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}

                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pagination