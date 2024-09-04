// sortingFunctions.js

// Sort users by name (ascending or descending)
export const sortByName = (users, direction) => {
  return [...users].sort((a, b) => {
    const nameA = a.details.name.toLowerCase();
    const nameB = b.details.name.toLowerCase();
    if (direction === "asc") {
      return nameA.localeCompare(nameB);
    } else if (direction === "desc") {
      return nameB.localeCompare(nameA);
    } else {
      return 0; // No sorting
    }
  });
};

// Sort users by status (ascending or descending)
export const sortByStatus = (users, direction) => {
  return [...users].sort((a, b) => {
    if (direction === "asc") {
      return a.status.localeCompare(b.status);
    } else if (direction === "desc") {
      return b.status.localeCompare(a.status);
    } else {
      return 0; // No sorting
    }
  });
};
