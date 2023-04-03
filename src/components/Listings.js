import './Listings.css';
import ListingsData from './data-30.json';
import ItemListing from './ItemListing.js';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';


function Listings(props) {

    //TODO: this will be replaced by state variable once I can call data from DB
    const listings = ListingsData.listings;
    const navigate = useNavigate();
    
    //TODO: Ellipsize the title
    
    return (
        <div className="listings">
            <Grid container rowSpacing={2} columnSpacing={1}>
                {listings.map(listing => {
                return(
                    <Grid xs={4} onClick={ () => { 
                        navigate('/detail', { state: {
                            listingTitle: listing.listingTitle,
                            listingDescription: listing.listingDescription,
                            listingPrice: listing.listingPrice,
                            listingAddress: listing.listingAddres,
                            listingCity: listing.listingCity,
                            listingState: listing.listingState,
                            listingZip: listing.listingZip,
                            listingAmenities: listing.amenities
                        } });
                        
                    }}>
                        <ItemListing 
                            listingTitle={ listing.listingTitle }
                            listingDescription={ listing.listingDescription }
                            listingPrice={ listing.listingPrice }
                            listingAddress={ listing.listingAddress }
                            listingCity={ listing.listingCity }
                            listingState={ listing.listingState } 
                            listingZip={ listing.listingZip }
                            listingAmenities= {listing.amenities }/>
                    </Grid>
                    );
                })}
            </Grid>
        </div>
        );
}
    

export default Listings;