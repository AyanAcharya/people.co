import React from "react";

const DeleteConfirmation = ({ onDelete, onCancel }) => {
  return (
    <div
      className=" font-inter fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="font-inter relative bg-white p-6 rounded-lg shadow-lg w-1/3">
        <button
          className="absolute top-5 right-8 text-black text-2xl"
          onClick={onCancel}
        >
          &times;
        </button>
        <h2
          id="delete-confirmation-title"
          className="text-2xl font-semibold mb-4 text-left"
        >
          Delete Member Details
        </h2>
        <p className="mb-6 text-left pr-4 pb-6">
          Are you sure you want to delete this Member's details? This action
          cannot be undone.
        </p>
        <div className="absolute bottom-4 right-6 ">
          <button
            className="bg-customPurple text-white px-4 py-3 rounded-md font-inter-bold"
            onClick={onDelete}
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
