import { useState, useEffect } from 'react';

import { getProfile } from '../services/auth';

export default ({ children }) => {
  const [profile, setprofile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logic = async () => {
      const token = String(localStorage.getItem('token') || '');
      const profile = await getProfile(token);
      setprofile(profile);
      setLoading(false);
    };
    logic();
  }, []);

  if (loading) return children({ loading });
  if (!profile) return children({ failed: true });

  return children({ user: profile, loading });
};
