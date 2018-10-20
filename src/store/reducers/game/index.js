import * as actions from "./actions";
import { notification } from "antd";
const { SUCCESS, ERROR } = actions;

export default function game(state = null, action) {
  switch (action.type) {
    case SUCCESS(actions.GET_GAME):
      return action.payload.data;

    case SUCCESS(actions.VERIFY_IMAGE): {
      return {
        ...state,
        storyItems: state.storyItems.map(item => {
          if (item._id !== action.storyItemId) return item;
          return {
            ...item,
            isComplete: true
          };
        })
      };
    }
    case ERROR(actions.VERIFY_IMAGE): {
      notification["error"]({
        message: "Obrázek neobsahuje požadované předměty",
        description: "Zkuste to ještě jednou"
      });
      return state;
    }

    default:
      return state;
  }
}
