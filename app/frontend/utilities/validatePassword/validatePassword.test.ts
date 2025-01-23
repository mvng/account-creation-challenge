import { validatePasswordMessage } from './';

describe('validatePasswordMessage', () => {
  const MIN_PASSWORD_LENGTH = 20;
  const MAX_INPUT_LENGTH = 50;

  it('should return a message when the password is shorter than the minimum length', () => {
    const shortPassword = '12345';
    const result = validatePasswordMessage(shortPassword);
    expect(result).toBe(`Password should be at least ${MIN_PASSWORD_LENGTH} characters`);
  });

  it('should return a message when the password exceeds the maximum length', () => {
    const longPassword = 'a'.repeat(MAX_INPUT_LENGTH + 1);
    const result = validatePasswordMessage(longPassword);
    expect(result).toBe(`Password should be less than ${MAX_INPUT_LENGTH} characters`);
  });

  it('should return a message when the password lacks both letters and numbers', () => {
    const invalidPassword = '@@@@-@@@@-@@@@-@@@@-';
    const result = validatePasswordMessage(invalidPassword);
    expect(result).toBe('Password should have at least one letter and one number');
  });

  it('should return a message when the password lacks letters but has numbers', () => {
    const invalidPassword = '12345678901234567890';
    const result = validatePasswordMessage(invalidPassword);
    expect(result).toBe('Password should have at least one letter');
  });

  it('should return a message when the password lacks numbers but has letters', () => {
    const invalidPassword = 'abcdefghijklmnopqrst';
    const result = validatePasswordMessage(invalidPassword);
    expect(result).toBe('Password should have at least one number');
  });

  it('should return an empty string for a valid password with letters, numbers, and correct length', () => {
    const validPassword = 'abc12345678901234567';
    const result = validatePasswordMessage(validPassword);
    expect(result).toBe('');
  });

  it('should handle edge case: exactly the minimum length with valid characters', () => {
    const validPassword = 'abc1234567890123456x'; // 20 characters
    const result = validatePasswordMessage(validPassword);
    expect(result).toBe('');
  });

  it('should handle edge case: exactly the maximum length with valid characters', () => {
    const validPassword = 'abc123'.repeat(7) + 'abc'; // 50 characters
    const result = validatePasswordMessage(validPassword);
    expect(result).toBe('');
  });

  it('should return an appropriate message for an empty password', () => {
    const emptyPassword = '';
    const result = validatePasswordMessage(emptyPassword);
    expect(result).toBe(`Password should be at least ${MIN_PASSWORD_LENGTH} characters`);
  });
});