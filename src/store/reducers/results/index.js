import uuid from "uuid/v4";
import { SUCCESS } from "../game/actions";
import { GET_RESULTS, RESET_RESULTS } from "./actions";

export default function results(state = null, action) {
  switch (action.type) {
    case SUCCESS(GET_RESULTS):
      return action.payload.data.results;

    case RESET_RESULTS:
      return null;

    default:
      return state;
  }
}
