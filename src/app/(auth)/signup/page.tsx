import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <div className="mb-8 text-left">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Create Account
          </h1>

          <p className="mt-2 text-slate-500">
            Join your personal book manager.
          </p>
        </div>

        <SignupForm />
      </div>
    </div>
  );
}