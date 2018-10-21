import * as actions from "./actions";
import { message } from "antd";
const { SUCCESS, ERROR, START } = actions;

function updateStoryItem(id, props, state) {
  return {
    ...state,
    storyItems: state.storyItems.map(item => {
      if (item._id !== id) return item;
      return {
        ...item,
        ...props
      };
    })
  };
}

export default function game(state = null, action) {
  switch (action.type) {
    case SUCCESS(actions.GET_GAME):
      return action.payload.data;

    case SUCCESS(actions.VERIFY_IMAGE): {
      message.success("Váš příběh byl propojen");
      return updateStoryItem(
        action.storyItemId,
        { isComplete: true, isLoading: false },
        state
      );
    }

    case actions.SET_USER_IMAGE: {
      return updateStoryItem(
        action.storyItemId,
        { image: action.image },
        state
      );
    }

    case START(actions.VERIFY_IMAGE): {
      return updateStoryItem(action.storyItemId, { isLoading: true }, state);
    }
    case ERROR(actions.VERIFY_IMAGE): {
      message.error("Obrázek neobsahuje požadované předměty");
      return updateStoryItem(action.storyItemId, { isLoading: false }, state);
    }

    default:
      return state;
  }
}
