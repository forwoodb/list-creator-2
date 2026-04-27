import AuthForm from "@/app/components/AuthForm";
import { auth } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import { redirect } from "next/navigation";

const LoginPage = () => {
  connectDB();

  const verifyUser = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log(email, password);

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    redirect("/dashboard/list-names");
  };

  return (
    <>
      <main>
        <AuthForm mode={`login`} userAction={verifyUser} />
      </main>
    </>
  );
};

export default LoginPage;
