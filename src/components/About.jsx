import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="container py-5">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-5"
      >
        <h1 className="fw-bold text-primary">About Mail-Manager</h1>
        <p className="text-muted mt-2">
          Smart • Secure • Simple Email Management System
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="row align-items-center">
        {/* Left Content */}
        <motion.div
          className="col-md-6 mb-4"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h4 className="fw-semibold">What is Mail-Manager?</h4>
          <p className="text-muted">
            Mail-Manager is a powerful web application designed to manage,
            organize, approve and track emails efficiently.  
            It helps admins and users handle mail requests smoothly with proper
            status management.
          </p>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">✔ User Authentication & Security</li>
            <li className="list-group-item">✔ Mail Approval & Rejection System</li>
            <li className="list-group-item">✔ Admin Dashboard & Controls</li>
            <li className="list-group-item">✔ Fast & Responsive UI</li>
          </ul>
        </motion.div>

        {/* Right Card */}
        <motion.div
          className="col-md-6"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <h5 className="card-title fw-bold text-success">
                Why Choose Mail-Manager?
              </h5>
              <p className="card-text text-muted">
                We focus on simplicity, performance, and security.  
                Our system ensures smooth communication flow with complete
                transparency and control.
              </p>

              <div className="d-flex flex-wrap gap-2">
                <span className="badge bg-primary">React</span>
                <span className="badge bg-dark">Bootstrap</span>
                <span className="badge bg-info text-dark">Framer Motion</span>
                <span className="badge bg-success">Node & MySQL</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-5"
      >
        <p className="text-muted small">
          © {new Date().getFullYear()} Mail-Manager. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
