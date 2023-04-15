import { useSearchParams, } from "react-router-dom"
import { useState, useEffect } from 'react'
import { LoadingBig }from "./Loading"
import { getAllTopic } from "../services/topic"
import { Initialtopic } from "../types"

type Props = {
    loading: Boolean
    typeOfFilter: String
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const Filter: React.FC<Props> = ({ typeOfFilter, loading, setLoading }) => {

    const category = ['TEXT', 'IMAGE', 'VIDEO']
    const typeUsers = ["CREATOR", "READER"]

    const InitialValueFilter = { email: '', name: '', urlImage: '', typeUser: '', category: '', topicName: '' }
    const [topicList, setTopicList] = useState([Initialtopic])
    const myObject = JSON.parse(window.sessionStorage.getItem("myObject") || '{"typeUser":""}')
    const [pagination, setPagination] = useState(myObject.pagination)
    const [topicName, setTopicName ] = useState(myObject.topicName)

    const [form, setForm] = useState(InitialValueFilter)
    const [messageFilter, setMessageFilter] = useState(false)
    let [searchParams, setSearchParams] = useSearchParams()


    useEffect(() => {

        (async () => {

            const responseAllTopic = await getAllTopic({})
            setTopicList(responseAllTopic.message.data)
        })()

    }, [])

    const handlerOnChange = (e: any) => {
        setTopicName(e.target.value)
        const { id, value } = e.target
        setForm({ ...form, [id]: value })
        setMessageFilter(false)
    }

    const handlerTopicName = (e: any) => {
        setPagination(e.target.value)
        window.sessionStorage.setItem("myObject",
            JSON.stringify({ ...myObject, topicName: JSON.parse(e.target.value) }));
        window.location.replace('')

    }

    const handlerPagination = (e: any) => {
        window.sessionStorage.setItem("myObject",
            JSON.stringify({ ...myObject, pagination: e.target.value }));
        window.location.replace('')

    }

    const handlerOnSubmit = async (e: any) => {
        e.preventDefault()
        setSearchParams();
        setLoading(true)
        if (JSON.stringify(InitialValueFilter) != JSON.stringify(form)) {
            setMessageFilter(true)
            const params = {}
            Object.keys(form).forEach(function (key) {
                if (form[key as keyof typeof form].length > 0) {
                    Object.assign(params, { [key]: form[key as keyof typeof form] })
                }
            });
            setSearchParams({ ...params, page: "1" });
        }
    }

    return (
        <div>
            {messageFilter == true ? <div className="flex gap-2 text-secondary">Filtrado por
                {form.email.length > 0 && <p>Email : {form.email}</p>}
                {form.name.length > 0 && <p>name : {form.name}</p>}
                {form.urlImage.length > 0 && <p>urlImage : {form.urlImage}</p>}
                {form.typeUser.length > 0 && <p>typeUser : {form.typeUser}</p>}
                {form.category.length > 0 && <p>category : {form.category}</p>}
                {form.topicName.length > 0 && <p>topicName : {form.topicName}</p>}

            </div> : <p className='text-white'>espacio mensaje</p>}
            <div className="flex justify-between items-center  pb-4">

                <form className="flex items-end gap-3" onSubmit={handlerOnSubmit}>

                    {typeOfFilter == 'filterUser' &&
                        <div className="flex gap-5">
                            <div>
                                <label htmlFor="search">Email</label>
                                <input onChange={handlerOnChange} type="text" id="email" placeholder="By email user" value={form.email}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            <div>
                                <label htmlFor="cohort">Tipo User</label>
                                <select id="typeUser" value={form.typeUser} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handlerOnChange}>
                                    <option value="" >--</option>
                                    {typeUsers.map((step) => <option value={step} key={step}>{step}</option>)}
                                </select>
                            </div>
                        </div>}

                    {typeOfFilter == 'filterTopic' &&
                        <div className="flex gap-5 ">
                            <div>
                                <label htmlFor="search">Name</label>
                                <input type="text" onChange={handlerOnChange} id="topicName" placeholder="By name topic" value={form.topicName}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            <div>
                                <label htmlFor="search">URL IMAGE</label>
                                <input type="text" id="urlImage" onChange={handlerOnChange} placeholder="By URL image" value={form.urlImage}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                    }

                    {typeOfFilter == 'filterContent' &&

                        <div className="flex gap-5 ">
                            <div>
                                <label htmlFor="search">Name</label>
                                <input type="text" id="name" onChange={handlerOnChange} placeholder="By name content" value={form.name}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            <div>
                                <label htmlFor="Description">Category</label>
                                <select id="category" value={form.category} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handlerOnChange}>
                                    <option value="" >--</option>
                                    {category.map((step) => <option value={step} key={step}>{step}</option>)}
                                </select>
                            </div>

                        </div>
                    }

                    <button type="submit" className="block rounded-md bg-gray-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                        Add filter</button>
                    <button type="submit" className="block rounded-md bg-gray-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"

                        onClick={(e) => {
                            setForm(InitialValueFilter); handlerOnSubmit; setMessageFilter(false)
                        }}>
                        Clean</button>
                    {loading == true && <LoadingBig/>}

                </form>
                <div className="flex items-end gap-10" >

                    {typeOfFilter == 'filterContent' && 
                    <select value={topicName} id="topicName"  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handlerTopicName}>
                            <option value="" >--</option>
                        {topicList.map((i) => <option value={JSON.stringify(i)} key={JSON.stringify(i)}>{i.name}</option>)}
                    </select>}

                    <div>
                        <label htmlFor="pagination">Paginacion</label>
                        <select onChange={handlerPagination} value={pagination}
                            id="pagination" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <option value={3} >3</option><option value={5} >5</option>
                            <option value={10} >10</option><option value={20} >20</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter