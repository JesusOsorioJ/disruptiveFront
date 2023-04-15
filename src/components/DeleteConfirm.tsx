import { deleteOneContent } from "../services/content"
import { deleteOneTopic } from "../services/topic"
import { deleteOneUser } from "../services/user"

import { useState } from "react"
import { LoadingSmall } from "./Loading"

type Props = {
  modal: {
    type: string, message: string, id: number
  }
}


const DeleteConfirm: React.FC<Props> = ({ modal }) => {
  const [message, setMessage] = useState([false, "Eliminar"])
  const handlerOnDelete = async () => {
    setMessage([true, "Eliminando"])
    if (modal.type == "user") { await deleteOneUser(modal.id)}
    if (modal.type == "topic") { await deleteOneTopic(modal.id) }
    if (modal.type == "content") { await deleteOneContent(modal.id) }
    window.location.replace('')
  }

  const handlerOnCancel = () => {
    window.location.replace('')
  }

  return (
    <div className="fixed w-full top-0 start-0 mw-75 ">
    <div className="fixed w-full h-full top-0 bg-gray-600 opacity-25 "></div>

    <div className="fixed top-0 w-full h-full flex justify-center items-center ">
     <div className=" bg-white border-2  border-gray-400 min-w-[500px]">
          <div className='border-b p-3'>
            <h4 className='text-[1.5rem] font-semibold '>Delete confirm</h4>
          </div>
          <div className="p-4">

            <p className="text-justify">¿Esta seguro desea eliminar
              {modal.type == "user" && " usuario con email "} 
              {modal.type == "topic" && " topic de nombre "} 
              {modal.type == "content" && " content de nombre "} 
              {"< "}{modal.message}{" >"} ?</p>

          </div>
          <div className="flex flex-row-reverse gap-4 border-t p-3">
            <button type="button" className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             onClick={handlerOnDelete}>
              {message[0] == true && <LoadingSmall/>}{message[1]}</button>
            <button type="button" className="block rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handlerOnCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirm
