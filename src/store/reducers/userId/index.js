import uuid from "uuid/v4";
import { SET_USER_ID } from "../game/actions";

export default function userId(state = uuid(), action) {
  switch (action.type) {
    case SET_USER_ID:
      return action.userId;

    default:
      return state;
  }
}
