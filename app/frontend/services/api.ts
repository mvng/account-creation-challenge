// Generic api function for preseting headers and csrf tokens.

export const api = async (url: string, method: string, data?: FormData) => {
  // FormData submissions auto-include csrfToken
  const options: RequestInit = {
    method: method,
    credentials: 'include',
    body: data, 
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Request Error:', error);
  }
};