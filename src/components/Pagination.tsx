import { useSearchParams } from 'react-router-dom'


export default function Pagination() {
  let [searchParams, setSearchParams] = useSearchParams()

  let params = { page: "1" }
  searchParams.forEach((value, key) => Object.assign(params, { [key]: value }));
  let p = parseInt(params.page);


  const HandlerNewPage = (e: any) => {
    if (e.target.value == "prev") { p = p - 1 } else {
      if (e.target.value == "next") { p = p + 1 } else {
        p = e.target.value
      }
    }
    setSearchParams({ ...params, page: p.toString() });
    window.location.replace('')
  }

  return (
    <nav className='flex justify-end px-5'>
      <ul className="inline-flex -space-x-px">
        <li>
          {p != 1 && <button onClick={HandlerNewPage} value="prev" className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Previous</button>}
        </li>
        <li>
          {p != 1 && <button onClick={HandlerNewPage} value={p - 1} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {p - 1}</button>}
        </li>
        <li>
          <button onClick={HandlerNewPage} value={p} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {p}</button>
        </li>
        <li>
          <button onClick={HandlerNewPage} value={p + 1} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {p + 1}</button>
        </li>
        <li>
          <button onClick={HandlerNewPage} value={p + 2} className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            {p + 2}</button>
        </li>
        <li>
          <button onClick={HandlerNewPage} value="next" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            Next</button>
        </li>
      </ul>
    </nav>
  )
}
