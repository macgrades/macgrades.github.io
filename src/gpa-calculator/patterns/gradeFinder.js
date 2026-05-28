const PATTERN = / [A-D][+-]?$| F$|^[A-D][+-]?$|^F$/;

export const findGrade = (text) => {
  const matches = text.match(PATTERN);
  if (!matches) {
    return null;
  }
  return matches[0].trim();
};
