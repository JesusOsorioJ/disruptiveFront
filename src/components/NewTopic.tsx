import { useState, useEffect } from 'react'
import { createOneTopic, updateOneTopic } from '../services/topic'
import { topicType, Initialtopic } from '../types'

type Props = {
  modal: { view: string, data: topicType }
  setModal: React.Dispatch<React.SetStateAction<{ view: string, data: topicType }>>
}


const InviteNewMaker: React.FC<Props> = ({ modal, setModal }) => {

  const status = ['TEXT', 'IMAGE', 'VIDEO']

  const [form, setForm] = useState(modal.data)
  const [cat, setcat] = useState([false,false,false])
  const [loading, setLoading] = useState([false, ""])
  
  useEffect(() => {
  let category = []
  for (let i of status) {
    let con = 0
    for (let j of modal.data.categories) {
      if (i == j) { con = 1 }
    }
    if (con == 1) { category.push(true) } else { category.push(false) }
    setcat(category)
  }},[])

  const handlerOnChange = (e: any) => {
    const { id, value } = e.target
    setForm({ ...form, [id]: value })
  }
  
  const ClickCategory = (e: any) => {
    const { value } = e.target
    console.log(value);
    
    if(value=='TEXT'){setcat([!cat[0],cat[1],cat[2]])}
    if(value=='IMAGE'){setcat([cat[0],!cat[1],cat[2]])}
    if(value=='VIDEO'){setcat([cat[0],cat[1],!cat[2]])}
  }



  const handlerOnSubmit = async (e: any) => {
    e.preventDefault()
    setLoading([true, ""])
    let response
    if (Object.keys(modal.data.name).length == 0) {
      response = await createOneTopic(form)
    } else {
      response = await updateOneTopic(form)
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
            {Object.keys(modal.data).length == 0 ? 'Invite' : 'Update'} New Maker</h4>
          <div className="px-4 pb-4">
            {loading[1].toString().length > 0 ? <p className='text-danger'>{loading[1]}</p> :
              <p className='text-white'>espacio mensaje</p>}
            {/* {Initialtopic} */}
            <div className="form-group">
              <label htmlFor="Email" >Name</label>
              <input onChange={handlerOnChange} type="email" className="form-control"
                id="email" placeholder="" value={form.name} required />
            </div>
            <div className="form-group">
              <label htmlFor="password" >Url Image</label>
              <input onChange={handlerOnChange} type="password" className="form-control"
                id="password" placeholder="" value={form.urlImage} required />
            </div>
            <div className="form-group">
              <button type="button" onClick={ClickCategory} value='TEXT' className={`block rounded-md ${cat[0]?'bg-indigo-600':'bg-red-600'} px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>TEXT</button>
              <button type="button" onClick={ClickCategory} value='IMAGE' className={`block rounded-md ${cat[1]?'bg-indigo-600':'bg-red-600'} px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>IMAGE</button>
              <button type="button" onClick={ClickCategory} value='VIDEO' className={`block rounded-md ${cat[2]?'bg-indigo-600':'bg-red-600'} px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>VIDEO</button>

            </div>



          </div>
          <div className='flex justify-between items-center border-t p-3'>
            <button type="button" className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => { setModal({ view: "deleteConfirm", data: modal.data }) }}>Delete</button>

            <div className="flex  gap-4  ">
              <button type="button" className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => window.location.replace('')}>Cancel</button>
              <button type="submit" className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {loading[0] == true && <div className="spinner-border spinner-border-sm text-light" role="status"></div>}
                Acept</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default InviteNewMaker