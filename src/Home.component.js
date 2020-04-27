import React,{Component} from 'react';

export class Home extends Component{

   state={
       rows:[]
   } 
   static getDerivedStateFromProps(props, state){
    return {rows:props.rows}
   }
   updateStateAndSave(newRecords){
    localStorage.setItem("newsData",JSON.stringify(newRecords));
    this.setState(prevState=>{
        rows:newRecords
    })
   }
   upvote=(record,index)=>{
    let newRecords=this.state.rows.map((r,i)=>{
        if(i===index){
            r.points=record.points+1;
        }
        return r
    })
    this.updateStateAndSave(newRecords);
   }
   hide=(record,index)=>{
       console.log("hide");
    let newRecords=this.state.rows.filter((r,i)=>{
        if(i===index){
            r.hide=!record.hide;
            return false
        }
        return true
    })
    this.setState(prevState=>{
        rows:newRecords
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
    return (
            <div className="newsfeedrow" >
                <div className="upperRow">
                    <span>{props.index + 1}.</span>
                    <span className="upvotePointer" onClick={(e)=>props.upvote(props.row,props.index)}></span>
                    <span className="title">{props.row.title}</span>
                </div>
                <div className="bottomRow">
                    <span>{props.row.points}</span>
                    <span>{props.row.author}</span>
                    <span>{props.row.duration}</span>
                    <span onClick={(e)=>props.hide(props.row,props.index)}>hide</span>
                </div>
            </div>
    )
}