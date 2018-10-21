import axios from "axios";
import uuid from "uuid/v4";

export const SUCCESS = type => `${type}_SUCCESS`;
export const ERROR = type => `${type}_ERROR`;
export const START = type => `${type}_START`;

export const GET_GAME = "GET_GAME";
export const SET_USER_ID = "SET_USER_ID";
export const VERIFY_IMAGE = "VERIFY_IMAGE";

export const getGame = gameId => ({ fetchJson }) => ({
  type: GET_GAME,
  payload: fetchJson(
    "get",
    `https://obfcyeob50.execute-api.eu-west-1.amazonaws.com/dev/game/${gameId}`
  )
});

export const setUserId = () => ({
  type: SET_USER_ID,
  userId: uuid()
});

export const verifyImage = (storyItemId, imageBlob) => ({ fetchJson }) => ({
  type: VERIFY_IMAGE,
  payload: fetchJson(
    "post",
    `https://obfcyeob50.execute-api.eu-west-1.amazonaws.com/dev/story-item/${storyItemId}/rekognize`,
    imageBlob
  ),
  storyItemId
});
