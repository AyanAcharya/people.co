import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./redux/action/peoplecoAction.js";
import PeopleList from "./PeopleList.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import FilterPop from "./FilterPopup.jsx";
import AddMember from "./AddMember.jsx";

function PeopleDirectory() {
  const users = useSelector((state) => state.allUsers.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // State definitions
  const [searchKeyword, setSearchKeyword] = useState(""); // Define searchKeyword here
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({ role: [], team: [] });
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false); // Add member popup state

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get("search") || "";
    setSearchKeyword(keyword);
  }, [location.search]);

  const handleSearchChange = (e) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    navigate(`/people-directory?search=${keyword}`);
  };

  const handleFilterChange = (filterType, selectedValues) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: selectedValues,
    }));
    const filterParams =
      selectedValues.length > 0 ? selectedValues.join(",") : "";
    navigate(`/people-directory?${filterType}=${filterParams}`);
  };

  const filterUsers = (users, searchKeyword, filters) => {
    return users
      .filter((user) =>
        user.details.name.toLowerCase().includes(searchKeyword.toLowerCase())
      )
      .filter(
        (user) =>
          filters.role.length === 0 ||
          filters.role.includes("all") ||
          filters.role.includes(user.role)
      )
      .filter(
        (user) =>
          filters.team.length === 0 ||
          filters.team.includes("all") ||
          filters.team.some((team) => user.teams.includes(team))
      );
  };

  useEffect(() => {
    setFilteredUsers(filterUsers(users, searchKeyword, filters));
  }, [users, searchKeyword, filters]);

  const handleAddMemberClick = () => {
    setIsAddMemberOpen(true);
  };

  const handleCloseAddMember = () => {
    setIsAddMemberOpen(false);
  };

  return (
    <div className="bg-white border-2 h-full w-full rounded-lg relative">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold font-inter">Team Members</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchKeyword} // Ensure this matches the state variable
            onChange={handleSearchChange}
            className="border px-2 py-1 rounded"
          />
          <FilterPop onFilterChange={handleFilterChange} />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddMemberClick}
          >
            Add Member
          </button>
        </div>
      </div>

      <PeopleList users={filteredUsers} />

      {isAddMemberOpen && <AddMember onClose={handleCloseAddMember} />}
    </div>
  );
}

export default PeopleDirectory;
