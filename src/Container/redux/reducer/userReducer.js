import { ActionTypes } from "../constants/actionTypes";

const initialState = {
  users: [],
};

export const peopleCoReducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.FETCH_USERS:
      return { ...state, users: payload };
    case ActionTypes.SET_USERS:
      return { ...state, users: payload };

    default:
      return state;
  }
};
