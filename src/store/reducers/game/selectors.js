import { createSelector } from "reselect";

const selectGame = state => state.game;
export const selectStoryItem = storyItemId =>
  createSelector(selectGame, game =>
    game.storyItems.find(storyItem => storyItem._id === storyItemId)
  );
