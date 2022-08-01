// https://qiita.com/nagito25/items/0293bc317067d9e6c560
function formatCount({count}, base = 10) {
  if (Number(count) > 1000) {
    return `${Math.round((Number(count) / 1000) * base) / base}k`;
  } else {
    return Number(count);
  }
}

export {formatCount};
