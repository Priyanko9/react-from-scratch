import React, { Component } from 'react';

import {getFeedData} from './FetchData.service';
import Home from './Home.component';
import {Pagination} from './Pagination.component';
import ErrorBoundary from './ErrorBoundary';


export class App extends Component {
  constructor(props){
    super(props);
    this.state={
        rows:[],
        currentPage:0
    };
  }
  
  componentDidMount(){
    //let data=JSON.parse(localStorage.getItem("newsData"));
    localStorage.removeItem("newsData")
    localStorage.removeItem("fromCache");
    //if(!data){
      this.getNewsFeedData(this.state.currentPage);
    // } else {
    //   this.setState({
    //     rows:data,
    //     currentPage:0
    //   })
    // }
  }
   getNewsFeedData=async (pageNumber)=>{
    let fetchedObject,rows,currentPage,totalPages;
    let fromCache=localStorage.getItem("fromCache");
    let hitsPerPage=this.state.hitsPerPage;
    if(fromCache){
      rows=JSON.parse(localStorage.getItem("newsData")).slice(pageNumber*this.state.hitsPerPage,(pageNumber*this.state.hitsPerPage+this.state.hitsPerPage));
      currentPage=pageNumber;
      totalPages=this.state.totalPages;
    } else {
      fetchedObject=await getFeedData(pageNumber);
      rows=fetchedObject.totalRows;
      currentPage=fetchedObject.totalData.page;
      totalPages=fetchedObject.totalData.nbPages;
      hitsPerPage=fetchedObject.totalData.hitsPerPage;
    }
    localStorage.setItem("currentPage",currentPage);
    localStorage.setItem("hitsPerPage",hitsPerPage);
    this.setState({
      rows,
      currentPage,
      totalPages,
      hitsPerPage
    });
  }
  render(){
    
    return (
      <div className="App">
        <header>
          Hacker News
        </header>
        {this.state.rows.length > 0 && <Pagination 
            totalData={this.state.rows} 
            callback={this.getNewsFeedData} 
            currentPage={this.state.currentPage}
            totalPages={this.state.totalPages}
            hitsPerPage={this.state.hitsPerPage}
            render={(data)=>
                <Home rows={data}/>
            }/>}
      </div>
    );
  }
}


export default function AppErrorBoundary(props) {

  return (
    <ErrorBoundary>
      <App {...props} />
    </ErrorBoundary>
  );
}
