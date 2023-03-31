import './Listings.css';
import ListingsData from './data-30.json';
import ItemListing from './ItemListing.js';
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';


function Listings(props) {

    //TODO: this will be replaced by state variable once I can call data from DB
    const listings = ListingsData.listings;
    const navigate = useNavigate();
  
    const handleListingSelection = event => {
        console.log("Made it into handleListingSelection function")
        navigate('/detail', {});
        event.preventDefault();
    }
    
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
                            listingZip: listing.listingZip
                        } });
                        
                    }}>
                        <ItemListing 
                            listingTitle={ listing.listingTitle }
                            listingDescription={ listing.listingDescription }
                            listingPrice={ listing.listingPrice }
                            listingAddress={ listing.listingAddress }
                            listingCity={ listing.listingCity }
                            listingState={ listing.listingState } 
                            listingZip={ listing.listingZip }/>
                    </Grid>
                    );
                })}
            </Grid>
        </div>
        );
        
        
    /*
    return (
        <div id="page_body">
            <table id="listing" data-testid="listing">
                <thead>
                    <tr className="header-row">
                        <td><p>Symbol</p></td>
                        <td><p>Company</p></td>
                        <td><p>High</p></td>
                        <td><p>Low</p></td>
                        <td><p>Price</p></td>
                    </tr>
                </thead>
                <tbody>
                    {listings.map((stock) => {
                        return (
                            <tr id={stock.Symbol} className="border_bottom">
                                {headers.map((header) => (
                                    <td onClick={() => onRowClick(stock.Symbol)}>{stock[header]}</td>
                                ))}
                                <Like
                                    symbol={stock.Symbol}
                                    email={props.email}
                                    likedStocks={props.likedStocks}
                                    setLikedStocks={props.setLikedStocks} 
                                    totalLikes={stock.Likes} />
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )*/
}
    

export default Listings;