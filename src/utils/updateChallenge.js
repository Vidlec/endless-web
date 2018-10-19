export default (challenge, isCorrect) => {
  Object.assign(
    challenge,
    isCorrect && { done: true, end: window.performance.now() - challenge.start }
  );
};
