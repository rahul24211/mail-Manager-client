import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddBanners = () => {
  const [banners, setBanners] = useState([]); // uploaded banners
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiurl = import.meta.env.VITE_API_URL;

  // 🔹 load banners
  useEffect(() => {
    fetchBanners();
  }, []);
  const token = localStorage.getItem("token");
  const fetchBanners = async () => {
    const res = await axios.get(`${apiurl}/getbanners`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBanners(res.data.banners || []);
  };

  // 🔹 upload new banner
  const uploadBanner = async (file) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("images", file);

      const res = await axios.post(`${apiurl}/addbanner`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);
      fetchBanners();
    } catch (err) {
      alert("Upload failed");
      toast.error(err.response?.data?.message)
    }
  };

  // 🔹 delete banner
  const deleteBanner = async (id) => {
    if (!window.confirm("Delete this banner?")) return;

    try {
      const token = localStorage.getItem("token");
    const res =  await axios.delete(`${apiurl}/deletebanner?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message);
      fetchBanners();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  // 🔹 update banner
  const updateBanner = async (id, file) => {
    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.put(`${apiurl}/updatebanner?id=${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(res.data.message);
      fetchBanners();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const MAX_BANNERS = 6;
  return (
    <div className="container mt-5">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary mb-2 form-control"
      >
        Back
      </button>
      <h3 className="fw-bold mb-4">Manage Banners</h3>

      <div className="row g-3">
        {/* Existing banners */}
        {banners.map((banner) => (
          <div className="col-md-4" key={banner.id}>
            <div className="border rounded p-2 text-center">
              <img
                src={`${apiurl}${banner.imageUrl}`}
                className="img-fluid rounded mb-2"
                style={{ height: "160px", objectFit: "cover" }}
              />

              <div className="d-flex gap-2 justify-content-center">
                <label className="btn btn-sm btn-outline-primary">
                  Update
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => updateBanner(banner.id, e.target.files[0])}
                  />
                </label>

                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteBanner(banner.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add new banner box */}
        {banners.length < MAX_BANNERS && (
          <div className="col-md-4">
            <div className="border rounded p-3 text-center h-100 d-flex flex-column justify-content-center">
              <label className="btn btn-outline-success">
                + Add Banner
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => uploadBanner(e.target.files[0])}
                />
              </label>
              <small className="text-muted mt-2">Recommended 1920×600</small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBanners;
