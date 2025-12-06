/**
 * 이메일 형식 검증
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 비밀번호 강도 검증
 * 8자 이상, 대문자, 소문자, 숫자, 특수문자 포함
 */
export const isValidPassword = (password: string): boolean => {
  if (password.length < 8) return false;

  // 대문자 포함
  if (!/[A-Z]/.test(password)) return false;

  // 소문자 포함
  if (!/[a-z]/.test(password)) return false;

  // 숫자 포함
  if (!/[0-9]/.test(password)) return false;

  // 특수문자 포함
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return false;

  return true;
};

/**
 * 비밀번호 일치 검증
 */
export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

/**
 * 유효성 검사 에러 메시지
 */
export const ValidationMessages = {
  EMAIL_REQUIRED: "Please enter your email address",
  EMAIL_INVALID: "Please enter a valid email address",
  EMAIL_CHECK_REQUIRED: "Please check email availability",
  PASSWORD_REQUIRED: "Please enter your password",
  PASSWORD_TOO_SHORT: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
  PASSWORD_MISMATCH: "Passwords do not match",
  TERMS_REQUIRED: "Please agree to the required terms",
  NAME_REQUIRED: "Please enter your name",
} as const;
