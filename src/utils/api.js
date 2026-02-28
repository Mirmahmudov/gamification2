const API_BASE_URL = 'https://codialcoin.pythonanywhere.com';

export const getApiBaseUrl = () => API_BASE_URL;

/**
 * Login endpoint – sends username & password and returns tokens + role.
 */
export const loginRequest = async ({ username, password }) => {
  const response = await fetch(`${API_BASE_URL}/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      data?.detail ||
      data?.message ||
      "Login yoki parol noto'g'ri. Iltimos, qayta urinib ko'ring.";
    throw new Error(message);
  }

  return data;
};

/**
 * Refresh access token using refresh token.
 */
export const refreshAccessTokenRequest = async (refreshToken) => {
  const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  const data = await response.json();

  if (!response.ok) {
    const message =
      data?.detail ||
      data?.message ||
      'Sessiya muddati tugadi. Iltimos, qayta tizimga kiring.';
    throw new Error(message);
  }

  return data;
};

/**
 * Helper fetch – avtomatik ravishda access token qo'shadi va 401 bo'lsa refresh qiladi.
 * Hozircha kelajakdagi API lar uchun, login sahifasida to'g'ridan-to'g'ri loginRequest ishlatiladi.
 */
export const apiFetch = async (path, options = {}, getAccessToken, getRefreshToken, setAccessToken) => {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;

  const doFetch = async (token) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, {
      ...options,
      headers,
    });
  };

  let accessToken = getAccessToken?.();
  let response = await doFetch(accessToken);

  if (response.status !== 401 || !getRefreshToken || !setAccessToken) {
    return response;
  }

  // Try to refresh access token
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return response;
  }

  try {
    const refreshData = await refreshAccessTokenRequest(refreshToken);
    const newAccess = refreshData.access;
    setAccessToken(newAccess);
    response = await doFetch(newAccess);
    return response;
  } catch {
    // Agar refresh ham ishlamasa, eski javobni qaytaramiz
    return response;
  }
};

