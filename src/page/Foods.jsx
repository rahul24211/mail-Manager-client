import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Foods = () => {
  const [details, setDetails] = useState([]);
  const [search, setSearch] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const { id, CName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async (value) => {
    try {
      const res = await axios.get(
        `${apiUrl}/getproductbyc?id=${id}&search=${value}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setDetails(res.data.fetchProduct || []);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchFoods(search);
    }, 400);
    return () => clearTimeout(delay);
  }, [search]);

  const addToCart = async (id) => {
    try {
      const payload = {
        productId: id,
        quantity: 1,
      };
      const res = await axios.post(`${apiUrl}/addtocart`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/cartpage");
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.error(error.message);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mb-3 mt-5">
          <u
            style={{
              fontSize: "30px",
              fontWeight: "bolder",
              fontFamily: "fantacy",
            }}
            className="text-capitalize"
          >
            {CName}
          </u>
          <input
            style={{ borderRadius: "20px", width: "260px" }}
            className="p-1"
            type="text"
            placeholder="Search Books.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {details != "" ? (
          details.map((food) => (
            <div key={food.id} className="col-md-3 mt">
              <div
                style={{ cursor: "pointer", width: "310px", height: "500px" }}
                className="border rounded p-2 mb-4"
              >
                <img
                  id="productImg"
                  className="img-fluid rounded mb-2"
                  style={{
                    objectFit: "cover",
                    height: "300px",
                    width: "400px",
                  }}
                  src={`${apiUrl}${food.Image}`}
                />
                <h5 style={{ height: "40px" }} className="text-capitalize">
                  {food.PName}
                </h5>
                <small className="text-capitalize d-flex">
                  {food.Description.slice(0, 40)}...
                </small>
                <div className="d-flex justify-content-between">
                  <span>
                    Stock : <b>{food.Stock}</b>
                  </span>
                  <span>
                    Language : <b>{food.language}</b>
                  </span>
                </div>
                <b className="text-capitalize d-flex">price : {food.Price}</b>
                <button
                  onClick={() => addToCart(food.id)}
                  className="btn btn-primary form-control mt-1"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="container">
            <div className="d-flex justify-content-center align-items-center">
              <h5>No Books</h5>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Foods;
