const PATTERN = /[0-9]*[.][0]{2}[/][0-9]*[.][0]{2}|[0-9]*[.][0]{2}/;

export const findUnits = (text) => {
  const matches = text.match(PATTERN);
  if (!matches) {
    return null;
  }
  const attemptedAndEarned = matches[0]; // "3.00/0.00"

  return getAttempted(attemptedAndEarned);
};

const getAttempted = (attemptedAndEarned) => {
  const attempted = attemptedAndEarned.split("/")[0];
  return parseFloat(attempted);
};
