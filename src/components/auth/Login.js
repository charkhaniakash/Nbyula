import React, { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setIsLoading(false);
        toast.success("Login Successful...");
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  // sign with google
  const signinWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Login successful");
        navigate("/home");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img alt="" src={loginImg} width="400px" />
        </div>
        <div className={`card ${styles.form}`}>
          <h2 style={{ color: "black" }}>Login</h2>
          <form onSubmit={loginUser}>
            <input
              placeholder="Email"
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              <span>Login</span>
            </button>
        
            <div className={styles.links}>
              <Link to="/reset" style={{textDecorationLine:'none',fontSize:'20px'}}>forgot Password</Link>
            </div>

            <p>-- or --</p>

            <button
              className="--btn --btn-danger"
              style={{ width: "100%", height: "35px" , display:'flex' , justifyContent: 'center' , alignItems: 'center' , gap:'3px' , backgroundColor:'orangered' }}
              onClick={signinWithGoogle}
            >
              <GoogleIcon style={{ fontSize: "30px" }} />
              Login With Google
            </button>

            <span className={styles.register}>
              <p>Don't have an account?</p>
              <Link to="/register" style={{textDecorationLine:'none',fontSize:'30px'}}>Register</Link>
            </span>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
