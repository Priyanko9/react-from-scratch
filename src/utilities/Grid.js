import React from 'react';
import {useState,useEffect,useRef,useCallback} from 'react';
import {Checkbox} from './Checkbox.js';


export const Grid=(props)=>{
    let {data,gridColumns,gridOptions}=props;
    let [rows,setRows]=useState(data);
    let {buttonColumn,buttonHandler,checkbox}=gridOptions;
    let timeout=useRef();
    let gridColumnsRef=useRef(gridColumns);
    let dataRef=useRef(rows);
    let inputSearchRef=useRef();
    
    useEffect(()=>{
        dataRef.current=data;
        setRows(data);
    },[data])
   
    const handleClick=useCallback((event,row,column,index)=>{
        event.preventDefault();
        gridColumnsRef.current[index].clickHandler(event,row,column)
    })

    const deleteRows=useCallback(()=>{
        let checkbox=document.querySelectorAll("input[name='datacheckbox']");
        let filteredRows;
        if(checkbox){
            filteredRows=rows.filter((element,index)=>{
                if(checkbox[index].checked){
                    return false;
                }
                return true
            })
        }
        setRows(filteredRows);
    })
    const search=useCallback((event,header)=>{
        let {value}=event.target;
        if(timeout.current){
            clearTimeout(timeout.current);
        }
        timeout.current=setTimeout(()=>{
            let filteredRows;
            filteredRows=dataRef.current.filter(row=>{
                return row[header.name].includes(value)
            })
            if(filteredRows.length > 0){
                setRows(filteredRows)
            } 
        },500);
    })
   
    const selectOrDeselectAllRows=useCallback((event)=>{
        let allChecked=event.target.checked;
        let checkboxes=document.querySelectorAll("input[name='datacheckbox']")
        checkboxes && checkboxes.forEach(ele=>{
            ele.checked=allChecked;
        })
    });
    
    
    return (
        <div className="grid">
            <table>
                <thead>
                    <tr>
                    {gridColumns && gridColumns.map((header)=>{
                        if(header.type==="checkbox"){
                            return <th key={header.name} onClick={(event)=>selectOrDeselectAllRows(event)}>
                                 <Checkbox config={{name:"header"}}/></th>
                        } else {
                            if(header.tooltip){
                                return <th key={header.name}> {header.name} <br/> {header.search &&
                                   <input type="text" ref={inputSearchRef} onInput={(event)=>search(event,header)}/>}</th>
                            } else {
                                return <th key={header.name}> {header.name} <br/> {header.search &&
                                   <input type="text" ref={inputSearchRef} onInput={(event)=>search(event,header)}/>}</th>
                            }
                            
                        }
                    })}
                    </tr>
                </thead>
                <tbody>
                    {rows && rows.map((row,rowindex)=>{
                        let columns=Object.keys(row);
                        return (<tr key={rowindex} > 
                               
                                {gridColumns && gridColumns.map((column,index)=>{
                                    if(column.clickHandler){
                                        return (<td style={{width:column.width}} key={index} className={column.style} 
                                        onClick={(event)=>handleClick(event,row,column,index)}
                                        onMouseEnter={({target})=>column.tooltip.mouseEnter(target)}
                                        onMouseLeave={({target})=>column.tooltip.mouseLeave(target)}>
                                        {row[column.name]||column.default} 
                                        </td>)
                                    } else if(index===0 && checkbox){
                                        return <td key={rowindex+"check"} style={{width:column.width}}>  <Checkbox config={{name:"datacheckbox"}}/> </td>
                                    } else {
                                        return <td key={index} style={{width:column.width}}> {row[column.name]} </td>
                                    }
                                })
                            }
                            {buttonColumn && <td onClick={(event)=>buttonHandler(event,columns.length+1,row)} key={rowindex+"modal"}> openModal </td>}
                    </tr>
                    )})
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td>{checkbox && <button type="button" className="deleteBtn" onClick={()=>deleteRows()}>Delete</button>}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )

}