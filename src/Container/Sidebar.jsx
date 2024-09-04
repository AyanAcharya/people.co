import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import sidebarIcon from '../assets/sidebar_icon.png';

function Sidebar() {
  const [active, setActive] = useState("");
  const location = useLocation();

  // Set the active state based on the current URL path
  React.useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  return (
    <div className="h-screen w-64 bg-white p-4">
      <ul>
        <li className="mb-4">
          <Link
            to="/overview"
            className="text-xl"
            onClick={() => setActive("/overview")}
          >
            <div className="flex gap-3 items-center p-2 rounded-lg">
              <div
                className={`flex items-center p-2 rounded-lg ${
                  active === "/overview" ? "bg-customPurple" : "bg-black"
                }`}
              >
                <img src={sidebarIcon} alt="icon" className="w-4 h-4" />
              </div>
              <span
                className={`${
                  active === "/overview"
                    ? "text-purple-600"
                    : "hover:text-purple-600"
                }`}
              >
                Overview
              </span>
            </div>
          </Link>
        </li>

        <li className="mb-4">
          <Link
            to="/people-directory"
            className="text-xl"
            onClick={() => setActive("/people-directory")}
          >
            <div className="flex gap-3 items-center p-2 rounded-lg">
              <div
                className={`flex items-center p-2 rounded-lg ${
                  active === "/people-directory" ? "bg-customPurple" : "bg-black"
                }`}
              >
                <img src={sidebarIcon} alt="icon" className="w-4 h-4" />
              </div>
              <span
                className={`${
                  active === "/people-directory"
                    ? "text-purple-600"
                    : "hover:text-purple-600"
                }`}
              >
                people-directory
              </span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
