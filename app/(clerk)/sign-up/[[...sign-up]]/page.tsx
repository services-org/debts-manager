import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-amber-50 to-amber-100">
            <SignUp />
        </main>
    );
};

export default SignUpPage;
