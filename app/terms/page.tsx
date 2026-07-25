import Navigation from "@/components/Navigation";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service — GetEasyCV",
  description: "Terms of Service for GetEasyCV.",
};

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 flex justify-center px-4 py-20">
        <div className="max-w-3xl w-full">
          <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-slate-700 space-y-6">
            <p className="text-sm text-slate-500">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using GetEasyCV, you accept and agree to be bound by the terms and provisions of this agreement.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">2. User Accounts</h2>
              <p>To use certain features of the service, you must register for an account. You agree to provide accurate information and keep it updated. You are responsible for maintaining the confidentiality of your account and password.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">3. User Content</h2>
              <p>You retain all rights to the information and content you provide to create your resumes. By using our service, you grant us a license to process and format this content for the sole purpose of providing the service to you.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Limitation of Liability</h2>
              <p>GetEasyCV shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.</p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
