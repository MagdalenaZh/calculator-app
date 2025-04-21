import { PATTERNS, ERROR_MESSAGES } from '../constants/constants';

export const validateInput = (input) => {
  if (!input) return { isValid: false, error: '' };

  // catches tan(90), tan(270), etc. using regex
  if (PATTERNS.TAN_90_DEGREES.test(input)) {
    return { isValid: false, error: ERROR_MESSAGES.TAN_90 };
  }

  // blocks things like just "sin" or "tan" without arguments
  if (PATTERNS.FUNCTION_NAMES.test(input)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_EXPRESSION };
  }

  return { isValid: true, error: '' };
};

// makes sure the combined input stays within max length
export const validateLength = (currentInput, addition = '', maxLength) => {
  const available = maxLength - currentInput.length;
  const added = addition.slice(0, Math.max(0, available)); 

  return {
    result: currentInput + added,
    error: added.length < addition.length ? ERROR_MESSAGES.MAX_LENGTH : ''
  };
};

// checks if a new operator is allowed to be added in context
export const validateOperator = (currentInput, newOperator) => {
  const lastChar = currentInput.slice(-1);
  const isOperator = PATTERNS.OPERATORS.test(newOperator);

  if (
    (currentInput === '' && newOperator === '-') || 
    (newOperator === '-' && PATTERNS.OPERATORS.test(lastChar)) || 
    PATTERNS.FUNCTION_NAMES.test(newOperator) || 
    /(?:sin|cos|tan|log|sqrt)$/.test(currentInput) 
  ) {
    return { isValid: true, error: '' };
  }

  // prevent chaining two operators like ++ or ×÷
  if (PATTERNS.OPERATORS.test(lastChar) && isOperator) {
    return { isValid: false, error: ERROR_MESSAGES.CONSECUTIVE_OPERATORS };
  }

  return { isValid: true, error: '' };
};
