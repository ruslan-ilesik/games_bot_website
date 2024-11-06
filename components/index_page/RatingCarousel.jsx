'use client';
import React, { useEffect, useState } from 'react';
import 'aos/dist/aos.css';
import axios from 'axios';

const RatingCarousel = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [nextId, setNextId] = useState(0); // Track next_id for cyclic loading

  // Fetch reviews from the API
  const fetchReviews = async (startId = 0) => {
    try {
      const response = await axios.get(`/api/get-reviews?start_id=${startId}`);
      const fetchedReviews = response.data.data;
      setNextId(response.data.next_id); // Store next_id for future requests
      setReviews(fetchedReviews);
      setCurrentIndex(0); // Reset the index to start the new set of reviews
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews(); // Initial fetch
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setFade(true); // Start fade out
      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % reviews.length;
        setCurrentIndex(nextIndex);

        // Load new reviews if we've reached the end of the current set
        if (nextIndex === 0) {
          fetchReviews(nextId);
        }
        
        setFade(false); // Start fade in
      }, 500); // Adjust duration to match CSS transition
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [currentIndex, reviews, nextId]);

  return (
    <div className="mx-auto px-4 pt-5">
      <div className="info-section mb-10 w-full">
        <h1 className="text-6xl mb-4 text-center headers-font" data-aos="zoom-out-up" data-aos-duration="1500">
          Your Ultimate Discord Entertainment Solution!
        </h1>
        <div className="flex flex-col md:flex-row items-start w-full justify-center">
          <div className="md:w-1/2 w-full flex justify-center items-center">
            <div data-aos="fade-up-right" data-aos-duration="1500" className="relative darker-block reviews-container">
              {reviews.length > 0 && (
                <div className={`carousel-item ${fade ? 'fade-out' : 'fade-in'}`} style={{ transition: 'opacity 0.5s ease-in-out' }}>
                  <div className="info-section-content text-center">
                    <div className="center">
                      <img className="review-icon" src={reviews[currentIndex].icon_path} alt={reviews[currentIndex].username} />
                    </div>
                    <div className="col-8">
                      <p className="font-bold">{reviews[currentIndex].username}</p>
                      <div className="align-items-center">
                        <div className="small-ratings">
                          {Array.from({ length: Number(reviews[currentIndex].rating) }).map((_, i) => (
                            <i key={i} className="fa fa-star rating-color"></i>
                          ))}
                        </div>
                      </div>
                      <p>{reviews[currentIndex].review}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div data-aos="fade-up-left" data-aos-duration="1500" className="darker-block info-section-content md:w-1/2 w-full flex justify-center items-center ml-4">
            <span className="text-center text-xl">
              Elevate your Discord server with <span className="font-semibold text-highlight">Games Bot</span>! Explore free games, unlock achievements, and enjoy seamless multiplayer experiences. Whether solo or with friends, it brings joy, laughter, and excitement. Make the <span className="font-semibold text-highlight">best decision</span> for endless fun – <span className="font-semibold text-highlight">invite today</span>!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingCarousel;
