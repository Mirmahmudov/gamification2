const API_BASE_URL = "https://codialcoin.pythonanywhere.com";

export const getApiBaseUrl = () => API_BASE_URL;

/**
 * API error formatter
 */
const formatApiError = (data, fallbackMessage) => {
  if (!data) return fallbackMessage;
  if (typeof data === "string") return data;
  if (data?.detail) return data.detail;
  if (data?.message) return data.message;

  if (typeof data === "object") {
    const parts = [];
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        parts.push(`${key}: ${value.join(" ")}`);
      } else if (typeof value === "string") {
        parts.push(`${key}: ${value}`);
      }
    }
    if (parts.length) return parts.join(" | ");
  }

  return fallbackMessage;
};

/**
 * Login
 */
export const loginRequest = async ({ username, password }) => {
  const response = await fetch(`${API_BASE_URL}/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.detail || "Login yoki parol noto'g'ri. Qayta urinib ko'ring."
    );
  }

  return data;
};

/**
 * Refresh token
 */
export const refreshAccessTokenRequest = async (refreshToken) => {
  const response = await fetch(`${API_BASE_URL}/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.detail || "Sessiya tugadi. Qayta login qiling."
    );
  }

  return data;
};

/**
 * Universal API fetch
 */
export const apiFetch = async (
  path,
  options = {},
  getAccessToken,
  getRefreshToken,
  setAccessToken
) => {
  const url = `${API_BASE_URL}${path}`;

  const doFetch = async (token) => {
    const headers = {
      ...(options.headers || {}),
    };

    if (!(options.body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(url, {
      ...options,
      headers,
    });
  };

  let response = await doFetch(getAccessToken?.());

  if (response.status !== 401) {
    return response;
  }

  const refreshToken = getRefreshToken?.();
  if (!refreshToken) return response;

  try {
    const refreshData = await refreshAccessTokenRequest(refreshToken);
    setAccessToken(refreshData.access);

    response = await doFetch(refreshData.access);
    return response;
  } catch {
    return response;
  }
};

/**
 * Get current user
 */
export const getMeRequest = async (
  getAccessToken,
  getRefreshToken,
  setAccessToken
) => {
  const response = await apiFetch(
    "/get/me/",
    { method: "GET" },
    getAccessToken,
    getRefreshToken,
    setAccessToken
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.detail || "User ma'lumotlarini olishda xatolik."
    );
  }

  return data;
};

/**
 * Books list
 */
export const getBooksRequest = async (
  getAccessToken,
  getRefreshToken,
  setAccessToken
) => {
  const response = await apiFetch(
    "/books/",
    { method: "GET" },
    getAccessToken,
    getRefreshToken,
    setAccessToken
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.detail || "Kitoblarni olishda xatolik."
    );
  }

  return data;
};

/**
 * Create book
 */
export const createBookRequest = async (
  payload,
  getAccessToken,
  getRefreshToken,
  setAccessToken
) => {
  const response = await apiFetch(
    "/books/",
    {
      method: "POST",
      body: payload instanceof FormData ? payload : JSON.stringify(payload),
    },
    getAccessToken,
    getRefreshToken,
    setAccessToken
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      formatApiError(data, "Kitob qo'shishda xatolik")
    );
  }

  return data;
};

/**
 * Update book
 */
export const updateBookRequest = async (
  id,
  payload,
  getAccessToken,
  getRefreshToken,
  setAccessToken
) => {
  const response = await apiFetch(
    `/books/${id}/`,
    {
      method: "PATCH",
      body: payload instanceof FormData ? payload : JSON.stringify(payload),
    },
    getAccessToken,
    getRefreshToken,
    setAccessToken
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      formatApiError(data, "Kitobni yangilashda xatolik")
    );
  }

  return data;
};

/**
 * Delete book
 */
export const deleteBookRequest = async (
  id,
  getAccessToken,
  getRefreshToken,
  setAccessToken
) => {
  const response = await apiFetch(
    `/books/${id}/`,
    { method: "DELETE" },
    getAccessToken,
    getRefreshToken,
    setAccessToken
  );

  if (!response.ok) {
    throw new Error("Kitobni o'chirishda xatolik");
  }

  return true;
};

/**
 * News list
 */
export const getNewsRequest = async (
  getAccessToken,
  getRefreshToken,
  setAccessToken
) => {
  const response = await apiFetch(
    "/news/",
    { method: "GET" },
    getAccessToken,
    getRefreshToken,
    setAccessToken
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.detail || "Yangiliklarni olishda xatolik"
    );
  }

  return data;
};

/**
 * Create news
 */
export const createNewsRequest = async (
  payload,
  getAccessToken,
  getRefreshToken,
  setAccessToken
) => {
  const response = await apiFetch(
    "/news/add/",
    {
      method: "POST",
      body: payload instanceof FormData ? payload : JSON.stringify(payload),
    },
    getAccessToken,
    getRefreshToken,
    setAccessToken
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      formatApiError(data, "Yangilik qo'shishda xatolik")
    );
  }

  return data;
};

/**
 * Update news
 */
export const updateNewsRequest = async (
  id,
  payload,
  getAccessToken,
  getRefreshToken,
  setAccessToken
) => {
  const response = await apiFetch(
    `/news/${id}/`,
    {
      method: "PATCH",
      body: payload instanceof FormData ? payload : JSON.stringify(payload),
    },
    getAccessToken,
    getRefreshToken,
    setAccessToken
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      formatApiError(data, "Yangilikni yangilashda xatolik")
    );
  }

  return data;
};

/**
 * Delete news
 */
export const deleteNewsRequest = async (
  id,
  getAccessToken,
  getRefreshToken,
  setAccessToken
) => {
  const response = await apiFetch(
    `/news/${id}/`,
    { method: "DELETE" },
    getAccessToken,
    getRefreshToken,
    setAccessToken
  );

  if (!response.ok) {
    throw new Error("Yangilikni o'chirishda xatolik");
  }

  return true;
};

/**
 * Get student profile by ID
 */
export const getStudentProfileRequest = async (
  id,
  getAccessToken,
  getRefreshToken,
  setAccessToken
) => {
  const response = await apiFetch(
    `/students/${id}/`,
    { method: "GET" },
    getAccessToken,
    getRefreshToken,
    setAccessToken
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.detail || "Student ma'lumotlarini olishda xatolik"
    );
  }

  return data;
};

/**
 * Update student profile
 */
export const updateStudentProfileRequest = async (
  id,
  payload,
  getAccessToken,
  getRefreshToken,
  setAccessToken
) => {
  const response = await apiFetch(
    `/students/${id}/`,
    {
      method: "PATCH",
      body: payload instanceof FormData ? payload : JSON.stringify(payload),
    },
    getAccessToken,
    getRefreshToken,
    setAccessToken
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      formatApiError(data, "Profilni yangilashda xatolik")
    );
  }

  return data;
};
