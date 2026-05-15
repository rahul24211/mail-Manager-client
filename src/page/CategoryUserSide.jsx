import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryUserSide = () => {
  const [details, setDetails] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async (value) => {
    try {
      const res = await axios.get(`${apiUrl}/getcategories?search=${value}`);
      setDetails(res.data.FCategories);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchCategories(search);
    }, 400);
    return () => clearTimeout(delay);
  }, [search]);

  const handleNavigate = (id, CName) => {
    navigate(`/foods/${id}/${CName}`);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5">
          <h2>
            <u>Books-Categories</u>
          </h2>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-1"
            style={{ borderRadius: "20px", width: "250px" }}
            type="text"
            placeholder="Search Categories"
          />
        </div>
        {details &&
          details.map((category) => (
            <div
              
              key={category.id}
              className="col-md-3"
            >
              <div
                style={{ cursor: "pointer" }}
                className="border rounded p-2 mt-5"
              >
                <img
                id="productImg"
                  style={{
                    height: "200px",
                    objectFit: "cover",    
                  }}
                  src={`${apiUrl}${category.CImage}`}
                  className="img-fluid rounded mb-2"
                  onClick={() => handleNavigate(category.id, category.CName)}
                />
                <h5 className="text-capitalize"> {category.CName}</h5>
                <small className="text-capitalize">
                  {category.CDes.slice(0, 40)}...
                </small>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryUserSide;
