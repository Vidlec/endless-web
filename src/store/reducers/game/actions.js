import game from "../../../mocks/games";

export const SUCCESS = type => `${type}_SUCCESS`;
export const FAILURE = type => `${type}_FAILURE`;

export const GET_GAME = "GET_GAME";
export const UPDATE_STORY_ITEM = "UPDATE_STORY_ITEM";

export const getGame = gameId => ({
  type: GET_GAME,
  game: game[gameId]
});

export const updateStoryItem = (storyItemId, props) => ({
  type: UPDATE_STORY_ITEM,
  storyItemId,
  props
});
