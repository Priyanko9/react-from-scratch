import React,{useCallback} from 'react';
import ReactDOM from 'react-dom';

function ModalElement(props){
    return (
        <div className="modalContainer">
            <div className="modalHeader">
                {props.title}
            </div>
            <div className="modalBody">
                {props.children}
            </div>
            <div className="modalFooter">
                {props.isOkButton && 
                    <button className="ok-button" onClick={props.ok}>ok</button>}
                {props.isCloseButton && 
                    <button className="close-button" onClick={props.close}>close</button>}    
            </div>

        </div>
    )
}
export const useModal=()=>{
    const closeModal=useCallback(()=>{
        const modalNode=document.getElementsByClassName("modal-holder")[0];
        const backdrop=document.getElementsByClassName("backdrop")[0];
        modalNode && modalNode.remove();
        backdrop && backdrop.remove();
    },[])
    const Modal=(props)=>{
        let modalHolder=document.createElement("div");
        let backdrop=document.createElement("div");
        modalHolder.setAttribute("class","modal-holder");
        backdrop.setAttribute("class","backdrop");
        document.body.append(backdrop);
        document.body.append(modalHolder);
        ReactDOM.render(<ModalElement {...props}/>,modalHolder);
        return <div/>
    }
    return [Modal,closeModal];
}