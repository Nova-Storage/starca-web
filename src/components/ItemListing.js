import './ItemListing.css';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import StorageUnitOutline from '../images/StorageUnitOutline.jpg';

//TODO: add the rest of the important data
//TODO: See how I can organize the data within a grid-item (also see how to dynamically size grid depending on window size)
//TODO: load dummy image temporarily


function ItemListing(props) {
        
    return (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={ StorageUnitOutline }
              alt="storage unit outline"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                { props.listingTitle }
              </Typography>
              <Typography variant="body2">
                <b>{ props.listingPrice }</b>/month
              </Typography>
              <Typography variant="body2" color="text.secondary">
                { props.listingCity }, { props.listingState } { props.listingZip }
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
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
    

export default ItemListing;