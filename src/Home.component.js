import React,{Component} from 'react';
import ErrorBoundary from './ErrorBoundary';


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
   upvote=(record)=>{
    let localRecord={...record}; 
    let newRecords=this.mapData(localRecord,this.state.rows);
    let data=JSON.parse(localStorage.getItem("newsData"));
    let storageData=this.mapData(localRecord,data);
    this.updateStateAndSave(newRecords,storageData);
   }
   hide=(record)=>{
    let localRecord={...record};   
    let newRecords=this.filterData(localRecord,this.state.rows);
    let data=JSON.parse(localStorage.getItem("newsData"));
    let storageData=this.filterData(localRecord,data);
    this.updateStateAndSave(newRecords,storageData);
   }
   mapData(record,rows){
    return rows && rows.map((r,i)=>{
            if(r.objectID===record.objectID){
                    r.points=record.points+1;
                }
            return r
        })
   }
   filterData(record,rows){
    return rows && rows.filter((r,i)=>{
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
            <div className="home" data-test="HomeComponent">
                {
                     rows && rows.map((r,index) => <HomeTemplate 
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

export const HomeTemplate=(props)=>{
    let currentPage=localStorage.getItem("currentPage");
    let hitsPerPage=localStorage.getItem("hitsPerPage");
    return (
            
        <div className="newsfeedrow" data-test="HomeTemplate">
            <div className="upperRow">
                <span>{(hitsPerPage*currentPage) + props.index + 1}.</span>
                <span className="upvotePointer links" data-test="upvote" onClick={(e)=>props.upvote(props.row)}></span>
                <span className="title">{props.row.title}</span>
            </div>
            <div className="bottomRow">
                <span>points:{props.row.points}</span>
                <span>by: {props.row.author}</span>
                <span>{props.row.duration}</span>
                <span data-test="hide" className="links" onClick={(e)=>props.hide(props.row)}>hide</span>
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

