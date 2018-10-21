export const GET_RESULTS = "GET_RESULTS";
export const RESET_RESULTS = "RESET_RESULTS";

export const getResults = () => ({ fetchJson, getState }) => {
  const {
    game: { gameId }
  } = getState();
  return {
    type: GET_RESULTS,
    payload: fetchJson(
      "get",
      `https://obfcyeob50.execute-api.eu-west-1.amazonaws.com/dev/game/${gameId}/results`
    )
  };
};

export const resetResults = () => ({
  type: RESET_RESULTS
});
