import { isExpired, decodeToken } from "react-jwt";

export const isValidEmail = (email: string) => {
  // Regex pattern for validating email address
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const isValidBangladeshiMobileNumber = (number: string) => {
  // Regex pattern for validating Bangladeshi mobile number
  const mobilePattern = /^(?:\+?88)?01[3-9]\d{8}$/;
  return mobilePattern.test(number);
};

export const decodeTokenFunction = (authToken: string) => {
  return isExpired(authToken);
};
