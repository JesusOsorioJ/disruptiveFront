import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { authenticateUser } from '../services/user'

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [typeUser, setTypeUser] = useState("")

    const handlerChange = (e: any) => {
        const { id, value } = e.target
        setForm({ ...form, [id]: value })
    }

    useEffect(() => {
        const myObject = JSON.parse(window.sessionStorage.getItem("myObject") || '{"typeUser":""}')
        if (myObject.typeUser == 'maker') { navigate('/') }
        if (myObject.typeUser == 'admin') { navigate('/admin') }

    }, [typeUser])

    const handlerSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)

        const response = await authenticateUser(form)

        if (response.message.length > 0) {
            const { id, typeUser, email } = response.message[0]
            const myObject = { id, typeUser, email, pagination: 10 }
            window.sessionStorage.setItem("myObject", JSON.stringify(myObject));
            setTypeUser(typeUser)
        } else {
            setMessage('No se encontro user o contraseña, intentelo nuevamente')
            setLoading(false)
        }
    }

    return (
        <section className="">
            <section className="h-screen">
                <div className="container h-full px-6 py-24">
                    <div
                        className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between" style={{ backgroundColor: "#f5f5f5" }}>
                        {/* Left column container with background */}
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <h1 className="my-5 display-3 fw-bold ls-tight">
                                MakerHub <br />
                                <span className="text-primary">Aplicaciones</span>
                            </h1>
                            <p style={{ color: "#75808f" }}>
                                Hola, aqui podras gestionar tus aplicaciones para Maker Real,
                                puedes ingresa con tu usuario y contraseña.
                            </p>
                        </div>
                        {/* Right column container with form */}
                        <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
                            <h3 className="mb-3 text-center">Login</h3>
                            {message.length > 0 ? <p className=" text-danger text-center">{message}</p >
                                : <p className='text-white'> espacio error</p>}

                            <form onSubmit={handlerSubmit}>
                                {/* Email input */}
                                <div className="relative mb-6" data-te-input-wrapper-init>
                                    <input
                                        type="text"
                                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                        id="exampleFormControlInput3"
                                        placeholder="Email address" />
                                    <label
                                        htmlFor="exampleFormControlInput3"
                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                    >Email address
                                    </label>
                                </div>

                                {/* Password input  */}
                                <div className="relative mb-6" data-te-input-wrapper-init>
                                    <input
                                        type="password"
                                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                        id="exampleFormControlInput33"
                                        placeholder="Password" />
                                    <label
                                        htmlFor="exampleFormControlInput33"
                                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                    >Password
                                    </label>
                                </div>

                                {/* Submit button  */}
                                <button
                                    type="submit"
                                    className="inline-block w-full rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    data-te-ripple-init
                                    data-te-ripple-color="light">
                                    {loading == true && <div className="spinner-border spinner-border-sm text-light" role="status"></div>}
                                    Sign in
                                </button>



                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </section>

    )
}
