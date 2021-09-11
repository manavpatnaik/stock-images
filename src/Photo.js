import React from "react";
import "./Photo.css";
import { FaHeart } from "react-icons/fa";

const Photo = ({ urls: { regular }, user, alt_description, likes }) => {
  const {
    portfolio_url,
    name,
    profile_image: { medium },
  } = user;
  return (
    <article className="photo-container">
      <img src={regular} alt={alt_description} className="photo" />
      <div className="photo-info">
        <div>
          <h4>{name}</h4>
          <p>
            <span>
              <FaHeart />
            </span>
            {likes} likes
          </p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} alt={name} />
        </a>
      </div>
    </article>
  );
};

export default Photo;
