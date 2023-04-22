import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Header.module.scss";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../firebase/config";
import Loader from "../loader/Loader";
import { onAuthStateChanged } from "firebase/auth";
import {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
} from "../../Redux/slice/authSlice";

import imgB from "../../assets/logojob.jpg";

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("LogOut successful");
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);

        if (user.displayName === null) {
          const u1 = user.email.slice(0, -10);

          const firstLetter = u1.charAt(0).toUpperCase();

          const uName = firstLetter + u1.slice(1, u1.length);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        setDisplayName(user.displayName);
        setPhotoURL(user.photoURL);
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        setPhotoURL("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  return (
    <>
      {isLoading && <Loader />}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: "flex" }}
            >
              {!displayName ? (
                <NavLink
                  to="/"
                  style={{ textDecoration: "none" }}
                  className={activeLink}
                >
                  <img
                    style={{ width: "100px", height: "100px", display: "flex" }}
                    src={imgB}
                    alt=""
                  />
                </NavLink>
              ) : (
                <NavLink
                  to="/home"
                  style={{ textDecoration: "none" }}
                  className={activeLink}
                >
                  <img
                    style={{ width: "100px", height: "100px", display: "flex" }}
                    src={imgB}
                    alt=""
                  />
                </NavLink>
              )}
            </Typography>

            <div className={styles["header-right"]}>
              <span className={styles.links}>
                {!displayName ? (
                  <NavLink
                    className={activeLink}
                    to="/login"
                    style={{
                      textDecorationLine: "none",
                      fontSize: "30px",
                      marginRight: "150px",
                    }}
                  >
                    Login
                  </NavLink>
                ) : (
                  <a href="#home" style={{}}>
                    <img
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                      }}
                      alt=""
                      src={photoURL}
                    />{" "}
                    Hi, <span style={{ color: "red" }}>{displayName}</span>
                  </a>
                )}

                {displayName ? (
                  <>
                    {!displayName ? (
                      <NavLink className={activeLink} to="/register">
                        Register
                      </NavLink>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}

                {displayName ? (
                  <NavLink
                    className={activeLink}
                    to="/logout"
                    onClick={userSignOut}
                  >
                    Log Out
                  </NavLink>
                ) : (
                  ""
                )}
              </span>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
