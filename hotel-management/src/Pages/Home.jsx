import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./Home.css";

const Home = () => {
  return (
    <main className="home">

      {/* Hero Section */}
      <section className="hero-section">
         <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000 }}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="hero-swiper"
      >
        <SwiperSlide>
          <img
            src="https://images.stockcake.com/public/c/b/6/cb6e70a5-312a-41cb-a5d6-2cbc180f9321_large/elegant-hotel-hallway-stockcake.jpg"
            alt="Slide 1"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://plus.unsplash.com/premium_photo-1661928260943-4aa36c5e1acc?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Slide 2"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://cdn.prod.website-files.com/67f7c428e7ab8a720e037552/683d76997d275fa571a04a07_pexels-pixabay-164595-p-2000.jpg"
            alt="Slide 3"
          />
        </SwiperSlide>
      </Swiper>

      {/* 3D Text Overlay */}
      <div className="hero-text">
          <h1 className="hero-title-3d">Welcome to Urbann</h1>
        </div>
      </section>

      {/* Rooms & Suites Section */}
      <section className="rooms-section">
        <h2 className="section-title">Rooms & Suites</h2>

        <div className="rooms-container">

          <div className="room-card">
            <img src="https://source.unsplash.com/600x400/?luxury-suite" alt="Executive Suite" />
            <div className="room-content">
              <h3>Executive Suite</h3>
              <p>Spacious suite with modern interiors and premium comfort.</p>
              <button>View Details</button>
            </div>
          </div>

          <div className="room-card">
            <img src="https://source.unsplash.com/600x400/?hotel-room-deluxe" alt="Premier Suite" />
            <div className="room-content">
              <h3>Premier Suite</h3>
              <p>Elegant room with stunning city views and luxury amenities.</p>
              <button>View Details</button>
            </div>
          </div>

          <div className="room-card">
            <img src="https://source.unsplash.com/600x400/?presidential-suite" alt="Presidential Suite" />
            <div className="room-content">
              <h3>Presidential Suite</h3>
              <p>Experience unmatched luxury with exclusive services.</p>
              <button>View Details</button>
            </div>
          </div>

            <div className="room-card">
              <img src="https://source.unsplash.com/600x400/?hotel-room-city-view" alt="Deluxe City View" />
              <div className="room-content">
                <h3>Deluxe City View</h3>
                <p>Comfortable stay with panoramic views of the city skyline.</p>
                <button>View Details</button>
              </div>
            </div>

        </div>
      </section>


      {/* Dining & Services */}
      <section className="services-section">
        <h2>Dining & Experiences</h2>
        <div className="services-grid">
          {["Amara", "Kanak", "Ninety Six", "Tuscany", "Spa & Wellness", "Meetings & Events"].map((service) => (
            <div className="service-card" key={service}>
              <h4>{service}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="gallery-section">
        <h2>Gallery</h2>
        <div className="gallery-grid">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div className="gallery-img" key={idx}>
              <img 
                src={`https://source.unsplash.com/400x300/?hotel,room,spa,restaurant,hyderabad,hotel${idx}`} 
                alt="Hotel Gallery"
              />
            </div>
          ))}
        </div>
      </section>


    </main>
  );
};

export default Home;
