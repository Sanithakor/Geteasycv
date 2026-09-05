/**
 * /signup — redirect to home and open the auth modal on the Sign Up tab.
 * The modal is the canonical signup UI; this page exists only as a fallback URL.
 */
import { redirect } from 'next/navigation';

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const resolved = await searchParams;
  const callbackUrl = resolved?.callbackUrl ?? '';
  const dest = callbackUrl
    ? `/?openAuth=signup&callbackUrl=${encodeURIComponent(callbackUrl)}`
    : '/?openAuth=signup';
  redirect(dest);
}
