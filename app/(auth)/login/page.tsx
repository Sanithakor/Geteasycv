/**
 * /login — redirect to home and open the auth modal.
 * The modal is the canonical login UI; this page exists only as a fallback URL.
 */
import { redirect } from 'next/navigation';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const resolved = await searchParams;
  const callbackUrl = resolved?.callbackUrl ?? '';
  const dest = callbackUrl
    ? `/?openAuth=login&callbackUrl=${encodeURIComponent(callbackUrl)}`
    : '/?openAuth=login';
  redirect(dest);
}
