import axios from "axios";
import React, { useEffect, useState } from "react";
import { Trash } from "react-bootstrap-icons";
import { toast } from "sonner";

const Coupons = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    code: "",
    discount_type: "",
    discount_value: "",
    min_order_discount: "",
    expiry_date: "",
  });

  const [coupon, setCoupon] = useState([]);
  const onchange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/addcoupon`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getCoupons();
      toast.success(res.data.message);
      setForm({
        code: "",
        discount_type: "",
        discount_value: "",
        min_order_discount: "",
        expiry_date: "",
      });
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getCoupons();
  }, []);

  const getCoupons = async () => {
    try {
      const res = await axios.get(`${apiUrl}/getcoupon`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCoupon(res.data.findCoupons);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteCoupon = async (coupon_id) => {
    try {
      const res = await axios.patch(
        `${apiUrl}/deletecoupon?coupon_id=${coupon_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success(res.data.message);
      getCoupons();
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <h2 className="">
            <u>Add Coupons</u>
          </h2>
          <div className="col-md-6">
            <form onSubmit={handleCouponSubmit} className="p-5">
              <label>Coupon Code</label>
              <input
                name="code"
                value={form.code}
                onChange={onchange}
                className="form-control"
                type="text"
                required
              />
              <label>Discount Type</label>
              <select
                name="discount_type"
                value={form.discount_type}
                onChange={onchange}
                className="form-control"
                required
              >
                <option value="">Select Type</option>
                <option value="flat">flat</option>
                <option value="percentage">percentage</option>
              </select>
              <label>Discount Value</label>
              <input
                required
                name="discount_value"
                value={form.discount_value}
                onChange={onchange}
                className="form-control"
                type="number"
                min={0}
              />
              <label>Min Order Discount</label>
              <input
                required
                name="min_order_discount"
                value={form.min_order_discount}
                onChange={onchange}
                className="form-control"
                type="number"
                min={0}
              />
              <label>Expiry Date</label>
              <input
                required
                name="expiry_date"
                value={form.expiry_date}
                onChange={onchange}
                className="form-control"
                type="date"
              />

              <button className="btn btn-primary form-control mt-2">
                Add Coupon
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr />
      <div className="container">
        <div className="row justify-content-center">
          <h2 className="text-center">Availble Coupons</h2>
          <div className="col-md-12 p-5">
            <table className="w-100 h-100 border bg-light">
              <tr className="text-center text-capitalize border-bottom border-dark ">
                <th>code</th>
                <th>discount_type</th>
                <th>discount_value</th>
                <th>min_order_discount</th>
                <th>expiry_date</th>
              </tr>
              {coupon !== "" ? (
                coupon.map((item) => (
                  <>
                    <tr key={item.coupon_id} className="text-center border">
                      <td className="p-3">{item.code}</td>
                      <td>{item.discount_type}</td>
                      <td>{item.discount_value}</td>
                      <td>{item.min_order_discount}</td>
                      <td>
                        {new Date(item.expiry_date).toLocaleDateString("en-IN")}
                      </td>
                      <td
                        onClick={() => deleteCoupon(item.coupon_id)}
                        className="text-danger"
                      >
                        <Trash />
                      </td>
                    </tr>
                  </>
                ))
              ) : (
                <div className="container">
                  <h2 className="text-center">No Coupons</h2>
                </div>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupons;
