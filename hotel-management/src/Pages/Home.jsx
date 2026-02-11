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


      {/* About / Intro */}
      <section className="intro-section">
        <div className="intro-text">
          <h2>About Urbann, Hyderabad</h2>
          <p>
            Located in the centre of FINANCIAL District and close to the Special Economic Zone, 
            our 5-star hotel offers premium rooms, exceptional dining and wellness experiences.
          </p>
        </div>
      </section>

      {/* Rooms & Suites */}
      <section className="rooms-section">
        <h2>Rooms & Suites</h2>
        <div className="cards-container">
          {["Executive Suites", "Premier Suites", "Trident Club Suites", 
            "Presidential Suite", "Deluxe City View", "Deluxe Park View"].map((room) => (
            <div className="card" key={room}>
              <h3>{room}</h3>
              <button className="btn-secondary">View Details</button>
            </div>
          ))}
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
