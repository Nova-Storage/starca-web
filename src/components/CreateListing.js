import React from 'react';
import './CreateListing.css';
import Grid from '@mui/material/Unstable_Grid2';
import { StyledButton, StyledNegativeButton, LoginTextField, StyledTextField } from './StyledMuiComponents.js';

function CreateListing() {
  return (
    <div className='create-listing-container'>
        <h1 className='create-listing-title'>Create Listing</h1>
        <div className='create-listing-form'>
        <Grid container spacing={2}>
            <Grid xs={8}>
            <LoginTextField id="title" label="Title" variant="outlined"/>
            </Grid>
            <Grid xs={4}>
            <StyledTextField id="street" label="Street Address" variant="outlined"/>
            </Grid>
            <Grid xs={8}>
            <StyledTextField id="description" label="Description" variant="outlined"/>
            </Grid>
            <Grid xs={4}>
            <StyledTextField id="city" label="City" variant="outlined"/>
            </Grid>
            <Grid xs={6}>
            <StyledTextField id="length" label="Length" variant="outlined"/>
            </Grid>
            <Grid xs={6}>
            <StyledTextField id="state" label="State" variant="outlined"/>
            </Grid>
            <Grid xs={6}>
            <StyledTextField id="height" label="Height" variant="outlined"/>
            </Grid>
            <Grid xs={6}>
            <StyledTextField id="zipcode" label="Zip Code" variant="outlined"/>
            </Grid>
            <Grid xs={6}>
            <StyledTextField id="width" label="Width" variant="outlined"/>
            </Grid>
            <Grid xs={6}>
            <StyledTextField id="height" label="Height" variant="outlined"/>
            </Grid>
        </Grid>
        </div>
        <div className='create-listing-buttons'>
            <StyledNegativeButton type="submit" variant="contained">Cancel</StyledNegativeButton>
            <StyledButton type="submit" variant="contained">Submit</StyledButton>
        </div>
    </div>
  )
}

export default CreateListing