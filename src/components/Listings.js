import './Listings.css';
import { useEffect, useState } from 'react';
import ListingsData from './data-30.json';
import ItemListing from './ItemListing.js';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';


function Listings(props) {

    const navigate = useNavigate();
    
    //TODO: Ellipsize the title
    
    return (
        <div className="listings">
            <Grid container rowSpacing={2} columnSpacing={1}>
                {props.listings.message == undefined ? props.listings.map(listing => {
                return(
                    <Grid xs={props.listingColumnValue} onClick={ () => { 
                        navigate('/detail', { state: {
                            ownerID: listing.luserid,
                            listingID: listing.lid,
                            listingImages:  listing.imageUrls,
                            listingTitle: listing.ltitle,
                            listingDescription: listing.ldescr,
                            listingPrice: listing.lprice,
                            listingAddress: listing.lstreet,
                            listingCity: listing.lcity,
                            listingState: listing.lstate,
                            listingZip: listing.lzip,
                            listingAmenities: ['Security Cameras, ', 'Biometrics, ', 'Wheelchair Accessible'],
                        } });
                        
                    }}>
                        <ItemListing 
                            listingImages = { listing.imageUrls ? listing.imageUrls : false }
                            listingTitle={ listing.ltitle }
                            listingDescription={ listing.ldescr }
                            listingPrice={ listing.lprice }
                            listingAddress={ listing.lstreet }
                            listingCity={ listing.lcity }
                            listingState={ listing.lstate } 
                            listingZip={ listing.lzip }
                            listingAmenities= { ['Security Cameras, ', 'Biometrics, ', 'Wheelchair Accessible'] }/>
                    </Grid>
                    );
                }) : <p>No Listings Available</p>}
            </Grid>
        </div>
        );
}

Listings.propTypes = {
    listingColumnValue: PropTypes.number
}

Listings.defaultProps = {
    listingColumnValue: 4
  };
    
export default Listings;
