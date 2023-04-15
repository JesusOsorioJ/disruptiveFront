import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'

import { getAllTopic } from '../services/topic'

import Header from '../components/Header'
import Filter from '../components/Filter'
import NewTopic from '../components/NewTopic'
import Pagination from '../components/Pagination'
import DeleteConfirm from '../components/DeleteConfirm'

import { Initialtopic } from '../types'

export default function Admin() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams()

  const [modal, setModal] = useState({ view: "admin", data: Initialtopic })
  const [userList, setUserList] = useState({ data: [Initialtopic], total: 0 })
  const [loading, setLoading] = useState(true)

  let params = { page: "1" }
  searchParams.forEach((value, key) => Object.assign(params, { [key]: value }));
  const myObject = JSON.parse(window.sessionStorage.getItem("myObject") || '{"typeUser":""}')
  const { typeUser, pagination } = myObject

  useEffect(() => {
    if (typeUser != 'admin') {
      navigate('/login')

    }

    (async () => {
      const responseAllTopic = await getAllTopic({ ...params, pagination })
      
      setUserList(responseAllTopic.message)
      setLoading(false)
    })()

  }, [loading])

  return (

    <div>
      <Header />
      <div className="p-4">
        <div className='flex justify-between '>
          <h4>Topic</h4>
          <button type="button" onClick={() => { setModal({ view: "NewTopic", data: Initialtopic }) }}
            className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              New Topic</button>
        </div>

        <Filter typeOfFilter="filterTopic" loading={loading} setLoading={setLoading} />

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>

            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Categories</th>
              <th scope="col" className="px-6 py-3">Url image</th>
              <th scope="col" className="px-6 py-3">Created</th>
              {userList.total && <th scope="col">{pagination * parseInt(params.page)} of {userList.total}</th>}
            </tr>
          </thead>
          <tbody>
            {userList.data.map(step => <>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {step.id}</th>
                <th className="px-6 py-4" >{step.name}</th>
                <td className="px-6 py-4" >{step.categories.map((category) =>category+" ")}</td>
                <th className="px-6 py-4" >{step.urlImage.substring(0,30)}</th>
                <td className="px-6 py-4" >{step.updatedAt&&format(Date.parse(step.updatedAt), 'MM/dd/yyyy HH:mm')}</td>
                <td className="px-6 py-4" >
                  <button type="button" className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => { setModal({ view: "NewTopic", data: step }) }}>Edit</button>
                  
                </td>
              </tr>
            </>
            )}

          </tbody>
        </table>
        <Pagination />

      </div>
      {modal.view == "NewTopic" && <NewTopic setModal={setModal} modal={modal} />}
      {modal.view == "deleteConfirm" && <DeleteConfirm modal={{  id: modal.data.id, message: modal.data.name, type: "topic" }} />}
    </div>
  )
}