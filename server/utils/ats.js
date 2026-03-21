const STOPWORDS = [
  "the", "and", "is", "in", "of", "to", "a", "for", "on", "with", "as", "by"
];

const IMPORTANT_SKILLS = [
  "react", "node", "aws", "docker", "mongodb",
  "typescript", "kubernetes", "rest", "api"
];

const cleanText = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(word => word && !STOPWORDS.includes(word));
};

exports.calculateATS = (cv, jd) => {
  const cvWords = new Set(cleanText(cv));
  const jdWords = cleanText(jd);

  const jdUnique = [...new Set(jdWords)];

  let matchCount = 0;

  jdUnique.forEach(word => {
    if (cvWords.has(word)) matchCount++;
  });

  const matchPercentage = Math.round((matchCount / jdUnique.length) * 100);

  const missingKeywords = jdUnique.filter(word => !cvWords.has(word));

  const score = Math.min(100, matchPercentage);

  return {
    score,
    matchPercentage,
    matchedKeywords: matchCount,
    totalKeywords: jdUnique.length,
    missingKeywords: missingKeywords.slice(0, 20) // limit
  };
};

exports.extractImportantKeywords = (jd) => {
  const words = cleanText(jd);

  return words.filter(word =>
    IMPORTANT_SKILLS.includes(word)
  );
};