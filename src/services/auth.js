export const getProfile = async (token = '') => {
  try {
    const res = await fetch('/auth/me?token=' + token);
    const data = await res.json();
    return data.profile;
  } catch (err) {
    return false;
  }
};

export const auth = async ({ email = '', pass = '' } = {}) => {
  const config = {
    method: 'POST',
    body: JSON.stringify({ email, password: pass }),
    headers: { 'Content-Type': 'application/json' },
  };
  try {
    const res = await fetch('/auth/token', config);
    const data = await res.json();
    if (data.statusCode === 403) {
      // unauthorized
      return false;
    }
    localStorage.setItem('token', data.token);
    return data.token;
  } catch (error) {
    // handle the error
    return false;
  }
};
