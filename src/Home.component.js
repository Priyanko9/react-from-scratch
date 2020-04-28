import React,{Component} from 'react';
import ErrorBoundary from './ErrorBoundary';
import {context} from './App';

export class Home extends Component{

    constructor(props){
        super(props);
        this.state={
            rows:[],
            doNotSetStateFromProps:false
        }
    }
   static getDerivedStateFromProps(props, state){
       if(!state.doNotSetStateFromProps){
        return {
            rows:props.rows
        }
       } else {
        state.doNotSetStateFromProps=false;
        return state;
       }
   }
   updateStateAndSave(newRecords,storageData){
    localStorage.setItem("newsData",JSON.stringify(storageData));
    this.setState(prevState=>{
        return {
            rows:newRecords,
            doNotSetStateFromProps:true
        }
    })
   }
   upvote=(record,index)=>{
    let localRecord={...record}; 
    let newRecords=this.mapData(localRecord,index,this.state.rows,0);
    let data=JSON.parse(localStorage.getItem("newsData"));
    let storageData=this.mapData(localRecord,index,data,data.length-this.state.rows.length);
    this.updateStateAndSave(newRecords,storageData);
   }
   hide=(record,index)=>{
    let localRecord={...record};   
    let newRecords=this.filterData(localRecord,index,this.state.rows,0);
    let data=JSON.parse(localStorage.getItem("newsData"));
    let storageData=this.filterData(localRecord,index,data,data.length-this.state.rows.length);
    this.updateStateAndSave(newRecords,storageData);
   }
   mapData(record,index,rows,offset){
    return rows.map((r,i)=>{
            // if(i===(index+offset)){
            //     r.points=record.points+1;
            // }
            if(r.objectID===record.objectID){
                    r.points=record.points+1;
                }
            return r
        })
   }
   filterData(record,index,rows,offset){
    return rows.filter((r,i)=>{
                // if(i===(index+offset)){
                //     r.hide=!record.hide;
                //     return false
                // }
                if(r.objectID===record.objectID){
                        r.hide=!record.hide;
                        return false
                    }
                return true
            })
   }
    render(){
        let rows=this.state.rows;
        
        return(
            <div className="home">
                {
                    rows.map((r,index) => <HomeTemplate 
                    row={r} 
                    index={index} 
                    key={index}
                    upvote={this.upvote}
                    hide={this.hide}
                    />)
                }
            </div>
        )
    }
}

const HomeTemplate=(props)=>{
    let currentPage=localStorage.getItem("currentPage");
    let hitsPerPage=localStorage.getItem("hitsPerPage");
    return (
            
        <div className="newsfeedrow" >
            <div className="upperRow">
                <span>{(hitsPerPage*currentPage) + props.index + 1}.</span>
                <span className="upvotePointer" onClick={(e)=>props.upvote(props.row,props.index)}></span>
                <span className="title">{props.row.title}</span>
            </div>
            <div className="bottomRow">
                <span>points:{props.row.points}</span>
                <span>by: {props.row.author}</span>
                <span>{props.row.duration}</span>
                <span onClick={(e)=>props.hide(props.row,props.index)}>hide</span>
            </div>
        </div>
    )
}

export default function HomeErrorBoundary(props) {
    return (
      <ErrorBoundary>
        <Home {...props} />
      </ErrorBoundary>
    );
  }

