import { ERROR_MESSAGES } from '../constants/constants';

export const formatResult = (result) => {
  if (!Number.isFinite(result)) {
    return result === Infinity || result === -Infinity
      ? ERROR_MESSAGES.DIVISION_BY_ZERO
      : ERROR_MESSAGES.INVALID_EXPRESSION;
  }

  if (Math.abs(result) < 1e-10) return "0";

  if (Math.abs(result) >= 1e17 || (Math.abs(result) < 1e-6 && result !== 0)) {
    return result.toExponential(6);
  }

  if (Math.abs(result - Math.round(result)) < 1e-10) {
    return Math.round(result).toString();
  }

  return parseFloat(result.toFixed(6)).toString().replace(/\.?0+$/, '');
};
