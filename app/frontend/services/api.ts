export const api = async (url: string, method: string, data: FormData) => {
  // const csrfToken = getCsrfToken();
  // if (!csrfToken) {
  //   console.error('CSRF token is missing!');
  //   return;
  // }

  const headers = {
    // 'X-CSRF-TOKEN': csrfToken,
  };

  const options: RequestInit = {
    method: method,
    headers: headers,
    credentials: 'include',
    body: data,  // Use FormData here
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API Request Error:', error);
  }
};