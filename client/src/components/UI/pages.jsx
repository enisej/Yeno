import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Pagination} from "react-bootstrap";
import {Context} from "../../index";

const Pages = observer(() => {
    const {vacancies} = useContext(Context)
    const pageCount = Math.ceil(vacancies.totalCount / vacancies.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-3 d-flex justify-content-center">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={vacancies.page === page}
                    onClick={() => vacancies.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;