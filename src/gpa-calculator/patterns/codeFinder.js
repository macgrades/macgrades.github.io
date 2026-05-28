const PATTERN = /[A-Z]{3,}\s\d[A-Z0-9]{2}\d[AB]*|[A-Z]{2,}\s[A-Z]*\d{3,}[AB]*/;

export const findCourseCode = (text) => {
  const matches = text.match(PATTERN);
  if (!matches) {
    return null;
  }
  return matches[0].trim();
};
