let count = 0;
function getReactionInfo(reactionInfo) {
  return new Promise((resolve) => {
    count++;
    resolve({count: count});
  });
}

export {getReactionInfo};
