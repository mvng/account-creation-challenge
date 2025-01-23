const hasLetterRegex = /[A-Za-z]/; // At least one letter
const hasNumberRegex = /\d/; // At least one numberconst

const MIN_PASSWORD_LENGTH = 20;
const MAX_INPUT_LENGTH = 50;

export const validatePasswordMessage = (password: string): string  => {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password should be at least ${MIN_PASSWORD_LENGTH} characters`;
  }

  if (password.length > MAX_INPUT_LENGTH) {
    return `Password should be less than ${MAX_INPUT_LENGTH} characters`;
  }

  // Better messaging when deciding on password
  // can scale this better for future requirements like symbols or other future patterns
  if (!hasLetterRegex.test(password) && !hasNumberRegex.test(password)) {
    return 'Password should have at least one letter and one number';
  } else if (!hasLetterRegex.test(password)) {
    return 'Password should have at least one letter';
  } else if (!hasNumberRegex.test(password)) {
    return 'Password should have at least one number';
  }

  return ''
};
