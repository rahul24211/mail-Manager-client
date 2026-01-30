import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyMail = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState([]);
  const [loading, setLoading] = useState(true);
 const apiurl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchMyMail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("\login");
          return;
        }

        const res = await axios.get(`${apiurl}/usermails`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMail(res.data.mails);
        setLoading(false);
      } catch (error) {
        alert(error.response?.data?.message || "Failed to load mails");
      }
    };
    fetchMyMail();
  }, [navigate]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="container">
      <div className="card shadow p-4 mt-4">
        <h5>My Mails</h5>

        <table className="table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {mail !== null ? (
              mail.map((item, index) => (
                <tr className="text-capitalize" key={item.id || index}>
                  <td onClick={() => navigate(`/mail/${item.id}`)}>
                    {item.subject}
                  </td>
                  <td>
                    <span
                      className={`badge px-3 py-2 ${
                        item.status === "Pending"
                          ? "bg-warning"
                          : item.status === "Approve"
                            ? "bg-success"
                            : "bg-danger"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <span className="badge bg-info">
                      {formatDate(item.createdAt)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>no mail found</td>
                <td>
                  <span className="badge bg-warning">no status</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyMail;
