import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary:
            'bg-lime-500 hover:bg-slate-400 text-sm normal-case',
        },
      }}
    />
  );
}
