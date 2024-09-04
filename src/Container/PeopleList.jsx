import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
import DeleteConfirmation from "./DeleteConfirmation";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import EditProfile from "./EditProfile.jsx";
import down from "../assets/down.png";
import role from "../assets/role.png";
import cross from "../assets/cross.png";
import UpDownArrow from "../assets/UpDownArrow.png";
import { sortByName, sortByStatus } from "./SortingFunction.js";


import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const PeopleList = ({ users }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [localUsers, setLocalUsers] = useState(users);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [sortDirection, setSortDirection] = useState(null); // Null for default sorting
  const [sortColumn, setSortColumn] = useState(null); // Null for default sorting

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8; // Number of users per page

  useEffect(() => {
    setLocalUsers(users);
    setShowOverlay(false);
  }, [users]);

  // Handle user click to navigate and update the URL with the username
  const handleUserClick = (user) => {
    navigate(`/people-directory/${user.username}`);
  };

  // Close the modal and navigate back to the base route
  const handleCloseDetails = () => {
    navigate("/people-directory");
    setSelectedUser(null);
  };

  // Handle delete button click
  const handleDeleteClick = (user, e) => {
    e.stopPropagation(); // Prevent row click from firing
    setUserToDelete(user);
    setShowDeletePopup(true);
  };
  const handleEditClick = (user, e) => {
    e.stopPropagation(); // Prevent row click from firing
    setSelectedUser(user);
    setShowEditPopup(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    // Remove the user from the list
    const updatedUsers = localUsers.filter((user) => user !== userToDelete);
    // Update local state
    setLocalUsers(updatedUsers);
    // Optionally, update the global state or dispatch action here
    dispatch({ type: "SET_USERS", payload: updatedUsers });

    setShowDeletePopup(false);
    setUserToDelete(null);
  };

  // Close delete confirmation popup
  const handleDeleteCancel = () => {
    setShowDeletePopup(false);
    setUserToDelete(null);
  };

  // Define columns for the table
  const columns = useMemo(
    () => [
      {
        accessorKey: "details",
        header: () => (
          <span
            onClick={() => {
              setSortColumn("name");
              setSortDirection((prev) =>
                prev === "asc" ? "desc" : prev === "desc" ? null : "asc"
              );
            }}
            className="cursor-pointer flex items-center gap-2"
          >
            <p>Name</p>
            {sortColumn !== "name" && (
              <img src={UpDownArrow} alt="default" className="w-4 h-4" />
            )}
            {sortColumn === "name" &&
              (sortDirection === "asc" ? (
                <img src={down} alt="asc" className="w-4 h-4" />
              ) : sortDirection === "desc" ? (
                <img
                  src={down}
                  alt="desc"
                  className="w-4 h-4 transform scale-x-[-1]"
                />
              ) : (
                <img src={UpDownArrow} alt="default" className="w-4 h-4" />
              ))}
          </span>
        ),
        cell: ({ row }) => (
          <div className="flex items-center space-x-4">
            <img
              src={row.original.details.image}
              alt={row.original.details.name}
              className="w-14 h-14 rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-semibold">{row.original.details.name}</span>
              <span className="text-sm text-gray-500">
                @{row.original.username}
              </span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: () => (
          <span
            onClick={() => {
              setSortColumn("status");
              setSortDirection((prev) =>
                prev === "asc" ? "desc" : prev === "desc" ? null : "asc"
              );
            }}
            className="cursor-pointer flex items-center gap-2"
          >
            <p>Status</p>
            {sortColumn !== "status" && (
              <img src={UpDownArrow} alt="default" className="w-4 h-4" />
            )}
            {sortColumn === "status" &&
              (sortDirection === "asc" ? (
                <img src={down} alt="asc" className="w-4 h-4" />
              ) : sortDirection === "desc" ? (
                <img
                  src={down}
                  alt="desc"
                  className="w-4 h-4 transform scale-x-[-1]"
                />
              ) : (
                <img src={UpDownArrow} alt="default" className="w-4 h-4" />
              ))}
          </span>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-evenly border rounded-md">
            <span
              className={`w-2 h-2 rounded-full ${
                row.original.status === "Active" ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            <p>{row.original.status}</p>
          </div>
        ),
      },
      {
        accessorKey: "role",
        header: () => (
          <div className="flex items-center space-x-2">
            <span>Role</span>
            <img
              src={role} // Replace with the path to your image
              alt="Role"
              className="w-4 h-4" // Adjust the size as needed
            />
          </div>
        ),
      },
      {
        accessorKey: "details.email",
        header: "Email address",
      },
      {
        accessorKey: "teams",
        header: "Teams",
        cell: ({ row }) => {
          const teams = row.original.teams;
          const maxTeamsToShow = 3;
          const remainingTeamsCount = teams.length - maxTeamsToShow;

          // Function to get style based on index
          const getStyleByIndex = (index) => {
            switch (index) {
              case 0:
                return "text-purple-700 font-inter-bold bg-purple-50 border border-purple-300";
              case 1:
                return "text-blue-700 font-inter-bold bg-blue-50 border border-blue-300";
              case 2:
                return "text-customPurple font-inter-bold bg-violet-50 border border-violet-300";
              default:
                return "text-gray-700 font-inter-bold bg-gray-50 border border-gray-300"; // Fallback style if needed
            }
          };

          return (
            <div className="font-inter flex space-x-2">
              {teams.slice(0, maxTeamsToShow).map((team, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-1 rounded-full text-xs ${getStyleByIndex(
                    idx
                  )}`}
                >
                  {team}
                </span>
              ))}
              {remainingTeamsCount > 0 && (
                <span className="px-2 py-1 bg-gray-50 border border-gray-300 rounded-xl text-xs">
                  +{remainingTeamsCount}
                </span>
              )}
            </div>
          );
        },
      },

      {
        accessorKey: "actions",
        header: () => null, // Don't show the header for Actions
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 text-white rounded"
              onClick={(e) => handleDeleteClick(row.original, e)}
            >
              <img src={deleteIcon} alt="Delete" />
            </button>
            <button
              className="px-3 py-1 text-white rounded"
              onClick={(e) => handleEditClick(row.original, e)}
            >
              <img src={editIcon} alt="Edit" />
            </button>
          </div>
        ),
      },
    ],
    [localUsers, sortColumn, sortDirection]
  );

  // Sort and paginate users
  const sortedUsers = useMemo(() => {
    if (sortColumn === "name") {
      return sortDirection ? sortByName(localUsers, sortDirection) : localUsers;
    } else if (sortColumn === "status") {
      return sortDirection
        ? sortByStatus(localUsers, sortDirection)
        : localUsers;
    } else {
      return localUsers;
    }
  }, [localUsers, sortColumn, sortDirection]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * usersPerPage;
    return sortedUsers.slice(startIndex, startIndex + usersPerPage);
  }, [sortedUsers, currentPage]);

  const totalPages = Math.ceil(localUsers.length / usersPerPage);

  // Use the table hook
  const { getHeaderGroups, getRowModel } = useReactTable({
    data: paginatedUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (user) => {
    setSelectedUser(user); // Set selected user
    setShowOverlay(true); // Show overlay
    handleUserClick(user);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-white border-2 h-full w-full rounded-lg relative">
      {/* Table of users */}
      <div className="relative w-full">
        <table className="min-w-full bg-white">
          <thead>
            {getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={`py-2 px-4 text-gray-500 border-y h-14 ${
                      header.column.columnDef.header === null
                        ? "text-right"
                        : "text-left"
                    }`} // Align 'Actions' header to right (or null)
                  >
                    {header.column.columnDef.header !== null
                      ? flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 h-16 cursor-pointer"
                onClick={() => handleRowClick(row.original)} // Show user details on row click
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`py-2 px-4 border-b ${
                      cell.column.columnDef.header === null
                        ? "text-right"
                        : "text-left"
                    }`} // Align content of 'Actions' to right
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center p-4">
          <button
            className={`px-4 py-2 rounded-xl flex items-center gap-2 border font-inter-bold ${
              currentPage === 1 ? "cursor-text " : "bg-gray-50"
            }`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <img
              src={down}
              alt="desc"
              className="w-4 h-4 transform scale-x-[-1] rotate-90"
            />
            <p>Previous</p>
          </button>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx + 1}
                className={`px-4 py-2 rounded-md font-inter-bold text-gray-500 ${
                  currentPage === idx + 1 ? "bg-gray-100" : " "
                }`}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <button
            className={`px-4 py-2 rounded-xl flex items-center gap-2 border font-inter-bold ${
              currentPage === totalPages ? "cursor-text" : "bg-gray-50"
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <p>Next</p>
            <img
              src={down}
              alt="desc"
              className="w-4 h-4 transform scale-y-[-1] rotate-90"
            />
          </button>
        </div>

        {/* UserDetails Overlay */}
        {showOverlay && selectedUser && (
          <div className="fixed inset-0 flex justify-end z-50">
            <div className="w-1/2" onClick={handleCloseDetails}></div>
            <div className="w-1/2 h-full pt-4 pr-4 relative top-20 bg-white shadow-lg  rounded-lg overflow-y-auto">
              <button
                className="absolute top-10 right-10 text-2xl font-bold "
                onClick={handleCloseDetails}
              >
                <img src={cross} alt="remove" className="w-5 h-5" />
                
              </button>
              <UserDetails user={selectedUser} />
            </div>
          </div>
        )}
        {showEditPopup && selectedUser && (
          <EditProfile
            user={selectedUser}
            onClose={() => setShowEditPopup(false)}
          />
        )}

        {/* Delete Confirmation Popup */}
        {showDeletePopup && (
          <DeleteConfirmation
            onDelete={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        )}
      </div>
    </div>
  );
};

export default PeopleList;
