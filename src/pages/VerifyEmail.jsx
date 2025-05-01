import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { server } from "../constants/config";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("verifying"); // verifying, success, error

  useEffect(() => {
    const token = searchParams.get("token");
    const id = searchParams.get("id");

    if (!token || !id) {
      setStatus("error");
      toast.error("Invalid verification link.");
      return;
    }

    axios
      .get(`${server}/api/v1/user/verify-email?token=${token}&id=${id}`)
      .then((res) => {
        toast.success(res.data.message || "Email verified successfully!");
        setStatus("success");
      })
      .catch((err) => {
        toast.error(
          err?.response?.data?.message || "Email verification failed."
        );
        setStatus("error");
      });
  }, []);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {status === "verifying" && <h2>Verifying your email...</h2>}
      {status === "success" && <h2>Email verified! You can now log in.</h2>}
      {status === "error" && (
        <h2>Verification failed. Please try again or request a new link.</h2>
      )}
    </div>
  );
};

export default VerifyEmail;
