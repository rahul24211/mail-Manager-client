import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
const AddProduct = () => {
  const [search, setSearch] = useState("");
  const fileRef = useRef(null);
  const { CName } = useParams();
  const [form, setForm] = useState({
    PName: "",
    Description: "",
    Language: "",
    Price: "",
    image: null,
  });
  const [details, setDetails] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const onchange = (e) => {
    const { name, value, files, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const { id } = useParams();
  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async (value) => {
    try {
      const res = await axios.get(
        `${apiUrl}/getproductbyc?id=${id}&search=${value || ""}`,
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
      fetchDetails(search);
      ("");
    }, 400);
    return () => clearTimeout(delay);
  }, [search]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", form.image);
      formData.append("PName", form.PName);
      formData.append("Description", form.Description);
      formData.append("Language", form.Language);
      formData.append("Price", form.Price);
      formData.append("CId", id);
      const res = await axios.post(`${apiUrl}/addproduct`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setForm({ PName: "", Description: "", Price: "", image: null });
      fileRef.current.value = null;
      fetchDetails();
      toast.success(res.data.message);
    } catch (error) {
      setForm({ PName: "", Description: "", Price: "", image: null });
      fileRef.current.value = null;
      console.error(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  const updateProductImage = async (id, file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axios.patch(
        `${apiUrl}/updateproductimage?id=${id}`,
        formData,
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

  const deleteBook = async (id) => {
    try {
      const res = await axios.patch(
        `${apiUrl}/deleteproduct?id=${id}`,
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
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 mt-5">
            <h3 className="text-center text-capitalize">
              Please Add Only <u className="motion-heading">{CName}</u>{" "}
            </h3>
            <form onSubmit={handleSubmit}>
              <input
                className="form-control"
                type="text"
                placeholder="Enter Product Name"
                name="PName"
                onChange={onchange}
                value={form.PName}
              />
              <input
                type="text"
                placeholder="Enter Description"
                name="Description"
                className="form-control mt-1"
                onChange={onchange}
                value={form.Description}
              />
              <input
                type="text"
                placeholder="Enter Language"
                name="Language"
                className="form-control mt-1"
                onChange={onchange}
                value={form.Languageanguage}
              />
              <input
                type="Number"
                placeholder="Enter Product Price"
                name="Price"
                className="form-control mt-1"
                onChange={onchange}
                value={form.Price}
              />
              <input
                className="form-control mt-1"
                type="file"
                placeholder="Enter Product Image"
                name="image"
                onChange={onchange}
                ref={fileRef}
              />
              <button className="btn btn-primary form-control mt-1">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr />

      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mb-3">
            <h2 className="ms-1">
              {" "}
              <u className="text-capitalize">{CName}</u>
            </h2>
            <input
              style={{ width: "250px", borderRadius: "20px", height: "40px" }}
              type="text"
              placeholder="Search.."
              className="p-2 me-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {details &&
            details.map((product) => (
              <div className="col-md-3">
                <div
                  style={{ cursor: "pointer", width: "310px", height: "500px" }}
                  className="border rounded p-2 mb-4"
                  key={product.id}
                >
                  <img
                    id="productImg"
                    src={`${apiUrl}${product.Image}`}
                    className="img-fluid rounded mb-2 d-block mx-auto"
                    style={{
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                  <h5 className="text-capitalize">{product.PName} </h5>
                  <small className="text-capitalize d-flex">
                    {product.Description.slice(0, 40)}...
                  </small>
                  <div className="d-flex justify-content-between">
                    <span>
                      Stock : <b>{product.Stock}</b>
                    </span>
                    <span>
                      Language : <b>{product.language}</b>
                    </span>
                  </div>

                  <b>Price : {product.Price}</b>
                  <div className="mt-2 d-flex justify-content-between">
                    <label className="btn btn-success">
                      Update Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) =>
                          updateProductImage(product.id, e.target.files[0])
                        }
                      />
                    </label>
                    <button
                      onClick={() => deleteBook(product.id)}
                      className="btn btn-danger ms-2"
                    >
                      Delete Book
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

export default AddProduct;
