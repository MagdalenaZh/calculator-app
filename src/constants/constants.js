export const MAX_INPUT_LENGTH = 18;

export const PATTERNS = {
  NUMERIC_OR_DECIMAL: /^[0-9.]$/,
  OPERATORS: /[+\-×÷%√]/,
  FUNCTION_NAMES: /^(sin|cos|tan|log)$/,
  TAN_90_DEGREES: /tan\(\s*(-?90|270|450|630|-270|-450|-630)\s*\)/,
  SQRT_FUNCTION: /√(-?\d+(\.\d+)?)/g,
  PERCENTAGE: /(\d+(\.\d+)?)%/g,
  MISSING_PARENTHESES: /(sin|cos|tan|log)\s*([0-9.-]+)/g
};

export const KEY_MAP = {
  "0": "0", "1": "1", "2": "2", "3": "3",
  "4": "4", "5": "5", "6": "6", "7": "7",
  "8": "8", "9": "9",
  ".": ".", 
  "+": "+", "-": "-", "*": "×", "/": "÷",
  "%": "%", 
  "=": "=",
  "delete": "C/CE",
  "m": "MRC", "p": "M+", "n": "M-", "g": "GT"
};

export const SPECIAL_KEYS = {
  "Enter": "=",
  "Escape": "C/CE",
  "Backspace": "←"
};

export const SOUND_CATEGORIES = {
  MEMORY_BUTTONS: ["MRC", "M+", "M-", "GT", "C/CE"],
  STANDARD_BUTTONS: ["←", "+", "-", "÷", "×", "=", "%", "√", ".", ...Array(10).keys().map(String)]
};

export const ERROR_MESSAGES = {
  INVALID_EXPRESSION: "Error: Invalid expression",
  DIVISION_BY_ZERO: "Error: Division by zero",
  MAX_LENGTH: "Error: Maximum input length reached",
  TAN_90: "Error: Undefined",
  CONSECUTIVE_OPERATORS: "Error: Cannot add consecutive operators"
};