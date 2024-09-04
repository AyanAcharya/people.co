import React, { useState } from "react";

const FilterPop = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  // Function to toggle the dropdown open/close
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle role changes
  const handleRoleChange = (role) => {
    const updatedRoles = selectedRoles.includes(role)
      ? selectedRoles.filter((r) => r !== role)
      : [...selectedRoles, role];
    setSelectedRoles(updatedRoles);
    onFilterChange("role", updatedRoles);
  };

  // Handle team changes
  const handleTeamChange = (team) => {
    const updatedTeams = selectedTeams.includes(team)
      ? selectedTeams.filter((t) => t !== team)
      : [...selectedTeams, team];
    setSelectedTeams(updatedTeams);
    onFilterChange("team", updatedTeams);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="border px-2 py-1 rounded">
        Filters
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg p-4 rounded-lg z-50">
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="roles-checkbox"
                checked={selectedRoles.length > 0}
                onChange={() => handleRoleChange("all")}
              />
              <label htmlFor="roles-checkbox" className="ml-2">
                Roles
              </label>
            </div>
            {[
              "Product Designer",
              "Product Manager",
              "Frontend Developer",
              "Backend Developer",
            ].map((role) => (
              <div key={role} className="ml-4">
                <input
                  type="checkbox"
                  id={role}
                  checked={selectedRoles.includes(role)}
                  onChange={() => handleRoleChange(role)}
                />
                <label htmlFor={role} className="ml-2">
                  {role}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="teams-checkbox"
                checked={selectedTeams.length > 0}
                onChange={() => handleTeamChange("all")}
              />
              <label htmlFor="teams-checkbox" className="ml-2">
                Teams
              </label>
            </div>
            {["Design", "Product", "Marketing", "Technology"].map((team) => (
              <div key={team} className="ml-4">
                <input
                  type="checkbox"
                  id={team}
                  checked={selectedTeams.includes(team)}
                  onChange={() => handleTeamChange(team)}
                />
                <label htmlFor={team} className="ml-2">
                  {team}
                </label>
              </div>
            ))}
          </div>
          <button
            className="mt-4 bg-purple-500 text-white w-full py-2 rounded"
            onClick={toggleDropdown}
          >
            Select
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterPop;
