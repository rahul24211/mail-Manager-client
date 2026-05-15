import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BannerUserSide = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const [banners, setBanners] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchBanner = async () => {
      const res = await axios.get(`${apiUrl}/getbanners`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBanners(res.data.banners || []);
    };

    fetchBanner();
  }, []);

  // 🔥 Auto Slide
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [banners]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  return (
    <div className="container my-5">
      <h4 className="text-center mb-4 fw-bold text-decoration-underline">
        🚀 Important Messages
      </h4>

      <div className="position-relative overflow-hidden rounded-4 shadow-lg">

        <AnimatePresence mode="wait">
          {banners.length > 0 && (
            <motion.img
              key={banners[index]._id}
              src={`${apiUrl}${banners[index].imageUrl}`}
              className="img-fluid w-100"
              style={{ height: "300px", objectFit: "cover" }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
            />
          )}
        </AnimatePresence>

        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="btn btn-dark position-absolute top-50 start-0 translate-middle-y"
        >
          ‹
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="btn btn-dark position-absolute top-50 end-0 translate-middle-y"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default BannerUserSide;