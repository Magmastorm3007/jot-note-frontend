export async function fetchWithAuth(
    url: string, 
    options: RequestInit = {}
  ) {
    try {
      // Safely retrieve token
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
  
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await fetch(url, {
        ...options,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          ...options.headers
        }
      });
  
      // Explicit check for response
      if (!response) {
        throw new Error('No response received');
      }
  
      // Check response status
      if (!response.ok) {
        const errorBody = await response.text();
        console.error('Error response:', errorBody);
  
        if (response.status === 401) {
          // Clear token and redirect
          document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          window.location.href = '/auth/login';
        }
  
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return response;
  
    } catch (error) {
      console.error('Authentication fetch error:', error);
      throw error;
    }
  }
  