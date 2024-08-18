const levenshtein = require("fast-levenshtein");
function similarityPercentage(str1, str2) {
  const distance = levenshtein.get(str1.toLowerCase(), str2.toLowerCase());
  const maxLength = Math.max(str1.length, str2.length);
  const similarity = (maxLength - distance) / maxLength;
  return similarity * 100;
}
export function isSimilar(input, condition) {
  const similarity = similarityPercentage(input, condition);
  return similarity > 50;
}
