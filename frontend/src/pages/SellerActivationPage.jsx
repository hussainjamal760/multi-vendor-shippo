import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { server } from "../server";

const SellerActivationPage = () => {
  const { activation_token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activation_token) {
      const activateAccount = async () => {
        try {
          setLoading(true);
          const { data } = await axios.post(`${server}/shop/activation`, {
            activation_token,
          });
          
          console.log("Activation successful:", data);
          setLoading(false);
          
          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } catch (err) {
          console.error("Activation error:", err.response?.data || err.message);
          setError(true);
          setLoading(false);
        }
      };
      activateAccount();
    }
  }, [activation_token, navigate]); // ✅ Added dependencies

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {loading ? (
        <div>
          <p style={{ fontSize: "18px", color: "#555" }}>
            Activating your account...
          </p>
        </div>
      ) : error ? (
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "20px", color: "#f44336", marginBottom: "10px" }}>
            Your token is expired or invalid!
          </p>
          <p style={{ fontSize: "14px", color: "#666" }}>
            Please sign up again to receive a new activation link.
          </p>
          <button
            onClick={() => navigate("/shop-create")}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Go to Sign Up
          </button>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "20px", color: "#4CAF50", marginBottom: "10px" }}>
            Your account has been created successfully!
          </p>
          <p style={{ fontSize: "14px", color: "#666" }}>
            Redirecting to dashboard...
          </p>
        </div>
      )}
    </div>
  );
};

export default SellerActivationPage;