import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getMeRequest } from '../utils/api';
import { getAccessToken, getRefreshToken, setAccessToken } from '../utils/auth';

const StudentDataContext = createContext(null);

const DAY_NAMES = {
  monday: 'Dush',
  tuesday: 'Sesh',
  wednesday: 'Chor',
  thursday: 'Pay',
  friday: 'Juma',
  saturday: 'Shan',
  sunday: 'Yak',
};

export const formatLessonDays = (days = []) => {
  if (!days?.length) return '—';
  return days
    .map((d) => DAY_NAMES[d?.toLowerCase()] || d)
    .join('–');
};

export const StudentDataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getMeRequest(getAccessToken, getRefreshToken, setAccessToken);
      setData(res);
      return res;
    } catch (err) {
      setError(err.message);
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const value = {
    data,
    loading,
    error,
    refetch,
    refreshData: refetch,
    user: data?.user ?? null,
    student: data?.student ?? null,
    studentId: data?.student?.id ?? null,
    mentor: data?.mentor ?? null,
    fullName: data?.student
      ? [data.student.first_name, data.student.last_name].filter(Boolean).join(' ') || data.user?.username
      : data?.user?.username ?? '',
    point: data?.student?.point ?? 0,
    groups: data?.student?.groups ?? [],
    bio: data?.student?.bio ?? '',
    image: data?.student?.image ?? null,
    createdAt: data?.student?.created_at ?? null,
    birthDate: data?.student?.birth_date ?? null,
  };

  return (
    <StudentDataContext.Provider value={value}>
      {children}
    </StudentDataContext.Provider>
  );
};

export const useStudentData = () => {
  const ctx = useContext(StudentDataContext);
  if (!ctx) {
    throw new Error('useStudentData must be used within StudentDataProvider');
  }
  return ctx;
};
