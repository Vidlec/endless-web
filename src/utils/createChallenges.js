export default challenges =>
  challenges.reduce((acc, challenge) => {
    const start = window.performance.now();

    return Object.assign(acc, {
      [challenge]: {
        time: null,
        start
      }
    });
  }, {});
