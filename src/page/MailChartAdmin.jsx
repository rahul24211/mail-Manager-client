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

const MailChartAdmin = () => {
  const [stats, setStats] = useState({});

  const COLORS = {
    Approved: "#28a745", // green
    Rejected: "#dc3545", // red
    Pending: "#ffc107", // yellow
    Reply: "#af1cd8",
  };

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`${apiUrl}/getsummary`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStats(res.data.AllDetails);
      } catch (error) {
        console.error("Summary error", error);
      }
    };

    fetchDetails();
  }, []);

  const data = [
    { name: "Approved", value: stats.AllRequestApprove },
    { name: "Rejected", value: stats.Reject },
    { name: "Pending", value: stats.AllRequestPending },
    { name: "Reply", value: stats.Reply },
  ];

  return (
    <div className="container mt-4">
      {/* <h3 className="mb-4">Mail Dashboard</h3> */}

      {/* <div className="row">
        {[
          { title: "Rejected", value: stats.Reject },

          { title: "Reply", value: stats.Reply },
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
      </div> */}

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

export default MailChartAdmin;
