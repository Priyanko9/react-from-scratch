import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const Dashboard=(props)=>{
    return (
        <div className="component">
            <div className="dashboard"> 
                <div>
                    <label>Name:</label>
                    <span>{props.user.name}</span>
                </div>
                <div>
                    <label>Email:</label>
                    <span>{props.user.email}</span>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps=(state)=>{
    return {
      user:state.authentication.user
    }
  }
  
export default withRouter(connect(mapStateToProps)(Dashboard));