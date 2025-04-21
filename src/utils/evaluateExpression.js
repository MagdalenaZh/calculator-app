import { ERROR_MESSAGES, PATTERNS } from '../constants/constants';
import { formatResult } from './formatters';
import { validateInput } from './validators';

export const calculate = (expr) => {
  if (!expr) return "";

  const validation = validateInput(expr);
  if (!validation.isValid) return validation.error;

  try {
    const processedExpr = processExpression(expr);

    if (containsUndefinedTan(processedExpr)) {
      return ERROR_MESSAGES.TAN_90;
    }

    const result = Function(`"use strict"; return ${processedExpr}`)();
    return formatResult(result);
  } catch (error) {
    console.error("Calculation error:", error);
    return ERROR_MESSAGES.INVALID_EXPRESSION;
  }
};

function processExpression(expr) {
  return [normalizeSymbols, addMissingParentheses, processSpecialOperators, convertToJavaScriptMath]
    .reduce((acc, fn) => fn(acc), expr);
}

function normalizeSymbols(expr) {
  return expr.replace(/\u00F7/g, "/").replace(/\u00D7/g, "*").replace(/\u00B7/g, ".");
}

function addMissingParentheses(expr) {
  return expr.replace(PATTERNS.MISSING_PARENTHESES, "$1($2)");
}

// replaces sqrt and percent symbols, throws if sqrt is used on a negative number
function processSpecialOperators(expr) {
  const matches = expr.match(PATTERNS.SQRT_FUNCTION);
  if (matches) {
    for (const match of matches) {
      const num = parseFloat(match.replace('√', ''));
      if (num < 0) throw new Error(ERROR_MESSAGES.INVALID_OPERATION);
    }
  }

  return expr
    .replace(PATTERNS.SQRT_FUNCTION, "Math.sqrt($1)")
    .replace(PATTERNS.PERCENTAGE, "($1/100)");
}

// converts trig and log functions to valid JS math calls using radians
function convertToJavaScriptMath(expr) {
  return expr
    .replace(/sin\(([^)]+)\)/g, "Math.sin(($1) * Math.PI / 180)")
    .replace(/cos\(([^)]+)\)/g, "Math.cos(($1) * Math.PI / 180)")
    .replace(/tan\(([^)]+)\)/g, "Math.tan(($1) * Math.PI / 180)")
    .replace(/log\(([^)]+)\)/g, "Math.log10($1)");
}

// checks if expression includes tan of 90 + 180n, which is undefined
function containsUndefinedTan(expr) {
  const matches = expr.match(/Math\.tan\(\(([^)]+)\) \* Math\.PI \/ 180\)/g);
  if (!matches) return false;

  for (const match of matches) {
    const inner = match.match(/Math\.tan\(\(([^)]+)\) \* Math\.PI \/ 180\)/);
    if (!inner || !inner[1]) continue;

    try {
      const angle = Function(`"use strict"; return (${inner[1]})`)();
      const mod = Math.abs(angle % 180);
      if (Math.abs(mod - 90) < 0.0001) return true; // if angle ≈ 90, it's undefined
    } catch {
      continue;
    }
  }

  return false;
}
