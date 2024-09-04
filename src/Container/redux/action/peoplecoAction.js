import { ActionTypes } from "../constants/actionTypes.js";
import users from "../../db/database.json"; // Import the JSON file directly

export const fetchUsers = () => (dispatch) => {
  // Use the offline data (JSON) directly
  dispatch({ type: ActionTypes.FETCH_USERS, payload: users });
};
