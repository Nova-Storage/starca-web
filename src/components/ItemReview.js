import './ItemReview.css';
import { useState } from  'react';
import { StyledButton } from './StyledMuiComponents.js';
import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';
import UserData from './user.json';

function ItemReview(props) {
    
    const [rating, setRating] = useState(4);
    
    return (
        <Paper elevation={2} className='paper-container'>
          <div className="grid-review-columns">
            <div>
              <p>{ UserData.fname } { UserData.lname }</p>
              <p> Rental Length: { UserData.rentalLength } months</p>
            </div>
            <div className='rating'>
              <Rating
              name="read-only"
              value={ rating }
              readOnly
              />
              <p style={{'text-align': 'left'}}>{ UserData.date_created }</p>
              <p>{ UserData.ratingDescription }</p>
            </div>
          </div>
        </Paper>
    );
}

export default ItemReview;