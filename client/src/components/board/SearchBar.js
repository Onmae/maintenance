import SelectBox from '../SelectBox'
import Button from '../Button'
import {categoryList} from "../../global_variables";
import axios from "axios";
import {useState} from "react";

export const SearchBar = ({setInfo}) => {
    const [category, setCategory] = useState("")
    const [title, setTitle] = useState("")

    const ButtonEvent = (e) => {
        axios.get('/api/boardByTitle',
            {params: {title: title}}
        )
            .then((res) => {
                setInfo(res.data)
            })
    }

    const SelectEvent = (e) => {
        axios.get('/api/boardByProcessing',
            {params: {processing: e.target.value}}
        )
            .then((res) => {
                setInfo(res.data)
            })
    }

    const searchTextInputEvent = (e) => {
        setTitle(e.target.value)
    }

    return (<div className="flex justify-content-end px-2 py-2 ">
            <SelectBox options={categoryList} clickEvent={SelectEvent}/>
            <input type="text" name="searchText" className="ml-6 px-2 py-1 rounded-md bg-gray-50" onChange={searchTextInputEvent}/>
            <Button value="검색" clickEvent={ButtonEvent}/>
        </div>
    )
}

export default SearchBar
