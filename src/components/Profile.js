import React, { useState, useEffect, useMemo } from "react";
import "./Profile.css";
import image1 from './image1.jpeg';
import image2 from './image2.jpeg';
import image3 from './image3.jpeg';
import profilepic from './profile.jpeg'
import image4 from './image4.jpeg'

const Profile = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("Christian");
  const [bio, setBio] = useState("my bio here.");
  const [rating] = useState(4); // added rating state
  const [showListings, setShowListings] = useState(false);

  const images = useMemo(() => [image1, image2, image3], []);

  //TODO: Update data so that it gets the value the user has entered
  const updateProfile = event => {
    fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/update-profile`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ufname: 'Chris',
        ulname: 'Test',
        uphnum: '9084770413',
        ubio: 'I have a bio now',
        ustreet: '123 Street',
        ucity: 'Cranford',
        ustate: 'NJ',
        uzip: '07016'
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("PROFILE: ", json);
        /*
        // If status 200, let them know listing created
        if (json === ""){
          
        }
        else {
          //TODO: Warn user form not submitted
        }*/
      })
      .catch(error => console.log(error))

      event.preventDefault();
  }

  useEffect (() => {
    fetch(`${process.env.REACT_APP_BASE_SERVER_URL}/get-profile`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(json => {
        console.log("PROFILE: ", json);
        /*
        // If got profile, set fields. Otherwise warn user
        if (json === ""){
          
        }
        else {
          //TODO: Warn user form not submitted
        }*/
      })
      .catch(error => console.log(error))
    }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currentImage) => (currentImage + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const handleBioChange = (event) => {
    setBio(event.target.value);
  }

  const handleSaveChanges = () => {
    setShowPopup(false);
  }
  const handleBackHome = () => {
    setShowListings(false)
  }
  const dotIndicators = images.map((image, index) => (
    <span
      key={index}
      className={`dot ${index === currentImage ? "active" : ""}`}
      onClick={() => setCurrentImage(index)}
    />
  ));

  // Added function to render star ratings
  const renderStarRatings = () => {
    const fullStars = Array.from(Array(rating), (_, i) => (
      <span key={i} className="star full">&#9733;</span>
    ));
    const emptyStars = Array.from(Array(5 - rating), (_, i) => (
      <span key={i} className="star empty">&#9734;</span>
    ));
    return [...fullStars, ...emptyStars];
  }
  const toggleListings = () => {
    setShowListings(!showListings);
  }
  const listings = [
    {
      image: image1,
      address: 'Newark ,NJ',
      price: '$200',
    },
    {
      image: image2,
      address: 'Linden, NJ',
      price: '$300',
    },
    {
      image: image3,
      address: 'Elizabeth ,NJ',
      price: '$100',
    },
  ];
  const ListingsTab = ({ listings }) => (
    <div className="listings-tab">
      {listings.map((listing, index) => (
        <div key={index} className="listing">
          <img src={listing.image} alt={listing.address} />
          <div className="listing-info">
            <p className="price">{listing.price}</p>
            <p className="address">{listing.address}</p>
            <button className="request-button">Request</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>

      {showListings ? (
        <div>
          <h2 style={
            {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>My Listings <button style={
              {
                marginLeft: "200px",
                background: "green"
              }} onClick={handleBackHome}>Home</button></h2>
          <ListingsTab listings={listings} />
          <div>
            <h2>Current Rentals</h2>
            <div >
          <img src={image4} alt={''} />
          <div className="listing-info">
            <p className="price">{"$100"}</p>
            <p className="address">{"Newark ,NJ"}</p>
            <button className="end-rental-button">End rental</button>
          </div>
        </div>
          </div>
        </div>

      ) : (
        <div className="grid-container">

          <div className="personal">
            <div className="profile-picture">
              <img src={profilepic} alt="Profile" />
            </div>
            <div className="star-ratings">{renderStarRatings()}</div> {/* render star ratings */}
            <div className="profile-info">
              <h2>{name}</h2>
              <p>{bio}</p>
              <button className="edit-profile-button" onClick={() => setShowPopup(true)}>Edit Profile</button>
            </div>
          </div>

          {showPopup ? (

            <div className="slideshow">
              <h2>Edit Profile</h2>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" value={name} onChange={handleNameChange} />
              <label htmlFor="bio">Bio:</label>
              <textarea id="bio" value={bio} onChange={handleBioChange}></textarea>
              <button onClick={handleSaveChanges}>Save Changes</button>
            </div>

          ) : (
            <>
              <div className="slideshow">
                <img src={images[currentImage]} alt="Slideshow" />
                <div className="dot-indicators">{dotIndicators}</div>
                <button className="review-listing-button " onClick={toggleListings}>View Listings</button>
              </div>

              <div className="reviews">
                <h2>Tejkumar Patel</h2>
                <p> I was very impressed with the facility's cleanliness and security measures. </p>
                <h2>Jaimeen</h2>
                 <p> The unit itself was spacious and easily accessible, making it simple for me to move my belongings in and out.</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>

  );
}

export default Profile;