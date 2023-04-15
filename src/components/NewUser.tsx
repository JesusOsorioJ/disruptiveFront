import { useState } from 'react'
import { createOneUser, updateOneUser } from '../services/user'
import { userType } from '../types'
import { LoadingSmall } from './Loading'

type Props = {
  modal: { view: string, data: userType }
  setModal: React.Dispatch<React.SetStateAction<{ view: string, data: userType }>>
}

const NewUser: React.FC<Props> = ({ modal, setModal }) => {

  const [form, setForm] = useState(modal.data)
  const [loading, setLoading] = useState([false, ""])

  const handlerOnChange = (e: any) => {
    const { id, value } = e.target
    setForm({ ...form, [id]: value })
  }
  const handlerOnSubmit = async (e: any) => {
    e.preventDefault()
    setLoading([true, ""])
    let response
    if (Object.keys(modal.data.email).length == 0) {
      response = await createOneUser(form)
    } else {
      response = await updateOneUser(form)
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
            {Object.keys(modal.data.email).length == 0 ? 'Create new  user' : 'Update  user'}</h4>
          <div className="px-4 pb-4">
            {loading[1].toString().length > 0 ? <p className=' text-red-400 text-sm text-center'>{loading[1]}</p> :
              <p className='text-white'>espacio mensaje</p>}
            <select onChange={handlerOnChange}
              id="type"
              value={form.type}
              autoComplete="country-name"
              className="block w-full rounded-md border-0 py-3 my-6 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="CREATOR">CREATOR</option>
              <option value="READER">READER</option>
            </select>
            <div>
              <label htmlFor="Email" >Email</label>
              <input onChange={handlerOnChange} type="email" id="email" placeholder="" value={form.email} required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div>
              <label htmlFor="password" >Password</label>
              <input onChange={handlerOnChange} type="text" id="password" placeholder="" value={form.password} required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>

          </div>
          <div className='flex justify-between items-center border-t p-3'>
            <button type="button" className="block rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
              onClick={() => { setModal({ view: "deleteConfirm", data: modal.data }) }}>Delete</button>

            <div className="flex  gap-4  ">
              <button type="button" className="block rounded-md bg-gray-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                onClick={() => window.location.replace('')}>Cancel</button>
              <button type="submit" className="block rounded-md bg-emerald-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">
                {loading[0] == true && <LoadingSmall/>}
                Acept</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewUser