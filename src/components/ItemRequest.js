import './ItemRequest.css';
import React from 'react';
import Paper from '@mui/material/Paper';
import logo from '../images/starca-logo-icon.png';
import { StyledNegativeButton, StyledButton } from './StyledMuiComponents';

function ItemRequest(props) {

    const messageTitle = 'I\'m interested in Super Shed'
    const messageContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem.'

    //TODO: populate item request with props
  return (
    <div className='item-request-container'>
        <Paper elevation={3}>
            <div className='item-request-grid'>
                <img id='request-image' src={logo} height='50px' width='50px'/>
                <h4 id='request-message-title'>{messageTitle}</h4>
                <p id='request-message' align="left">{messageContent}</p>
                <div className='request-cancel'>
                <StyledNegativeButton type="button" variant="contained" id="cancel" className='request-cancel'>Cancel</StyledNegativeButton>
                </div>
                <StyledButton type="submit" id="submit" variant="contained" className='request-submit'>Submit</StyledButton>
            </div>
        </Paper>
    </div>
  )
}

export default ItemRequest;