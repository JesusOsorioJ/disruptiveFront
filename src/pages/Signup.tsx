import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { createOneUser } from '../services/user'

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({ type: "CREATOR" })
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

        const response = await createOneUser(form)


        if (response.message.length > 0) {
            const { id, typeUser, email } = response.message[0]
            const myObject = { id, typeUser, email, pagination: 10 }
            window.sessionStorage.setItem("myObject", JSON.stringify(myObject));
            setTypeUser(typeUser)
        } else {
            setMessage('Ha ocurrido un error ,intentelo nuevamente')
            setLoading(false)
        }
    }

    return (
        <section className="">

            <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8 border-2 border-gray-200 p-12 rounded">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Create a new account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{' '}
                            <a href="login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Login into your account  in this link
                            </a>
                        </p>
                        {message.length > 0 ? <p className=" text-danger text-center">{message}</p >
                            : <p className='text-white'> espacio error</p>}
                    </div>
                    <form onSubmit={handlerSubmit}>
                        <div className="sm:col-span-3">
                            <div className="relative mb-6">
                                <select onChange={handlerChange}
                                    id="type"
                                    autoComplete="country-name"
                                    className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                    <option value="CREATOR">CREATOR</option>
                                    <option value="READER">READER</option>
                                </select>
                            </div>
                        </div>
                        {/* email input  */}
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mb-6">
                                <input onChange={handlerChange}
                                    type="email"
                                    id="email"
                                    placeholder='Input your email '
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {/* Password input  */}
                        <div className="sm:col-span-2">
                            <label htmlFor="Password" className="block text-sm font-semibold leading-6 text-gray-900">
                            Password
                            </label>
                            <div className="mb-6">
                                <input onChange={handlerChange}
                                    type="password"
                                    id="password"
                                    placeholder='Input your password'
                                    autoComplete="organization"
                                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>




                        {/* Submit button  */}

                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                {loading == true && <div className="spinner-border spinner-border-sm text-light" role="status"></div>}
                            </span>
                            Create
                        </button>


                    </form>
                </div>
            </div>


        </section>

    )
}
