'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MyResumesRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/admin/resumes');
  }, [router]);
  return null;
}
