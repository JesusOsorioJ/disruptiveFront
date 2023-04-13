import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'

import { filterByAllMakers } from '../../services/user'
import { getAllApplicationLogs } from '../../services/applicationlog'

import Header from '../../components/Header'
import FilterMaker from '../../components/AdminComponents/FilterMaker'
import InviteNewMaker from '../../components/AdminComponents/InviteNewMaker'
import Pagination from '../../components/AdminComponents/Pagination'
import DeleteConfirm from '../../components/DeleteConfirm'
import { Initialmaker } from '../../types'

export default function Admin() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams()

  const [modal, setModal] = useState({ view: "admin", data: Initialmaker })
  const [makerList, setMakerList] = useState({ data: [Initialmaker], total: 0 })
  const [weekMonth, setweekMonth] = useState({ week: {}, month: {} })
  const [loading, setLoading] = useState(true)

  let params = { page: "1" }
  searchParams.forEach((value, key) => Object.assign(params, { [key]: value }));
  const myObject = JSON.parse(window.sessionStorage.getItem("myObject") || '{"typeUser":""}')
  const { typeUser, pagination } = myObject

  useEffect(() => {
    if (typeUser != 'admin') {
      navigate('/')
    }

    (async () => {
      const responseAllMaker = await filterByAllMakers({ ...params, invitation: false, pagination })
      const responseweekmonth = await getAllApplicationLogs()
      setMakerList(responseAllMaker.message)
      setweekMonth(responseweekmonth.message)
      setLoading(false)
    })()

  }, [loading])

  return (

    <div>
      <Header />
      <div className="p-4">
        <div className='d-flex justify-content-between '>
          <h4>Makers</h4>
          <button type="button" onClick={() => { setModal({ view: "InviteNewMaker", data: Initialmaker }) }}
            className="btn btn-primary">Invite Maker</button>
        </div>

        <FilterMaker typeOfFilter="filterMaker" loading={loading} setLoading={setLoading} />

        <table className="table border">
          <thead className="thead-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name/Email</th>
              <th scope="col">Cohort</th>
              <th scope="col">Status</th>
              <th scope="col">Applications</th>
              <th scope="col">Last 7/30 days</th>
              <th scope="col">Last Update</th>
              {makerList.total && <th scope="col">{pagination * parseInt(params.page)} of {makerList.total}</th>}
            </tr>
          </thead>
          <tbody>
            {makerList.data.map(step => <>
              <tr>
                <th>{step.id}</th>
                <td>
                  <div>{step.name}</div>
                  <div>{step.email}</div>
                </td>
                <td>{step.topCohort}</td>
                <td>{step.status}</td>
                <td>{step.applications.length}</td>
                <td>{weekMonth.week[step.id as keyof typeof weekMonth.week]}
                  /{weekMonth.month[step.id as keyof typeof weekMonth.week]} </td>
                <td>{step.updatedAt&&format(Date.parse(step.updatedAt), 'MM/dd/yyyy HH:mm')}</td>
                <td>
                  <button type="button" className="btn btn-outline-secondary mx-3"
                    onClick={() => { setModal({ view: "InviteNewMaker", data: step }) }}>Edit</button>
                  <a type="button" href={`/adminDetails/maker${step.id}`} className="btn btn-outline-dark">Details</a>
                </td>
              </tr>
            </>
            )}

          </tbody>
        </table>
        <Pagination />

      </div>
      {modal.view == "InviteNewMaker" && <InviteNewMaker setModal={setModal} modal={modal} />}
      {modal.view == "deleteConfirm" && <DeleteConfirm modal={{  id: modal.data.id, message: modal.data.email, type: "maker" }} />}
    </div>
  )
}

