import React from "react";
import "./Banner.scss";
import BannerImg from "../../assets/jobapp.jpg";
import { NavLink } from "react-router-dom";

const Banner = () => {




    
  return (
    <div className="hero-banner">
      {/* <Cart/> */}
      <div className="content">
        <div className="text-content">
          <div className="ctas">
            {/* <div className="banner-cta">Read More</div> */}
            <NavLink to="/login" className="banner-cta">
              Login
            </NavLink>
            
            <NavLink to="/home" className="banner-cta">
              Try without login
            </NavLink>
          </div>
        </div>
        <img className="banner-img" alt="" src={BannerImg} />
      </div>
    </div>
  );
};

export default Banner;
