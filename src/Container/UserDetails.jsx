/* eslint-disable react/prop-types */
import React from "react";
import link from "../assets/link.png";

const UserDetails = ({ user }) => {

    
  return (
    <div className="font-inter w-full">
      <div className="flex items-center justify-between bg-cover text-white rounded-t-lg h-36">
        <div className="flex items-center space-x-8">
          <img
            src={user.details.image}
            alt={user.details.name}
            className=" rounded-full w-24 h-24 ml-8"
          />
          <div>
            <h2 className="text-2xl font-inter-bold ">{user.details.name}</h2>
            <div className="flex items-center justify-between gap-4">
              <div className="grid ">
                <p className="text-white font-inter-light">@{user.username}</p>
                <p className="text-white font-inter-light">User ID</p>
              </div>
              <span className="h-8 w-0.5 bg-white rounded"></span>
              <div>
                <p className="text-white font-inter-light">{user.role}</p>
                <p className="text-white font-inter-light">Role</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="font-inter border-t border-b px-4">
        <div className="h-12 flex items-center bg-coverBackground my-4  rounded">
          <p className="text-gray-600 font-medium text-xl rounded-sm px-4 font-inter-bold">
            Personal Information
          </p>
        </div>
        <div className="">
          {[
            { label: "Date of Birth", value: user.details.dob },
            { label: "Gender", value: user.details.gender },
            { label: "Nationality", value: user.details.nationality },
            { label: "Contact no.", value: user.details.contact_no },
            { label: "E-mail Address", value: user.details.email },
            { label: "Work email Address", value: user.details.work_email },
          ].map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-2 py-2 border-b h-12 items-center"
            >
              <span className="text-gray-500 font-inter-bold">
                {item.label}
              </span>
              <span className="text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Research & Publication */}
      <div className="mt-6 px-4">
        <div className="h-12 flex items-center bg-coverBackground my-4 rounded">
          <p className="text-gray-600 font-medium text-xl rounded-sm px-4 font-inter-bold">
            Research & Publication
          </p>
        </div>
        <div className="mt-4">
          <h4 className="text-lg font-semibold">
            {user.research.research_title}
          </h4>
          <p className="text-sm text-gray-500">
            Published in {user.research.subject} &bull; {user.research.year}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            {user.research.desc}{" "}
            <span className="text-red-500 font-semibold cursor-pointer">
              See More...
            </span>
          </p>
        </div>
        <a
          className="mt-4 text-red-500 font-semibold flex items-center gap-4"
          href={user.research.link}
        >
          <img src={link} alt="remove" className="w-4 h-4" />
          <p>SEE PUBLICATION</p>
        </a>
      </div>
    </div>
  );
};

export default UserDetails;
