import React from "react";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";

const links = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/signup",
    name: "Sign up",
  },
  {
    path: "/login",
    name: "Login",
  },
  {
    path: "/about",
    name: "About",
  },
  {
    path: "/contact",
    name: "Contact",
  },
];

const Nav = ({ user, updateStateProp }) => {
  const history = useHistory();
  const handleClick = (e) => {
    let menuWrapper = document.querySelector(".wrapper");
    let mobileMenu = document.querySelector(".mobile-nav");

    let topLine = document.querySelector(".top");
    let middleLine = document.querySelector(".middle");
    let bottomLine = document.querySelector(".bottom");

    menuWrapper.classList.toggle("open");
    mobileMenu.classList.toggle("open");

    topLine.classList.toggle("rotate-45");
    middleLine.classList.toggle("hide");
    bottomLine.classList.toggle("rotate45");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    updateStateProp({});
    history.push("/login");
  };

  return (
    <nav>
      <div className="burger-menu" onClick={(e) => handleClick(e)}>
        <div className="top line"></div>
        <div className="middle line"></div>
        <div className="bottom line"></div>
      </div>
      <div className="wrapper">
        <ul className="mobile-nav">
          {user.id ? (
            <>
              <li>
                <Link to="/"> Home </Link>
              </li>
              <li>
                <Link to={`/profile/${user.id}`}> Profile </Link>
              </li>

              <li>
                <a href="#" onClick={handleLogout}>
                  {" "}
                  Logout{" "}
                </a>
              </li>
            </>
          ) : (
            links.map(({ path, name }) => {
              return (
                <li>
                  <Link to={path}>{name}</Link>
                </li>
              );
            })
          )}
        </ul>
      </div>

      <ul className="desktop-nav">
        {user.id ? (
          <>
            <li>
              <Link to="/"> Home </Link>
            </li>
            <li>
              <Link to={`/profile/${user.id}`}>Hi, {user.username} </Link>
            </li>

            <li>
              <a href="#" onClick={handleLogout}>
                {" "}
                Logout{" "}
              </a>
            </li>
          </>
        ) : (
          links.map(({ path, name }) => {
            return (
              <li>
                <Link to={path}>{name}</Link>
              </li>
            );
          })
        )}
      </ul>
    </nav>
  );
};

export default Nav;
