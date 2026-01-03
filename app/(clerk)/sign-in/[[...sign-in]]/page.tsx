import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-amber-50 to-amber-100">
            <SignIn />
        </main>
    );
};

export default SignInPage;
