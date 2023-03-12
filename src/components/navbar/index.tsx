import { FC, useState } from "react";
import NavbarData from "./data";
import { Link } from "react-router-dom";

const Navbar: FC = () => {
  const [navbar, setNavbar] = useState(false);

  const showNavbar = () => setNavbar(navbar);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>API Routes</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        {NavbarData.map((item, index) => {
          return (
            <ul key={index} style={{ listStyleType: "none" }}>
              <li>
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              </li>
            </ul>
          );
        })}
      </div>
    </>
  );
};

export default Navbar;
