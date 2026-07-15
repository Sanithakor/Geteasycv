import { redirect } from 'next/navigation';

export default function Builder() {
  redirect('/editor');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to editor...</p>
      </div>
    </div>
  );
}