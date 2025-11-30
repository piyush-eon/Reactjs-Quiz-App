export const SCHEMES = {
  NORMAL: "normal",
  NEGATIVE: "negative",
};

const LS_KEYS = {
  SCHEME: "markingScheme",
  PENALTY: "negativePenalty",
};

export function readMarkingScheme() {
  const raw = (localStorage.getItem(LS_KEYS.SCHEME) || SCHEMES.NORMAL).toLowerCase();
  return raw === SCHEMES.NEGATIVE ? SCHEMES.NEGATIVE : SCHEMES.NORMAL;
}

export function readPenalty() {
  const stored = localStorage.getItem(LS_KEYS.PENALTY);
  const num = stored ? Number(stored) : NaN;
  return Number.isFinite(num) && num >= 0 ? num : 0.25;
}

export function applyNormalMarking(currentScore, isCorrect) {
  return isCorrect ? currentScore + 1 : currentScore;
}

export function applyNegativeMarking(currentScore, isCorrect, penalty = readPenalty()) {
  if (isCorrect) return currentScore + 1;
  return currentScore - penalty;
}

export function getNextScore(currentScore, isCorrect) {
  const scheme = readMarkingScheme();
  if (scheme === SCHEMES.NEGATIVE) {
    return applyNegativeMarking(currentScore, isCorrect);
  }
  return applyNormalMarking(currentScore, isCorrect);
}

export function getSchemeLabel(scheme = readMarkingScheme()) {
  return scheme === SCHEMES.NEGATIVE ? "Negative Marking" : "Normal Marking";
}

export function getSchemeMeta() {
  const scheme = readMarkingScheme();
  return {
    scheme,
    penalty: scheme === SCHEMES.NEGATIVE ? readPenalty() : 0,
  };
}
