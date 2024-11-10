import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatus } from '../store/actions/statusActions';

function StatusComponent() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.status);

  useEffect(() => {
    dispatch(fetchStatus());
  }, [dispatch]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!data) return null;

  return (
    <div>
      {/* 데이터 표시 로직 */}
    </div>
  );
}

export default StatusComponent; 