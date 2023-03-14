import { FC, useState } from "react";
import NavbarData from "./NavbarData";
import { Link } from "react-router-dom";
import "./styles.css";

const Navbar: FC = () => {
  const [navbar, setNavbar] = useState(false);

  const showNavbar = () => setNavbar(navbar);

  return (
    <>
      <h1 className="center">API Routes</h1>
      <div>
        <ul className="navigation">
          {NavbarData.map((item, index) => {
            return (
              <li key={index} className="item">
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
