import React, { useState } from "react";
import styles from "./auth.module.scss";
import { Link } from "react-router-dom";
import forgotImg from "../../assets/forgot.png";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("check email for reset link");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img alt="" src={forgotImg} width="400px" />
        </div>
        <div className={`card ${styles.form}`}>
          <h2 style={{ color: "red" }}>Reset Password</h2>
          <form onSubmit={resetPassword}>
            <input
              placeholder="Email"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
                                  <button
              type="submit"
              style={{
                borderRadius: "4px",
                backgroundcolor: "red",
                border: 'none',
                color: "green",
                textAlign: 'center',
                fontSize: "28px",
                padding: "20px",
                width: "200px",
                cursor: 'pointer',
                margin: "5px",
              }}
            >
              <span>Reset</span>
            </button>
            

            <span
              className={styles.forgot}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "5px",
              }}
            >
              <Link to="login">-Login</Link>
              <Link to="/register">Register-</Link>
            </span>
          </form>
        </div>
      </section>
    </>
  );
};

export default Reset;
