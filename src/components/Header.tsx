
export default function Header() {
    const myObject = JSON.parse(window.sessionStorage.getItem("myObject") || '{"typeUser":""}')
    const { email, typeUser } = myObject
    console.log("typeUser", typeUser);

    const handlerLogout = () => {
        window.sessionStorage.setItem("myObject", "");
        window.location.replace('')
    }

    return (
        <header>
            <nav className="bg-gray-200 border-gray-200 px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <a href="" className="flex items-center">

                        <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="40px" height="40px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xmlSpace="preserve">
                            <g>
                                <path fill="#F9EBB2" d="M8,8h48v32.688l-9.113-9.113c-1.562-1.559-4.094-1.559-5.656,0L16.805,56H8V8z" />
                                <polygon fill="#B4CCB9" points="28.117,56 44.059,40.059 56,52 56,56 	" />
                                <g>
                                    <path fill="#394240" d="M60,0H4C1.789,0,0,1.789,0,4v56c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V4C64,1.789,62.211,0,60,0z
			                        M56,56H28.117l15.941-15.941L56,52V56z M56,40.688l-9.113-9.113c-1.562-1.559-4.094-1.559-5.656,0L16.805,56H8V8h48V40.688z"/>
                                    <circle fill="#394240" cx="24" cy="24" r="8" />
                                </g>
                            </g>
                        </svg>
                        <span className="self-center mx-5 text-xl font-semibold text-gray-600 whitespace-nowrap dark:text-white">DISRUPTIVE</span>
                    </a>
                    <div className="flex items-center order-2">
                    <p className="font-semibold  text-gray-600 mx-7">{email}</p>

                        <button onClick={handlerLogout} className="text-gray-800  hover:bg-red-400  hover:text-white focus:ring-4 focus:ring-gray-300 font-medium text-sm  px-3  py-4 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Logout</button>
                    </div>
                    <div className="flex  justify-between items-center " id="mobile-menu-2">
                        <ul className="flex font-medium flex-row space-x-8 ">
                            {typeUser == undefined && <li>
                                <a href="/admintopic" className="text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium px-3 py-4 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Admin_Topic</a>
                            </li>}
                            {typeUser == undefined && <li>
                                <a href="/adminuser" className="text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium px-3 py-4 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Admin_User</a>
                            </li>}
                            {typeUser == undefined && <li>
                                <a href="/" className="text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium px-3 py-4 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Home</a>
                            </li>}
                            {typeUser == undefined && <li>
                                <a href="/home/details"  className="hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium px-3 py-4 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">User_Details</a>
                            </li>}

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
