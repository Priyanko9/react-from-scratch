import React from 'react';

export const Pagination =(props)=> {
    let {totalPages,currentPage,totalData,render,callback}=props;
    const showSelectedData=(e)=>{
        let text=e ? e.target.textContent:"";
        let currentPage;
        if(text==="More"){
            currentPage=props.currentPage + 1;
        } else if(text==="First"){
            currentPage=0;
            localStorage.setItem("fromCache",true);
        }
        callback(currentPage);
    };
    return (
        <>
            {render(totalData)}
            <div className="pagination links" data-test="pagination" onClick={(e)=>showSelectedData(e)}>
                {totalPages!==(currentPage+1) ? <span>More</span> : ""}
                {currentPage!==0 ? <span>First</span> : ""}
            </div>
        </>
    )
}