// utils/calculator.js - Fixed version with proper tan(90) handling
export const calculate = (expr, angleUnit = 'deg') => {
  if (!expr) return "";

  try {
    // Special case handling for tangent of 90 degrees (and equivalents)
    if (angleUnit === 'deg' && expr.match(/tan\s*\(\s*(?:90|270|450|630|810|990|1170|1350|1530|1710|1890)(?:\.0*)?\s*\)/)) {
      return "Error: Undefined (tan 90°)";
    }
    
    // Step 1: Clean up and normalize the expression
    let processedExpr = expr
      .replace(/\u00F7/g, "/") // division sign
      .replace(/\u00D7/g, "*") // multiplication sign
      .replace(/\u00B7/g, "."); // dot operator
      
    // Step 2: Handle functions without parentheses first (e.g., sin90 -> sin(90))
    processedExpr = processedExpr
      .replace(/(sin|cos|tan|log)\s*([0-9.-]+)/g, "$1($2)");
      
    // Step 3: Process special functions
    processedExpr = processedExpr
      .replace(/√(-?\d+(\.\d+)?)/g, "Math.sqrt($1)") // square root
      .replace(/(\d+(\.\d+)?)%/g, "($1/100)"); // percentage
      
    // Step 4: Replace trig and logarithmic functions with Math equivalents
    processedExpr = processedExpr
      .replace(/sin\(([^)]+)\)/g, angleUnit === 'deg' ?
        "Math.sin(($1) * Math.PI / 180)" : "Math.sin($1)")
      .replace(/cos\(([^)]+)\)/g, angleUnit === 'deg' ?
        "Math.cos(($1) * Math.PI / 180)" : "Math.cos($1)")
      .replace(/tan\(([^)]+)\)/g, angleUnit === 'deg' ?
        "Math.tan(($1) * Math.PI / 180)" : "Math.tan($1)")
      .replace(/log\(([^)]+)\)/g, "Math.log10($1)");
    
    // Evaluate the expression
    const result = Function(`"use strict"; return ${processedExpr}`)();
    
    // Format the result
    if (!Number.isFinite(result)) {
      return result === Infinity || result === -Infinity
        ? "Error: Division by zero"
        : "Error: Invalid result";
    }
    
    if (isNaN(result)) return "Error: Invalid operation";
    
    // Check if the result is extremely large (which might happen with tan near 90°)
    if (Math.abs(result) > 1e15) return "Error: Undefined";
    
    // Format large numbers
    if (Math.abs(result) > 1e9) return result.toExponential(6);
    
    // Handle very small numbers that should be zero (like cos(90) ≈ 0)
    if (Math.abs(result) < 1e-10) return "0";
    
    // Round to 6 decimal places and format
    const rounded = parseFloat(result.toFixed(6));
    return rounded.toString().length > 10
      ? result.toExponential(6)
      : rounded.toString();
  } catch (error) {
    console.error("Calculation error:", error);
    return "Error: Invalid expression";
  }
};