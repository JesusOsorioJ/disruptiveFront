import { deleteOneContent } from "../services/content"
import { deleteOneTopic } from "../services/topic"
import { deleteOneUser } from "../services/user"

import { useState } from "react"

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
    <div className="position-fixed w-100 top-0 start-0 border mw-75 ">
      <div className="position-fixed w-100 top-0 bg-secondary bg-opacity-25 w-100 h-100"></div>

      <div className="position-fixed top-0 w-100 h-100 d-flex justify-content-center align-items-center ">

        <div className=" bg-white border border-2 border-secondary">
          <div className='border-bottom p-3'>
            <h4 className='text-secondary'>Delete confirm</h4>
          </div>
          <div className="p-4">

            <p className="text-justify">¿Esta seguro desea eliminar
              {modal.type == "user" && " usuario con email "} 
              {modal.type == "topic" && " usuario con email "} 
              {modal.type == "content" && " usuario con email "} 
              {"< "}{modal.message}{" >"} ?</p>

          </div>
          <div className="d-flex flex-row-reverse gap-4 border-top p-3">
            <button type="button" className="btn btn-danger" onClick={handlerOnDelete}>
              {message[0] == true && <div className="spinner-border spinner-border-sm text-light" role="status"></div>}{message[1]}</button>
            <button type="button" className="btn btn-secondary"
              onClick={handlerOnCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirm
