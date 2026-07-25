import Navigation from "@/components/Navigation";
import Link from "next/link";

export const metadata = {
  title: "Refund Policy — GetEasyCV",
  description: "Refund Policy for GetEasyCV.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 flex justify-center px-4 py-20">
        <div className="max-w-3xl w-full">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Refund Policy</h1>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-slate-700 space-y-6">
            <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Subscriptions</h2>
              <p>We offer a 7-day money-back guarantee on all our premium subscription plans. If you are not satisfied with your purchase within the first 7 days, you can request a full refund.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">2. How to Request a Refund</h2>
              <p>To request a refund, please contact our support team at <Link href="/contact" className="text-indigo-600 hover:underline">support@geteasycv.com</Link> with your account email address and the reason for the refund request.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Processing Time</h2>
              <p>Approved refunds are processed within 5-10 business days and will be credited back to your original payment method.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Exceptions</h2>
              <p>Refunds will not be provided for accounts that have violated our Terms of Service.</p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
