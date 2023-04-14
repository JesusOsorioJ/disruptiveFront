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
            {messageFilter == true ? <div className="d-flex gap-2 text-secondary">Filtrado por
                {form.search.length > 0 && <p>Palabra : {form.search}</p>}
                {form.cohort.length > 0 && <p>Cohorte : {form.cohort}</p>}
                {form.status.length > 0 && <p>Status : {form.status}</p>}
            </div> : <p className='text-white'>espacio mensaje</p>}
            <div className="d-flex justify-content-between align-items-center  pb-4">

                <form className="d-flex align-items-center gap-3" onSubmit={handlerOnSubmit}>

                    {typeOfFilter == 'filterMaker' ?
                        <div className="d-flex gap-5">
                            <div className="form-group">
                                <label htmlFor="search">Search</label>
                                <input onChange={handlerOnChange} type="text"
                                    className="form-control" id="search" placeholder="By Email/Name" value={form.search} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cohort">Cohort</label>
                                <input onChange={handlerOnChange} type="text"
                                    className="form-control" id="cohort" placeholder="All" value={form.cohort} />
                            </div>
                            <div className="form-group d-flex flex-column ">
                                <label htmlFor="Description">Status</label>
                                <select id="status" className="form-select" onChange={handlerOnChange}
                                    value={form.status}>
                                    <option value="" >--</option>
                                    {statusMaker.map((step) => <option value={step} key={step} >{step}</option>)}
                                </select>
                            </div>
                        </div>

                        :

                        <div className="d-flex gap-5 ">
                            <div className="form-group">
                                <label htmlFor="search">Search</label>
                                <input type="text" className="form-control" id="search"
                                    onChange={handlerOnChange} placeholder="By Company/Role" value={form.search} />
                            </div>
                            <div className="form-group d-flex flex-column ">
                                <label htmlFor="Description">Status</label>
                                <select id="status" className="form-select" value={form.status}
                                    onChange={handlerOnChange}>
                                    <option value="" >--</option>
                                    {statusApplication.map((step) => <option value={step} key={step}>{step}</option>)}
                                </select>
                            </div>
                        </div>
                    }

                    <button type="submit" className="btn btn-secondary mt-4">
                        Add filter</button>
                    <button type="submit" className="btn btn-secondary mt-4"
                        onClick={(e) => {
                            setForm(InitialValueFilter); handlerOnSubmit; setMessageFilter(false)
                        }}>
                        Clean</button>
                    {loading == true && <div className="spinner-border text-primary mt-4" role="status"></div>}

                </form>
                <div className="form-group d-flex flex-column ">
                    <label htmlFor="pagination">Paginacion</label>
                    <select onChange={handlerPagination} value={pagination}
                        id="pagination" className="form-select">
                        <option value={3} >3</option><option value={5} >5</option>
                        <option value={10} >10</option><option value={20} >20</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default FilterMaker