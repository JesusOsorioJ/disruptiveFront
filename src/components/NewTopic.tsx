import { useState, useEffect } from 'react'
import { createOneTopic, updateOneTopic } from '../services/topic'
import { topicType, Initialtopic } from '../types'
import { LoadingSmall } from './Loading'

type Props = {
  modal: { view: string, data: topicType }
  setModal: React.Dispatch<React.SetStateAction<{ view: string, data: topicType }>>
}


const NewTopic: React.FC<Props> = ({ modal, setModal }) => {

  const initialCat = ['TEXT', 'IMAGE', 'VIDEO']

  const [form, setForm] = useState(modal.data)
  const [cat, setcat] = useState([false, false, false])
  const [loading, setLoading] = useState([false, ""])


  useEffect(() => {
    let category = []
    for (let i of initialCat) {
      let con = 0
      for (let j of modal.data.categories) { if (i == j) { con = 1 } }
      if (con == 1) { category.push(true) } else { category.push(false) }
      setcat(category)
    }
  }, [])

  const handlerOnChange = (e: any) => {
    const { id, value } = e.target
    setForm({ ...form, [id]: value })
  }

  const ClickCategory = (e: any) => {
    const { value } = e.target
    console.log(value);
    if (value == 'TEXT') { setcat([!cat[0], cat[1], cat[2]]) }
    if (value == 'IMAGE') { setcat([cat[0], !cat[1], cat[2]]) }
    if (value == 'VIDEO') { setcat([cat[0], cat[1], !cat[2]]) }
  }

  

  const handlerOnSubmit = async (e: any) => {
    e.preventDefault()
    setLoading([true, ""])
    let vec = []
    for (let i in cat) { if (cat[i]){ vec.push(initialCat[i])} }
    let response
    console.log("vec",vec);
    
    if (Object.keys(modal.data.name).length == 0) {
      
        response = await createOneTopic({...form,categories:vec})
      } else {
        response = await updateOneTopic({...form,categories:vec})
      

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
          <h4 className="border-b p-3 text-[1.5rem] font-semibold ">
            {Object.keys(modal.data).length == 0 ? 'Create New ' : 'Update '} User</h4>
          <div className="px-4 pb-4">
            {loading[1].toString().length > 0 ? <p className='text-danger'>{loading[1]}</p> :
              <p className='text-white'>espacio mensaje</p>}
            {/* {Initialtopic} */}
            <div className='mb-6'>
              <label htmlFor="Email" >Name</label>
              <input onChange={handlerOnChange} type="text" id="name" placeholder="Input a name" value={form.name}
                required className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div className='mb-6'>
              <label htmlFor="password" >Url Image</label>
              <input onChange={handlerOnChange} type="text" id="urlImage" placeholder="Input a url Image" value={form.urlImage}
                required className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label htmlFor="password" >Category</label>
              <div className="flex justify-around mt-4 bg-slate-200 py-3">
                <button type="button" onClick={ClickCategory} value='TEXT' className={`block rounded-md ${cat[0] ? 'bg-gray-600' : 'bg-gray-400'} px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>TEXT</button>
                <button type="button" onClick={ClickCategory} value='IMAGE' className={`block rounded-md ${cat[1] ? 'bg-gray-600' : 'bg-gray-400'} px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>IMAGE</button>
                <button type="button" onClick={ClickCategory} value='VIDEO' className={`block rounded-md ${cat[2] ? 'bg-gray-600' : 'bg-gray-400'} px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>VIDEO</button>
              </div>
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
                Acept</button>
            </div>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default NewTopic