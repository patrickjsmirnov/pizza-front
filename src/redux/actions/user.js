import {DELETE_USER, SAVE_USER} from "../actionTypes";

export function saveUser(user) {
  return ({
    type: SAVE_USER,
    user
  })
}

export function deleteUser() {
  return ({
    type: DELETE_USER,
  })
}

