import { useSearchParams } from 'react-router-dom'


export default function Pagination() {
    let [searchParams, setSearchParams] = useSearchParams()

    let params = { page:"1"}
    searchParams.forEach((value, key) =>  Object.assign(params, {[key]:value} ));
    let p = parseInt(params.page);
    
  
    const HandlerNewPage = (e:any) => {
      if (e.target.value == "prev") { p = p - 1 } else {
        if (e.target.value == "next") { p = p + 1 } else {
          p = e.target.value
        }
      }
      setSearchParams({ ...params, page: p.toString() });
      window.location.replace('')
    }
    
  return (
    <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className="page-item">
              {p != 1 && <button onClick={HandlerNewPage} value="prev" className="page-link">Previous</button>}
            </li>
            <li className="page-item">
              {p != 1 && <button onClick={HandlerNewPage} className="page-link" value={p - 1}>{p - 1}</button>}
            </li>
            <li className="page-item">
              <button onClick={HandlerNewPage} className="page-link" value={p}>{p}</button>
            </li>
            <li className="page-item">
              <button onClick={HandlerNewPage} className="page-link" value={p + 1}>{p + 1}</button>
            </li>
            <li className="page-item">
              <button onClick={HandlerNewPage} className="page-link" value={p + 2}>{p + 2}</button>
            </li>
            <li className="page-item">
              {p == 1 && <button onClick={HandlerNewPage} className="page-link" value={p + 3}>{p + 3}</button>}
            </li>
            <li className="page-item">
              <button onClick={HandlerNewPage} value="next" className="page-link">Next</button>
            </li>
          </ul>
    </nav>
  )
}
