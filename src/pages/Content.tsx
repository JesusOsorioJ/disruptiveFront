import { useNavigate, useSearchParams, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'

import { filterByAllContent } from '../services/content'
import { getAllTopic } from '../services/topic'

import Header from '../components/Header'
import Filter from '../components/Filter'
import NewContent from '../components/NewContent'
import Pagination from '../components/Pagination'
import DeleteConfirm from '../components/DeleteConfirm'

import { Initialcontent, Initialtopic } from '../types'
import { LoadingBig } from '../components/Loading'

export default function Admin() {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams()
  const { page } = useParams()

  const [modal, setModal] = useState({ view: "", data: { content: Initialcontent, topic: Initialtopic } })
  const [contentList, setContentList] = useState({ data: [Initialcontent], total: 0 })

  const [loading, setLoading] = useState(true)

  let params = { page: "1" }
  searchParams.forEach((value, key) => Object.assign(params, { [key]: value }));
  const myObject = JSON.parse(window.sessionStorage.getItem("myObject") || '{"typeUser":""}')
  const { typeUser, id, pagination } = myObject
  const topicName = myObject.topicName


  useEffect(() => {
    if (typeUser != 'ADMIN' && typeUser != 'CREATOR' && typeUser != 'READER') {
      navigate('/login')
    }

    (async () => {
      let userId = 0
      if (page == 'details') { userId = id }
      const responseAllContent = await filterByAllContent({
        ...params, userId, pagination, topicName: topicName.name
      })
      setContentList(responseAllContent.message)
      setLoading(false)
    })()

  }, [loading])

  return (
    <div>{typeUser != "" && <div>
      <Header />
      <div className="p-4" >
        {page != 'details' ?
          <div className='flex justify-between items-center object-none' style={{ backgroundImage: `url(${topicName.urlImage})` }}>
            <div className='flex items-center'>
              <h4 className="text-[2rem] text-white px-5 uppercase font-semibold">{topicName.name}</h4>
              <div className='d-flex flex-column align-items-center mx-4'>
                <h6 className="text-[1.2rem] text-white">Total</h6>
                <p className="text-white">{pagination * parseInt(params.page)} of {contentList.total}</p>
              </div>
            </div>
            <div className='py-12 px-6'>
              {typeUser != 'READER' && <button type="button" onClick={() => { setModal({ view: "NewContent", data: { content: Initialcontent, topic: topicName } }) }}
                className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Create New Post</button>}
            </div>
          </div> :
          <div className='flex justify-between items-center' >
            <div className='flex items-center'>
              <h4 className="text-[2rem px-5 uppercase font-semibold">My contributions</h4>
              <h6 className="text-[1.2rem] px-6">Total: {contentList.total}</h6>
              {loading == true && <LoadingBig />}
            </div>
            <h4 className="text-[2rem] text-white px-5 uppercase font-semibold">{topicName.name}</h4>
            <button type="button" onClick={() => { setModal({ view: "NewContent", data: { content: Initialcontent, topic: topicName } }) }}
              className="p-4block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Create New Post</button>
          </div>
        }

        {page != 'details' && <Filter typeOfFilter="filterContent" loading={loading} setLoading={setLoading} />}

        <div className='grid grid-cols-4 gap-6 px-12  py-6 '>
          {contentList.data.map(data =>
            <div className=" group  relative inline-block overflow-hidden" style={{ width: "100%", height: "350px" }}>
              <img src={data.urlImage} style={{ width: "100%", height: "350px" }} />

              {(typeUser == 'ADMIN' || page == 'details') && <button type="button" className=" absolute top-2 right-20 block rounded-md bg-cyan-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => { setModal({ view: "NewContent", data: { content: data, topic: topicName } }) }}>Edit</button>}
              <a href={data.url} className="absolute top-2 right-2 block rounded-md bg-cyan-900 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >
                Link
              </a>
              <div className="w-full  h-[180px] absolute bottom-0 left-0 flex flex-col flex-wrap bg-black opacity-80 translate-y-[133px] duration-700 group-hover:translate-y-0">

                <div className="p-4 w-full">
                  <div className='flex justify-between mb-3'>
                    <p className="text-white text-lg">{data.category}: {data.name}</p>
                    <p className="text-white text-sm">{data.updatedAt && format(Date.parse(data.updatedAt), 'MM/dd')}</p>
                  </div>
                  <p className="text-white text-base">Description</p>

                  <p className="text-white text-sm">{data.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>


        {page != 'details' && <Pagination />}

      </div>
      {modal.view == "NewContent" && <NewContent setModal={setModal} modal={modal} />}
      {modal.view == "deleteConfirm" && <DeleteConfirm modal={{ id: modal.data.content.id, message: modal.data.content.name, type: "content" }} />}
    </div>}</div>
  )
}