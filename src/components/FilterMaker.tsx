import { useSearchParams } from "react-router-dom"
import { useState } from 'react'

type Props = {
    loading: Boolean
    typeOfFilter: String
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const FilterMaker: React.FC<Props> = ({ typeOfFilter, loading, setLoading }) => {

    const statusMaker = ['GRACE_PERIOD', 'STUDYING', 'SEARCHING', 'UNEMPLOYED', 'EMPLOYED']
    const statusApplication = ["APPLIED", "IN_PROCESS", "OFFER", "IDLE", "REJECTED"]

    const InitialValueFilter = { search: '', cohort: '', status: '' }
    const myObject = JSON.parse(window.sessionStorage.getItem("myObject") || '{"typeUser":""}')
    const [pagination, setPagination] = useState(myObject.pagination)

    const [form, setForm] = useState(InitialValueFilter)
    const [messageFilter, setMessageFilter] = useState(false)
    let [searchParams, setSearchParams] = useSearchParams()

    const handlerOnChange = (e: any) => {
        const { id, value } = e.target
        setForm({ ...form, [id]: value })
        setMessageFilter(false)
    }

    const handlerPagination = (e: any) => {
        setPagination(e.target.value)
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
                {form.search.length > 0 && <p>Palabra : {form.search}</p>}
                {form.cohort.length > 0 && <p>Cohorte : {form.cohort}</p>}
                {form.status.length > 0 && <p>Status : {form.status}</p>}
            </div> : <p className='text-white'>espacio mensaje</p>}
            <div className="flex justify-between items-center  pb-4">

                <form className="flex items-end gap-3" onSubmit={handlerOnSubmit}>

                    {typeOfFilter == 'filterMaker' ?
                        <div className="flex gap-5">
                            <div className="form-group">
                                <label htmlFor="search">Search</label>
                                <input onChange={handlerOnChange} type="text" id="search" placeholder="By Email/Name" value={form.search} 
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cohort">Cohort</label>
                                <input onChange={handlerOnChange} type="text" id="cohort" placeholder="All" value={form.cohort}
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                            <div >
                                <label htmlFor="Description">Status</label>
                                <select id="status" onChange={handlerOnChange} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={form.status}>
                                    <option value="" >--</option>
                                    {statusMaker.map((step) => <option value={step} key={step} >{step}</option>)}
                                </select>
                            </div>
                        </div>

                        :

                        <div className="flex gap-5 ">
                            <div className="form-group">
                                <label htmlFor="search">Search</label>
                                <input type="text"  id="search" onChange={handlerOnChange} placeholder="By Company/Role" value={form.search} 
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                            </div>
                            <div className="form-group flex flex-column ">
                                <label htmlFor="Description">Status</label>
                                <select id="status" value={form.status} className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handlerOnChange}>
                                    <option value="" >--</option>
                                    {statusApplication.map((step) => <option value={step} key={step}>{step}</option>)}
                                </select>
                            </div>
                        </div>
                    }

                    <button type="submit"  className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Add filter</button>
                    <button type="submit"   className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          
                        onClick={(e) => {
                            setForm(InitialValueFilter); handlerOnSubmit; setMessageFilter(false)
                        }}>
                        Clean</button>
                    {loading == true && <div className="spinner-border text-primary mt-4" role="status"></div>}

                </form>
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
    )
}

export default FilterMaker