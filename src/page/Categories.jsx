import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Categories = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [form, setForm] = useState({
    CName: "",
    CDes: "",
    image: null,
  });

  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async (value) => {
    try {
      const res = await axios.get(`${apiUrl}/getcategories?search=${value || ""}`);
      setDetails(res.data.FCategories || []);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDetails(search);
    }, 400);
    return () => clearTimeout(delay);
  }, [search]);

  const onchange = (e) => {
    const { name, value, files, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    })); /// file vs text handle
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", form.image);
      formData.append("CName", form.CName);
      formData.append("CDes", form.CDes);
      const res = await axios.post(`${apiUrl}/addcategory`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      setForm({
        CName: "",
        CDes: "",
        image: null,
      });
      fetchDetails();
      fileRef.current.value = null;
    } catch (error) {
      toast.error(error.response?.data?.message);
      setForm({
        CName: "",
        CDes: "",
        image: null,
      });
      fileRef.current.value = null;
    }
  };

  const updateImage = async (id, file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.put(
        `${apiUrl}/updatefcimage?id=${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data",
          },
        },
      );
      toast.success(res.data.message);
      fetchDetails();
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.patch(
        `${apiUrl}/deletecategory?id=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(res.data.message);
      fetchDetails();
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  const handleNavigate = (id, CName) => {
    navigate(`/products/${id}/${CName}`);
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 mt-5">
            <form className="" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter CName"
                className="form-control "
                required
                minLength={2}
                onChange={onchange}
                name="CName"
                value={form.CName}
              />
              <input
                type="text"
                placeholder="Enter CDes"
                className="form-control mt-2"
                onChange={onchange}
                name="CDes"
                value={form.CDes}
              />
              <input
                type="file"
                placeholder="Enter CImage"
                className="form-control mt-2"
                name="image"
                onChange={onchange}
                ref={fileRef}
              />

              <button className="form-control btn btn-primary mt-2">
                click
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr />

      <div className="container mt-5">
        <div className="row">
          <div className="d-flex justify-content-between mb-4">
            <h3 className="">
              <u>Books-Categories</u>
            </h3>
            <input
              className="p-1"
              style={{ borderRadius: "20px", width: "250px" }}
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {details &&
            details.map((category) => (
              <div className="col-md-3 " key={category.id}>
                <div
                  style={{ cursor: "pointer" }}
                  className="border rounded p-2 text-center mb-4"
                >
                  <img
                    src={`${apiUrl}${category.CImage}`}
                    className="img-fluid rounded mb-2"
                    style={{ height: "160px", objectFit: "cover" }}
                    onClick={() => handleNavigate(category.id, category.CName)}
                  />
                  <h5 className="text-capitalize">{category.CName} </h5>
                  <small className="text-capitalize">
                    {category.CDes.slice(0, 40)}...
                  </small>
                  <div className="mt-2 d-flex justify-content-between">
                    <label className="btn btn-success">
                      Update Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) =>
                          updateImage(category.id, e.target.files[0])
                        }
                      />
                    </label>
                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="btn btn-danger ms-2"
                    >
                      Delete Category
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
