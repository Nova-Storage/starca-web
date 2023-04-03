import React, { useState, useEffect, useMemo } from "react";
import "./Profile.css";
import image1 from './image1.jpeg';
import image2 from './image2.jpeg';
import image3 from './image3.jpeg';
import image4 from './image4.jpeg';
import profilepic from './profile.jpeg'

const Profile = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("Tej Patel");
  const [bio, setBio] = useState("my bio here.");
  const [rating] = useState(4); // added rating state

  const images = useMemo(() => [image1, image2, image3, image4], []);

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
    const emptyStars = Array.from(Array(4 - rating), (_, i) => (
      <span key={i} className="star empty">&#9734;</span>
    ));
    return [...fullStars, ...emptyStars];
  }

  return (
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
     
      <div className="slideshow">
        <img src={images[currentImage]} alt="Slideshow" />
        <div className="dot-indicators">{dotIndicators}</div>
      </div>

      <div className="reviews">
       
        <p>Christian - Rented Garage located in Newark</p>
        <p>"I rented the location located in Newark the owner was really nice and helpfull, I would definetly recommend this garage."</p>
        <p>Jaimeen - Rented garage located in Brooklyn</p>
        <p>"Horrible experience I went to the garage and there was no we to access it i called and emailed the owner but no one answered"</p>
        <p>Mohamad - Rented garage located in Jersey City</p>
        <p>"Nice place"</p>
   
      </div>

      {showPopup && 
        <div className="popup">
          <div className="popup-content">
            <h2>Edit Profile</h2>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={handleNameChange} />
            <label htmlFor="bio">Bio:</label>
            <textarea id="bio" value={bio} onChange={handleBioChange}></textarea>
            <button onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </div>
      }
    </div>
  );
};

export default Profile;
