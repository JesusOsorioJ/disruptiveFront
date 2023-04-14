import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'

import { filterByAllUser } from '../services/user'

import Header from '../components/Header'
import FilterMaker from '../components/FilterMaker'
import NewUser from '../components/NewUser'
import Pagination from '../components/Pagination'
import DeleteConfirm from '../components/DeleteConfirm'

import { Initialuser } from '../types'

export default function Admin() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams()

  const [modal, setModal] = useState({ view: "admin", data: Initialuser })
  const [makerList, setMakerList] = useState({ data: [Initialuser], total: 0 })
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
      const responseAllMaker = await filterByAllUser({ ...params, invitation: false, pagination })
      setMakerList(responseAllMaker.message)
      setLoading(false)
    })()

  }, [loading])

  return (

    <div>
      <Header />
      <div className="p-4">
        <div className='d-flex justify-content-between '>
          <h4>Makers</h4>
          <button type="button" onClick={() => { setModal({ view: "InviteNewMaker", data: Initialuser }) }}
            className="btn btn-primary">Invite Maker</button>
        </div>

        <FilterMaker typeOfFilter="filterMaker" loading={loading} setLoading={setLoading} />

        <table className="table border">
          <thead className="thead-light">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Email</th>
              <th scope="col">Type</th>
              <th scope="col">Total Post</th>
              {makerList.total && <th scope="col">{pagination * parseInt(params.page)} of {makerList.total}</th>}
            </tr>
          </thead>
          <tbody>
            {makerList.data.map(step => <>
              <tr>
                <th>{step.id}</th>
                <div>{step.email}</div>
                <td>{step.contents.length}</td>
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
      {modal.view == "InviteNewMaker" && <NewUser setModal={setModal} modal={modal} />}
      {modal.view == "deleteConfirm" && <DeleteConfirm modal={{  id: modal.data.id, message: modal.data.email, type: "maker" }} />}
    </div>
  )
}

