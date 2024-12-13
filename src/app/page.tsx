'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCustomization } from '@/store/slices/customizationSlice';
import { useRouter } from 'next/navigation';
import { get } from '@/services/api';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get('customization/current');
        const data = response.data.data;

        dispatch(
          setCustomization({
            color: data.active_color,
            logo: data.logo,
            favicon: data.favicon,
          })
        );

        router.push('/login');
      } catch (error) {
        console.error('Error fetching customization data:', error);
      }
    };

    fetchData();
  }, [dispatch, router]);

  return <div>Loading...</div>;
}
