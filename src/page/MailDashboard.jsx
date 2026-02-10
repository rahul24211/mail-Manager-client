import React, { useEffect, useState } from "react";
import axios from "axios";
import { Cell } from "recharts";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const MailDashboard = () => {
  const [stats, setStats] = useState({});
const navigate = useNavigate()
  const COLORS = {
    Approved: "#28a745", // green
    Rejected: "#dc3545", // red
    Pending: "#ffc107", // yellow
  };

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get(`${apiUrl}/mailstats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data.mail);
    };
    fetchStats();
  }, []);

  const data = [
    { name: "Approved", value: stats.approved },
    { name: "Rejected", value: stats.rejected },
    { name: "Pending", value: stats.pending },
  ];

  return (
    <div className="container mt-4">
      <button onClick={()=> navigate(-1)} className="btn btn-secondary mb-2 form-control">Back</button>
      <h3 className="mb-4">Mail Dashboard</h3>

      <div className="row">
        {[
          { title: "Total Mails", value: stats.totalMail },
          { title: "Approved", value: stats.approved },
          { title: "Rejected", value: stats.rejected },
          { title: "Pending", value: stats.pending },
        ].map((item, i) => (
          <div className="col-md-3 mb-3" key={i}>
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h6>{item.title}</h6>
                <h3>{item.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-4 p-3">
        <h5 className="text-center">Mail Status Chart</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MailDashboard;
