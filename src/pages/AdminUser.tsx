import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'

import { filterByAllUser } from '../services/user'

import Header from '../components/Header'
import Filter from '../components/Filter'
import NewUser from '../components/NewUser'
import Pagination from '../components/Pagination'
import DeleteConfirm from '../components/DeleteConfirm'

import { Initialuser } from '../types'

export default function Admin() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams()

  const [modal, setModal] = useState({ view: "admin", data: Initialuser })
  const [userList, setUserList] = useState({ data: [Initialuser], total: 0 })
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
      const responseAllUser = await filterByAllUser({ ...params, pagination })
      setUserList(responseAllUser.message)
      console.log('responseAllUser.message', responseAllUser.message.data);
      
      setLoading(false)
    })()

  }, [loading])

  return (

    <div>
      <Header />
      <div className="p-4">
        <div className='flex justify-between '>
          <h4>Usuarios</h4>
          <button type="button" onClick={() => { setModal({ view: "NewUser", data: Initialuser }) }}
            className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              New User</button>
        </div>
        
        
        <Filter typeOfFilter="filterUser" loading={loading} setLoading={setLoading} />

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4">
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Type</th>
              <th scope="col" className="px-6 py-3">Total Post</th>
              <th scope="col" className="px-6 py-3">Update</th>
              {userList.total && <th scope="col">{pagination * parseInt(params.page)} of {userList.total}</th>}
            </tr>
          </thead>
          <tbody>
            {userList.data.map(step => <>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {step.id}</th>
                <td className="px-6 py-4" >{step.email}</td>
                <td className="px-6 py-4" >{step.type}</td>
                <td className="px-6 py-4" >{step.contents.length}</td>
                <td className="px-6 py-4" >{step.updatedAt&&format(Date.parse(step.updatedAt), 'MM/dd/yyyy HH:mm')}</td>
                <td className="px-6 py-4">
                <button type="button" className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                    onClick={() => { setModal({ view: "NewUser", data: step }) }}>Edit</button>
                  
                </td>
              </tr>
            </>
            )}

          </tbody>
        </table>
        <Pagination />

      </div>
      {modal.view == "NewUser" && <NewUser setModal={setModal} modal={modal} />}
      {modal.view == "deleteConfirm" && <DeleteConfirm modal={{  id: modal.data.id, message: modal.data.email, type: "user" }} />}
    </div>
  )
}

