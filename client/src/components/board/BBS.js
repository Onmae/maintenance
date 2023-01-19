import Tr from '../grid/Tr';

const Board = ({info}) => {

    const ifHasPosts = () => {
        if (info.length !== 0) {
            return <Tr info={info} className="bbs" whereFrom="read"/>
        }
    }

    return (
        <>
            <div>
                <table className="w-full table-fix text-gray-800 border-b-2 border-double border-black">
                    <thead className='justify-between'>
                    <tr className='border-b-2 border-t-2 text-gray-300 border-black text-sm '>
                        <th className="text-gray-700 px-1 py-3 text-center">처리번호</th>
                        <th className="text-gray-700 px-4 py-3 text-center">처리상태</th>
                        <th className="text-gray-700 w-96 px-4 py-3 text-center">제목</th>
                        <th className="text-gray-700 px-4 py-3 text-center">담당자</th>
                        <th className="text-gray-700 px-4 py-3 text-center">시설명</th>
                        <th className="text-gray-700 px-4 py-3 text-center">등록자</th>
                        <th className="text-gray-700 px-4 py-3 text-center">작성일</th>
                    </tr>
                    </thead>
                    {ifHasPosts()}
                </table>
            </div>
            <div className="container max-w-screen-lg mx-auto">
            </div>
        </>
    );
};

export default Board;