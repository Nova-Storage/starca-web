import './ListingRequests.css'
import React from 'react';
import requestData from './requests-data.json';
import ItemRequest from './ItemRequest.js';
import Grid from '@mui/material/Unstable_Grid2';
import PropTypes from 'prop-types';

function ListingRequests(props) {
    const requests = requestData.requests;

    //TODO: need to pass request ID in order to make the API call and change the status for that one

  return (
    <div className='listing-requests-container'>
        <Grid container rowSpacing={0} columnSpacing={1}>
            {requests.map(request => {
            return(
                <Grid xs={props.listingRequestsColumnValue}>
                    <ItemRequest 
                        requestTitle={ request.requestTitle }
                        requestMessage={ request.requestMessage }
                        requestStatus={ request.requestStatus }
                        requestImage={ request.requestImage } />
                </Grid>
                );
            })}
        </Grid>
    </div>
  )
}

ListingRequests.propTypes = {
    listingRequestsColumnValue: PropTypes.number
}

ListingRequests.defaultProps = {
    listingRequestsColumnValue: 12
  };

export default ListingRequests;