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
            <img src="https://www.theleela.com/prod/content/assets/aio-banner/dekstop/Executive%20Suite_1920x950.jpg?VersionId=CkEGIREQnGlTkUMykEpMFBlqxW0dKL0J" alt="Executive Suite" />
            <div className="room-content">
              <h3>Executive Suite</h3>
              <p>Spacious suite with modern interiors and premium comfort.</p>
              <button>View Details</button>
            </div>
          </div>

          <div className="room-card">
            <img src="https://cdn.prod.website-files.com/6624ff6a5db57a668993dd5e/66a9acbbbe1d78a5ba43d448_IMG_0053%202.webp" alt="Premier Suite" />
            <div className="room-content">
              <h3>Premier Suite</h3>
              <p>Elegant room with stunning city views and luxury amenities.</p>
              <button>View Details</button>
            </div>
          </div>

          <div className="room-card">
            <img src="https://edenresort.com/assets/images/_1122x1103_fit_center_90_none/LgHead-2-Bedroom-Suite.jpg" alt="Presidential Suite" />
            <div className="room-content">
              <h3>Presidential Suite</h3>
              <p>Experience unmatched luxury with exclusive services.</p>
              <button>View Details</button>
            </div>
          </div>

            <div className="room-card">
              <img src="https://ideaskl.com/wp-content/uploads/2023/05/Premier-Suite-1-1024x683.jpg" alt="Deluxe City View" />
              <div className="room-content">
                <h3>Deluxe City View</h3>
                <p>Comfortable stay with panoramic views of the city skyline.</p>
                <button>View Details</button>
              </div>
            </div>

        </div>
      </section>

      {/* Dining & Services Section */}
      <section className="services-section">
        <h2 className="section-title">Dining & Services</h2>

        <div className="services-container">

          <div className="service-card">
            <img src="https://www.bocadolobo.com/en/inspiration-and-ideas/wp-content/uploads/2023/09/50-Luxury-Dining-Rooms-A-Feast-For-The-Senses.jpg" alt="Fine Dining" />
            <div className="service-content">
              <h3>Fine Dining</h3>
              <p>Enjoy world-class cuisine prepared by top chefs.</p>
              <button>Explore</button>
            </div>
          </div>

          <div className="service-card">
            <img src="https://tattvaspa.com/wp-content/uploads/2021/02/1-1024x1017.webp" alt="Spa & Wellness" />
            <div className="service-content">
              <h3>Spa & Wellness</h3>
              <p>Relax and rejuvenate with our luxury therapies.</p>
              <button>Discover</button>
            </div>
          </div>

          <div className="service-card">
            <img src="https://i.pinimg.com/736x/16/61/96/166196fab4460609826b94b696cd4ada.jpg" alt="Luxury Bar" />
            <div className="service-content">
              <h3>Luxury Bar</h3>
              <p>Premium drinks in a sophisticated ambiance.</p>
              <button>Explore</button>
            </div>
          </div>

          <div className="service-card">
            <img src="https://civichotel.ca/wp-content/uploads/2018/08/meeting-slide3-1920x1179.jpg" alt="Events" />
            <div className="service-content">
              <h3>Meetings & Events</h3>
              <p>Host corporate meetings and celebrations in style.</p>
              <button>Book Now</button>
            </div>
          </div>

        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <h2 className="section-title">Our Gallery</h2>

        <div className="gallery-grid">
          <div className="gallery-item">
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/509170710.jpg?k=e597f74f8feb6e191cef5193a8cb93df14236de1a3f73353a44cdefd8f942bda&o=" alt="Hotel View" />
          </div>

          <div className="gallery-item">
            <img src="https://www.wedezinestudio.com/blogs/wp-content/uploads/2025/03/485147271_979900657588824_258722554589890817_n.webp" alt="Luxury Room" />
          </div>

          <div className="gallery-item">
            <img src="https://cdn.home-designing.com/wp-content/uploads/2023/02/dining-room-chandeliers.jpg" alt="Dining Area" />
          </div>

          <div className="gallery-item">
            <img src="https://designthoughts.org/wp-content/uploads/2021/09/Picture4.jpg" alt="Swimming Pool" />
          </div>

          <div className="gallery-item">
            <img src="https://hgtvhome.sndimg.com/content/dam/images/hgtv/fullset/2017/8/23/1/CI_Capella_Shanghai_Jian_Ye_Li-Lobby.jpg.rend.hgtvcom.791.594.85.suffix/1503534990218.webp" alt="Lobby" />
          </div>

          <div className="gallery-item">
            <img src="https://cdn.prod.website-files.com/66456ff69b6aadbdb065af90/684abcc090cb758365ac977e_spa-entertainment-facility-korus.webp" alt="Spa Area" />
          </div>
        </div>
      </section>


    </main>
  );
};

export default Home;
