import './Listings.css';
import { useEffect, useState } from 'react';
import ListingsData from './data-30.json';
import ItemListing from './ItemListing.js';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';


function Listings(props) {

    //TODO: this will be replaced by state variable once I can call data from DB
    //const listings = ListingsData.listings;
    const [listings, setListings] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetch('https://starcaserver.com/get-listings', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        })
        .then(res => res.json()) //Change from text to json
        .then(json => {
            console.log("FETCHED: " + json);
            setListings(json);
            /*
            // Get the user's information if authenticated successfully
            if (json === "You Logged in.!"){
            props.authenticated();
            sessionStorage.setItem("email", event.target.email.value);
            navigate('/');
            }
            else {
            //TODO: Make input fields red
            }*/
        })
        .catch(error => console.log(error));
        //TODO: Get user's info in a state varibale
        //.then((result) => setData(result.rows))
    }, [])
    
    //TODO: Ellipsize the title
    
    return (
        <div className="listings">
            <Grid container rowSpacing={2} columnSpacing={1}>
                {listings.slice(0,9).map(listing => {
                return(
                    <Grid xs={4} onClick={ () => { 
                        navigate('/detail', { state: {
                            listingTitle: listing.ltitle,
                            listingDescription: listing.ldescr,
                            listingPrice: listing.lprice,
                            listingAddress: listing.lstreet,
                            listingCity: listing.lcity,
                            listingState: listing.lstate,
                            listingZip: listing.lzip,
                            listingAmenities: ['Security Cameras, ', 'Biometrics, ', 'Wheelchair Accessible']
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