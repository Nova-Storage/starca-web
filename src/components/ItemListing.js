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
        // StorageUnitOutline
    return (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={ props.listingImages ? props.listingImages[0] :  StorageUnitOutline }
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
}
    

export default ItemListing;