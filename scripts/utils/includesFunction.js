export function includes(textCourt, textLong) {
  let match = 0;
  for (let j = 0; j < textLong.length; j++) {
    if (textLong[j] === textCourt[0]) {
      for (let k = 0; k < textCourt.length; k++) {
        if (textCourt[k] === textLong[k + j]) {
          match++;
        }
      }
      if (match === textCourt.length) {
        return true;
      }
      match = 0;
    }
  }
  return false;
}
