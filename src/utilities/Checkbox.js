import React from 'react';

export const Checkbox=(props)=>{
    let {config}=props;
    if(config)
        return (<input type="checkbox" {...config} />)
    else 
        return (<input type="checkbox" />)    
}