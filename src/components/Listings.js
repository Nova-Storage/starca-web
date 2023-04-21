import './Listings.css';
import { useEffect, useState } from 'react';
import ListingsData from './data-30.json';
import ItemListing from './ItemListing.js';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';


function Listings(props) {

    const navigate = useNavigate();
    
    //TODO: Ellipsize the title
    
    return (
        <div className="listings">
            <Grid container rowSpacing={2} columnSpacing={1}>
                {props.listings.map(listing => {
                return(
                    <Grid xs={4} onClick={ () => { 
                        navigate('/detail', { state: {
                            listingID: listing.lid,
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
                })}
            </Grid>
        </div>
        );
}
    

export default Listings;
