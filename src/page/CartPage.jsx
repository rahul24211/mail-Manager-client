import React, { useEffect, useState } from "react";
import {
  ArrowBarLeft,
  ArrowBarRight,
  CurrencyRupee,
  Dash,
  Plus,
  Trash,
} from "react-bootstrap-icons";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [cartDetails, setCartDetails] = useState([]);
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState([]);
  useEffect(() => {
    fetchCartDetails();
  }, []);

  const fetchCartDetails = async () => {
    try {
      const res = await axios.get(`${apiUrl}/getcartdetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartDetails(res.data.fetchCartDetails);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleDec = (cart_id) => {
    const updateCart = cartDetails.map((item) =>
      item.cart_id === cart_id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );
    setCartDetails(updateCart);
  };
  const handleInc = (cart_id) => {
    const updateCart = cartDetails.map((item) =>
      item.cart_id === cart_id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
    setCartDetails(updateCart);
  };

  const applyUpdateCart = async () => {
    try {
      const res = await axios.patch(
        `${apiUrl}/updatecart`,
        { cartDetails },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(res.data.message);
      fetchCartDetails();
    } catch (error) {
      console.error(error.message);
    }
  };

  const removeCart = async (cart_id) => {
    try {
      const res = await axios.delete(
        `${apiUrl}/deletecartproduct?cart_id=${cart_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(res.data.message);
      fetchCartDetails();
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  const handleitem = (cart_id) => {
    const filterData = cartDetails.find((item) => item.cart_id === cart_id);
    setFiltered(filterData);
  };

  console.log("filteredData", filtered);

  return (
    <div className="container mt-5">
      <div className="row gap-5  ">
        <div className="col-md-7 bg-light  border h-100">
          <h3>Cart-items</h3>
          <hr />
          {cartDetails != "" ? (
            cartDetails.map((item) => (
              <div
                key={item.cart_id}
                className="row mb-2 border rounded p-1 ms-1 me-1"
              >
                <div id="CartItem" className="col-2 me-5">
                  <img
                    style={{
                      objectFit: "cover",
                      height: "150px",
                      width: "150px",
                      backgroundColor: "gray",
                    }}
                    src={`${apiUrl}${item.Product.Image}`}
                    className="me-2 p-1"
                    onClick={() => handleitem(item.cart_id)}
                  />
                </div>
                <div className="col-9">
                  <div className="d-flex justify-content-between">
                    <h5 className="text-capitalize">{item.Product.PName}</h5>
                    <li
                      style={{ color: "red", cursor: "pointer" }}
                      className="list-unstyled"
                      onClick={() => removeCart(item.cart_id)}
                    >
                      {<Trash />}
                    </li>
                  </div>
                  <span className="d-flex text-capitalize">
                    {item.Product.Description.slice(0, 50)}
                  </span>
                  <span>{item.Product.language}</span>

                  <div className="d-flex justify-content-between">
                    <b className="fs-5">
                      <CurrencyRupee
                        style={{ marginBottom: "4px" }}
                        size={20}
                      />
                      {item.Product.Price}
                    </b>
                    <div className="d-flex gap-2">
                      <button
                        onClick={() => handleDec(item.cart_id)}
                        className="btn btn-danger btn-sm"
                      >
                        <Dash />
                      </button>
                      <span className="fw-bold fs-5">{item.quantity}</span>
                      <button
                        onClick={() => handleInc(item.cart_id)}
                        className="btn btn-success btn-sm"
                      >
                        <Plus />
                      </button>
                      <button
                        onClick={applyUpdateCart}
                        className="btn btn-dark"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="container d-flex justify-content-between mb-4">
              <h5>No-Cart-Items</h5>
              <button
                onClick={() => navigate("/foodcategory")}
                className="btn btn-primary"
              >
                <ArrowBarLeft /> Add to cart
              </button>
            </div>
          )}
        </div>
        <div className="col-md-4 bg-light  border h-100 pb-4">
          <h3 className="text-capitalize">order-summary</h3>
          <hr />
          <div className="d-flex justify-content-between">
            <span>Quantity</span>
            <span>{filtered.quantity || 0}</span>
          </div>
          <hr></hr>
          <div className="d-flex justify-content-between align-items-center">
            <span>Subtotal</span>
            <span className="d-flex align-items-center">
              <CurrencyRupee
                style={{ marginTop: "2px" }}
                className=""
                size={17}
              />
              {filtered.price * filtered.quantity || 0}
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Discount(-20%)</span>
            <span className="d-flex align-items-center text-danger">
              -
              <CurrencyRupee
                style={{ marginTop: "2px" }}
                className=""
                size={17}
              />
              58.80
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Delivery Fee</span>
            <span className="d-flex align-items-center">
              <CurrencyRupee
                style={{ marginTop: "2px" }}
                className=""
                size={17}
              />
              50.00
            </span>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <span>Total</span>
            <span className="d-flex align-items-center">
              <CurrencyRupee
                style={{ marginTop: "2px" }}
                className=""
                size={17}
              />
              200.00
            </span>
          </div>
          <div className="container d-flex justify-content-between py-3">
            <input
              style={{ width: "300px", borderRadius: "20px", border: "white" }}
              className="p-1 me-2"
              type="text"
              placeholder="Enter Promo Code"
            />
            <button
              style={{ borderRadius: "20px" }}
              className="btn btn-dark btn-sm "
            >
              Apply
            </button>
          </div>
          <div className="container">
            <button
              style={{ borderRadius: "20px" }}
              className="btn btn-dark form-control "
            >
              Go to Checkout <ArrowBarRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
