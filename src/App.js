import React, { Component } from 'react';

import {API_URL,FRONTPAGE_TAG} from './Constants';

import {Home} from './Home.component';
import {Pagination} from './Pagination.component';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
        rows:[]
    };
  }
  checkTimeDifference(){
    const date1 = new Date();
    const date2 = new Date('2020-04-29T12:03:57.000Z');
    const diffTime = Math.abs(date2 - date1);
    
    if(Math.ceil(diffTime / (1000 * 60) < 60)){
      return Math.ceil(diffTime / (1000 * 60) < 60);
    } else if(Math.ceil(diffTime / (1000 * 60 * 60) < 24 && Math.ceil(diffTime / (1000 * 60) >= 60))){
      return Math.ceil(diffTime / (1000 * 60 * 60));
    } else {
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  }
  componentDidMount(){
    let url=API_URL+"?tags="+FRONTPAGE_TAG;
    fetch(url).then(async (result)=>{
        let totalData=await result.json();
        let count=totalData.hits;
        let totalRows=[];
        count.forEach(ele=>{
            let row={
                "title":ele.title,
                "url":ele.url,
                "author":ele.author,
                "points":ele.points,
                "duration":this.checkTimeDifference(ele.created_at),
                "hide":false
            }
            totalRows.push(row);
        })
        localStorage.setItem("newsData",JSON.stringify(totalRows));
        this.setState({
            rows:totalRows
        });
        console.log(totalData);
    })
  }
  render(){
    return (
      <div className="App">
        <header>
          Hacker News
        </header>
        {this.state.rows.length > 0 && <Pagination totalData={this.state.rows} render={data=>
            <Home rows={data}/>
        }/>}
      </div>
    );
  }
}

export default App;
