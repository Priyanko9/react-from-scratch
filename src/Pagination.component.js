import React,{Component} from 'react';

export class Pagination extends Component {

    constructor(props){
        super(props);
        this.state={
            pagesToShow:[1,2,3],
            dataToShow:props.totalData.slice(0,3),
            currentPage:1,
            totalCount:props.totalData.length,
            firstPage:true,
            lastPage:false
        }
    }
    common(startindex,pagesToShow,currentPage,firstPage,lastPage){
        let startIndex=startindex || 0;
        let dataPerPage=3;
        let endIndex=startIndex ? (startIndex+dataPerPage) : 3;
        this.setState({
            dataToShow:this.props.totalData.slice(startIndex,endIndex),
            pagesToShow:pagesToShow || this.state.pagesToShow,
            currentPage:currentPage || this.state.currentPage,
            firstPage:firstPage || this.state.firstPage,
            lastPage:lastPage || this.state.lastPage
        });
    }
    showSelectedData(e){
        console.log("show selected Data");
        let text=e.target.textContent;
        let dataPerPage=3;
        let currentPage,startIndex;
        let pagesToShow=this.state.pagesToShow;
        let totalPages=this.state.totalCount/dataPerPage;
        let lastPageData=this.state.totalCount%dataPerPage;
        if(lastPageData > 0){
            totalPages=totalPages+1;
        }
        if(text==="next"){
            currentPage=this.state.currentPage + 1;
            startIndex=(currentPage-1)*dataPerPage;
            let lastPage=currentPage===totalPages? true : false;
            if(pagesToShow.indexOf(currentPage) < 0){
                pagesToShow.push(pagesToShow[pagesToShow.length-1]+1);
                pagesToShow.shift();
            }
            this.common(startIndex,pagesToShow,currentPage,false,lastPage);
        } 
    }
    render(){
        return (
            <>
                {this.props.render(this.state.dataToShow)}
                <div className="pagination" onClick={(e)=>this.showSelectedData(e)}>
                    {!this.state.lastPage && "More"}
                </div>
            </>
        )
    }
}