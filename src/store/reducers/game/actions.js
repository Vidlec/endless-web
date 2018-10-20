import game from "../../../mocks/games";
import axios from "axios";

export const SUCCESS = type => `${type}_SUCCESS`;
export const ERROR = type => `${type}_ERROR`;

export const GET_GAME = "GET_GAME";
export const VERIFY_IMAGE = "VERIFY_IMAGE";

export const getGame = gameId => () => ({
  type: GET_GAME,
  payload: axios.get(
    `https://obfcyeob50.execute-api.eu-west-1.amazonaws.com/dev/game/${gameId}`,
    {
      headers: {
        Authorization: "someUser"
      }
    }
  )
});

export const verifyImage = (storyItemId, imageBlob) => () => ({
  type: VERIFY_IMAGE,
  payload: axios.post(
    `https://obfcyeob50.execute-api.eu-west-1.amazonaws.com/dev/story-item/${storyItemId}/rekognize`,
    imageBlob,
    {
      headers: {
        Authorization: "someUser"
      }
    }
  ),
  storyItemId
});
