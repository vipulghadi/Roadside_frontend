let API_BASE_URL;
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzMzI3NzM0LCJpYXQiOjE3MzA3MzU3MzQsImp0aSI6ImMwNDgxMjU2MTRlNzRiZWJiNzg1MDRiZGMwZTVlNGQxIiwidXNlcl9pZCI6IjliYWFmNDc5LTNhYTYtNDY1YS1hNTk3LTQ0NTE3ZmE2ZjJkNyJ9.rKJpqY1z2ygmynQgfFDaBKxbxVc_eU73culnVHXaRbg';

// Determine the environment and set the base URL
if (import.meta.env.VITE_APP_ENV === 'dev') {
    API_BASE_URL = `http://${import.meta.env.VITE_APP_BACKEND_DEV_URL}/api/v1`;
} else {
    API_BASE_URL = `${import.meta.env.VITE_APP_BACKEND_PROD_URL}/api/v1`;
}

export { API_BASE_URL, ACCESS_TOKEN };
