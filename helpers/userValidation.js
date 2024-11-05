// Function to validate username
export function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]+$/; // Allow alphanumeric characters and underscores
  return username && usernameRegex.test(username);
}

// Function to validate email
export function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return email && emailRegex.test(email);
}