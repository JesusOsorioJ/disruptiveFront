import { useState } from 'react'
import { createOneContent, updateOneContent } from '../services/content'
import { contentType, Initialcontent, topicType } from '../types'
import { LoadingSmall } from './Loading'

type Props = {
  modal: { view: string, data: { content: contentType, topic: topicType } },
  setModal: React.Dispatch<React.SetStateAction<{ view: string, data: { content: contentType, topic: topicType } }>>
}

const NewContent: React.FC<Props> = ({ modal, setModal }) => {

  const categories = ['VIDEO', 'IMAGE', 'TEXT']

  const [form, setForm] = useState(modal.data)
  const [loading, setLoading] = useState([false, ""])
  const [categorySelect, setCategorySelect] = useState(modal.data.topic.categories[0])

  const myObject = JSON.parse(window.sessionStorage.getItem("myObject") || '{"typeUser":""}')
  const { id } = myObject




  const handlerOnChange = (e: any) => {
    const { id, value } = e.target
    setForm({ ...form, content: { ...form.content, [id]: value } })
  }
  const handlerOnSubmit = async (e: any) => {
    e.preventDefault()
    setLoading([true, ""])
    let response
    if (Object.keys(modal.data.content.name).length == 0) {
      console.log("pase por create");
      
      response = await createOneContent({ ...form.content, userId: id, category: categorySelect, topicName: form.topic.name })
    } else {
      console.log("pase por update");
      response = await updateOneContent({ ...form.content, category: categorySelect, topicName: form.topic.name })
    }

    if (response.message.code == "P2002") {
      setLoading([false, "Email existente, intente nuevamente"])
    } else {
      window.location.replace('')
    }
  }
  return (
    <div className="fixed w-full top-0 start-0 mw-75 ">
      <div className="fixed w-full h-full top-0 bg-gray-600 opacity-25 "></div>

      <div className="fixed top-0 w-full h-full flex justify-center items-center ">
        <form className="bg-white border-2 border-gray-400 min-w-[500px]" onSubmit={handlerOnSubmit}>
          <div className='border-b p-3 flex justify-between items-center'>
            <h4 className="border-b p-3 text-[1.5rem] font-semibold ">

              {Object.keys(modal.data.content.name).length == 0 ? 'Create New ' : 'Update '} {" " + form.topic.name}</h4>
            <select id="status" onChange={(e) => setCategorySelect(e.target.value)} value={categorySelect} name="select"
              className="block w-20 rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
              {form.topic.categories.map((step) => <option value={step} key={step}>{step}</option>)}
            </select>

          </div>

          <div className="px-4 pb-4">
            {loading[1].toString().length > 0 ? <p className='text-danger'>{loading[1]}</p> :
              <p className='text-white'>espacio mensaje</p>}
            <div className="form-group">
              <label htmlFor="FirstName">Name</label>
              <input onChange={handlerOnChange} type="text" id="name" placeholder=""
                value={form.content.name} required className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div className="form-group">
              <label htmlFor="Email" >Description</label>
              <textarea onChange={handlerOnChange} id="description" placeholder=""
                value={form.content.description} required className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div className="form-group">
              <label htmlFor="password" >URL Image</label>
              <input onChange={handlerOnChange} type="text" id="urlImage" placeholder=""
                value={form.content.urlImage} required className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div className="form-group">
              <label htmlFor="password" >URL Link</label>
              <input onChange={handlerOnChange} type="text" id="url" placeholder=""
                value={form.content.url} required className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>



          </div>
          <div className='flex justify-between items-center border-t p-3'>
            <button type="button" className="block rounded-md bg-red-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={() => { setModal({ view: "deleteConfirm", data: modal.data }) }}>Delete</button>
            <div className="flex  gap-4  ">
              <button type="button" className="block rounded-md bg-gray-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                onClick={() => window.location.replace('')}>Cancel</button>
              <button type="submit" className="block rounded-md bg-emerald-400 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                {loading[0] == true && <LoadingSmall/>}
                Crear</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewContent