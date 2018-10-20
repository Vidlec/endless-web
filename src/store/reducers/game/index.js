import * as actions from "./actions";

export default function game(state = null, action) {
  switch (action.type) {
    case actions.GET_GAME:
      return action.game;

    case actions.UPDATE_STORY_ITEM: {
      return {
        ...state,
        storyItems: state.storyItems.map(item => {
          if (item._id !== action.storyItemId) return item;
          return {
            ...item,
            ...action.props
          };
        })
      };
    }

    default:
      return state;
  }
}
