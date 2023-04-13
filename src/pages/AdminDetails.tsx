import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react';

import { filterByAllApplication } from '../../services/application'
import { getAllApplicationLogs } from "../../services/applicationlog";

import FilterMaker from "../../components/AdminComponents/FilterMaker";
import Header from '../../components/Header'
import Pagination from "../../components/AdminComponents/Pagination";
import { Initialmaker } from "../../types";

export default function AdminDetails() {
    const navigate = useNavigate();
    const { makerId } = useParams()
    let [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState(true)
    const [weekMonth, setweekMonth] = useState({ week: {}, month: {} })
    const [maker, setMaker] = useState({ data: Initialmaker, total: 0 })

    let params = { page: "1" }

    searchParams.forEach((value, key) => Object.assign(params, { [key]: value }));
    const myObject = JSON.parse(window.sessionStorage.getItem("myObject") || '{"typeUser":""}')
    const { typeUser, pagination } = myObject

    useEffect(() => {
        if (typeUser != 'admin') {
            navigate('/')
        }

        (async () => {
            const response = await filterByAllApplication({ id: parseInt(makerId!.substring(5)), ...params, pagination })
            const responseweekmonth = await getAllApplicationLogs()

            setweekMonth(responseweekmonth.message)
            setMaker({ data: response.message, total: response.message.total })


            setLoading(false)
        })()
    }, [loading])

    return (
        <div>
            <Header />
            <div className="p-4">
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex gap-5 align-items-center' >
                        <div>
                            <h4 className='text-capitalize'>{maker.data.name}</h4>
                            <h5>{maker.data.email}</h5>
                        </div>
                        <div className='d-flex flex-column align-items-center mx-4'>
                            <h6>Last 7/30 Applications</h6>
                            <td>{weekMonth.week[maker.data.id as keyof typeof weekMonth.week]}
                                /{weekMonth.month[maker.data.id as keyof typeof weekMonth.week]} </td>
                        </div>
                        <div className='d-flex flex-column align-items-center mx-4'>
                            <h6>Total Aplications</h6>
                            <p>{pagination * parseInt(params.page)} of {maker.total}</p>
                        </div>


                    </div>
                    <a type="button" href="/admin" className="btn btn-primary">Ir atras</a>
                </div>

                <FilterMaker typeOfFilter="filterApplication" loading={loading} setLoading={setLoading} />

                <table className="table border">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Company/JobTitle</th>
                            <th scope="col">Status</th>
                            <th scope="col">Description</th>
                            <th scope="col">Url</th>
                            <th scope="col">Application</th>
                            <th scope="col">Historial</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maker.data.applications?.map((step) => <tr>
                            <td>
                                <div>{step.company}</div>
                                <div>{step.role}</div>
                            </td>
                            <td>{step.status}</td>
                            <td>{step.description}</td>
                            <td>{step.url}</td>
                            <td>{step.updatedAt.substring(0, 10)}</td>
                            <td>
                                <div id="scrollDetailsAdmin" className='overflow-auto '>
                                    {step.applicationLogs.map((status, i) =>

                                        <div className='d-flex align-items-center' key={status.createdAt}>
                                            <div className='px-3'>
                                                {status.toStatus == "APPLIED" && status.fromStatus == "APPLIED" ?
                                                    <p className='mb-1'>{i + 1}. {status.fromStatus} </p> :
                                                    <p className='mb-1 d-flex'>{i + 1}. Change '{status.fromStatus}' to '{status.toStatus}'</p>}
                                                <p>{status.message}</p>
                                            </div>
                                            <p className='p-3'>{status.createdAt.substring(0, 10)}</p>
                                        </div>
                                    )}
                                </div>
                            </td>

                        </tr>)}
                    </tbody>
                </table>
                <Pagination />
            </div>

        </div>
    )
}
