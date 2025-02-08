import { SignInButton } from "@clerk/nextjs";
import "./sign-in.css";

export default function SignInPage() {
  return (
    <>
      <SignInButton data-type="sign-in" forceRedirectUrl={"/drive"} />
      <footer className="mt-16 text-sm text-neutral-500">
        © {new Date().getFullYear()} File Manager. Some rights reserved.
      </footer>
    </>
  );
}
