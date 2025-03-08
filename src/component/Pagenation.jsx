import React, { useEffect, useState } from 'react'

const Pagenation = ({ totalPages = 1, onChange }) => {

    const [selectedPage, setSelectedPage] = useState(1);
    const [pages, setPages] = useState([1]);

    useEffect(() => {
        const pageArr = [];
        for (let i = 1; i <= totalPages; i++)
            pageArr.push(i);
        setPages(pageArr);
    }, [totalPages]);

    const handleChange = (e, pageNum) => {

        e.preventDefault();
        setSelectedPage(pageNum);

        if (onChange)
            onchange(pageNum);
    }

    return (
        <div className="col-12">
            <div className="paginationContainer">
                <nav aria-label="Page navigation">
                    <ul className="pagination pagination-lg justify-content-center">
                        {totalPages > 4 && <li className={`page-item ${selectedPage === 1 ? 'disabled' : ''} `}>
                            <a className="page-link" href="#" aria-label="Previous" onClick={(e) => {
                                e.preventDefault();
                                if (selectedPage > 1)
                                    handleChange(e, selectedPage - 1);
                            }}>
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>}
                        {pages.map(item => <li className={`page-item ${selectedPage === item ? 'active' : ''}`} aria-current="page" ><a className="page-link" href="#"
                            onClick={(e) => { handleChange(e, item) }}>{item}</a></li>)}
                        {totalPages > 4 && < li className={`page-item ${selectedPage === totalPages ? 'disabled' : ''} `}>
                            <a className="page-link" href="#" aria-label="Next" onClick={(e) => {
                                e.preventDefault();
                                if (selectedPage !== totalPages)
                                    handleChange(e, selectedPage + 1);
                            }}>
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>}
                    </ul>
                </nav>
            </div>
        </div >
    )
}

export default Pagenation