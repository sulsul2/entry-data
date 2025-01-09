"use client"
import React from 'react';
import Login from './(auth)/login/page';

export default function Home() {
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('error', function (e) {
        console.error('Global Error:', e.error);
      });
    }
  }, []);
  return <Login/>;
}