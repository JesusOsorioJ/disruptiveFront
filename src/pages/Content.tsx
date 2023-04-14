import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'

import { filterByAllContent } from '../services/content'

import Header from '../components/Header'
import FilterMaker from '../components/FilterMaker'
import NewContent from '../components/NewContent'
import Pagination from '../components/Pagination'
import DeleteConfirm from '../components/DeleteConfirm'

import { Initialcontent } from '../types'

export default function Admin() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams()

  const [modal, setModal] = useState({ view: "", data: Initialcontent })
  const [makerList, setMakerList] = useState({ data: [Initialcontent], total: 0 })
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
      const responseAllMaker = await filterByAllContent({ ...params, invitation: false, pagination })
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
          <button type="button" onClick={() => { setModal({ view: "InviteNewMaker", data: Initialcontent }) }}
            className="btn btn-primary">Create New Post</button>
        </div>

        <FilterMaker typeOfFilter="filterMaker" loading={loading} setLoading={setLoading} />


        {makerList.data.map(data =>
          <a href={data.url} className="group relative inline-block overflow-hidden" style={{ width: "350", height: "350" }}>
            <img src={data.urlImage} width="350" height="350" />
            <button type="button" className="btn btn-outline-secondary mx-3"
              onClick={() => { setModal({ view: "InviteNewMaker", data: data }) }}>Edit</button>
            <button type="button" className="btn btn-outline-secondary mx-3"
              onClick={() => { setModal({ view: "InviteNewMaker", data: data }) }}>Edit</button>
            <div className=" w-[350px] h-[180px] absolute bottom-0 left-0 flex flex-col flex-wrap bg-black opacity-80 translate-y-[133px] duration-700 group-hover:translate-y-0">
             
              <div className="p-4 w-[300px]">
                <p className="text-white text-lg">{data.name}</p>
                <p className="text-white text-base pb-3">{data.url}</p>
                <p className="text-white text-sm">{data.description}</p>
              </div>
            </div>
          </a>
        )}

        <Pagination />

      </div>
      {modal.view == "InviteNewMaker" && <NewContent setModal={setModal} modal={modal} />}
      {modal.view == "deleteConfirm" && <DeleteConfirm modal={{ id: modal.data.id, message: modal.data.name, type: "maker" }} />}
    </div>
  )
}