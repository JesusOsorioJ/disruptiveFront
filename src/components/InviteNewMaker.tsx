import { useState } from 'react'
import { createOneMaker, updateOneMaker } from '../../services/user'
import { makerType, Initialmaker} from '../../types'



type Props = {
  modal: { view: string, data: makerType }
  setModal: React.Dispatch<React.SetStateAction<{ view: string, data: makerType }>>
}

const InviteNewMaker: React.FC<Props> = ({ modal, setModal }) => {


  const status = ['GRACE_PERIOD', 'STUDYING', 'SEARCHING', 'UNEMPLOYED', 'EMPLOYED']
  
  const [form, setForm] = useState( modal.data )
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
      response = await createOneMaker(form)
    } else {
      response = await updateOneMaker(form)
    }

    if (response.message.code == "P2002") {
      setLoading([false, "Email existente, intente nuevamente"])
    } else {
      window.location.replace('')
    }
  }
  return (
    <div className="position-fixed w-100 top-0 start-0 border mw-75 ">
      <div className="position-fixed w-100 top-0 bg-secondary bg-opacity-25 w-100 h-100"></div>

      <div className="position-fixed top-0 w-100 h-100 d-flex justify-content-center align-items-center ">
        <form className="bg-white border border-2 border-secondary" onSubmit={handlerOnSubmit}>
          <h4 className="border-bottom p-3 ">
            {Object.keys(modal.data).length == 0 ? 'Invite' : 'Update'} New Maker</h4>
          <div className="px-4 pb-4">
            {loading[1].toString().length > 0 ? <p className='text-danger'>{loading[1]}</p> :
              <p className='text-white'>espacio mensaje</p>}
            <div className="form-group">
              <label htmlFor="FirstName">Full Name</label>
              <input onChange={handlerOnChange} type="text" className="form-control"
                id="name" placeholder="" value={form.name} required />
            </div>
            <div className="form-group">
              <label htmlFor="Email" >Email</label>
              <input onChange={handlerOnChange} type="email" className="form-control"
                id="email" placeholder="" value={form.email} required />
            </div>
            <div className="form-group">
              <label htmlFor="password" >Password</label>
              <input onChange={handlerOnChange} type="password" className="form-control"
                id="password" placeholder="" value={form.password} required />
            </div>
            <div className="d-flex gap-3">
              <div className="form-group">
                <label htmlFor="topCohort">Cohort (Top)</label>
                <input onChange={handlerOnChange} type="text" className="form-control"
                  id="topCohort" placeholder="" value={form.topCohort} required />
              </div>
              <div className="form-group d-flex flex-column ">
                <label htmlFor="Description">Status</label>
                <select id="status" onChange={handlerOnChange} value={form.status} name="select" className="form-select">
                  {status.map((step) => <option value={step} key={step}>{step}</option>)}
                </select>
              </div>
            </div>

          </div>
          <div className='d-flex justify-content-between align-items-center border-top p-3'>
            <button type="button" className="btn btn-danger"
              onClick={() => { setModal({ view: "deleteConfirm", data: modal.data }) }}>Delete</button>

            <div className="d-flex  gap-4  ">
              <button type="button" className="btn btn-secondary"
                onClick={() => window.location.replace('')}>Cancel</button>
              <button type="submit" className="btn btn-success">
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