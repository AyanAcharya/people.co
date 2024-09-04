import React from "react";
import ballIcon from "../assets/bell.png"; // Update with your actual icon path
import profileImage from "../assets/user_photo.png"; // Update with your actual image path


function Header() {
  return (
    <>
      <header className=" font-inter  flex justify-between items-center px-10 py-6 bg-backgroundWhite border-b w-full h-20">
        <div className="text-5xl font-bold text-customPurple font-inter-bold ">
          PEOPLE.CO
        </div>

        <div className="flex items-center space-x-3">
          <img src={ballIcon} alt="Ball Icon" className="w-10" />

          <div className="flex items-center space-x-2">
            <img
              src={profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />

            <span className="text-lg font-medium text-gray-800">Jane Doe</span>
          </div>
        </div>
      </header>
   
    </>
  );
}

export default Header;
