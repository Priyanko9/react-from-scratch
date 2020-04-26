import React,{useCallback} from 'react';
import ReactDOM from 'react-dom';

function TooltipContainer(props){
    let containerClass;
    let arrowClass;
    if(props.tooltipPosition==="top"){
        containerClass="tooltipContainer positionTop";
        arrowClass="tooltipArrow downArrow";
    } else if(props.tooltipPosition==="bottom"){
        containerClass="tooltipContainer positionBottom";
        arrowClass="tooltipArrow upArrow";
    } else if(props.tooltipPosition==="right"){
        containerClass="tooltipContainer positionRight";
        arrowClass="tooltipArrow leftArrow";
    } else if(props.tooltipPosition==="left"){
        containerClass="tooltipContainer positionLeft";
        arrowClass="tooltipArrow rightArrow";
    }
    return (
        <div className={containerClass}>
                {props.message}
                <div className={arrowClass}></div>
        </div>
    )
}
export const ToolTipfunc=()=>{
    
    let tooltipRef;
    const closeTooltip=useCallback(()=>{
        const tooltipHolder=document.getElementsByClassName("tooltip-holder")[0];
        tooltipHolder && tooltipHolder.remove();
    })
    
    const ToolTip=(props)=>{
        let tooltipHolder=document.createElement("div");
        tooltipHolder.setAttribute("class","tooltip-holder");
        tooltipRef=props.reference.current;
        tooltipRef.append(tooltipHolder);
        ReactDOM.render(<TooltipContainer {...props}/>,tooltipHolder);
        return <div/>
    }
    
    return [ToolTip,closeTooltip];
}