import AuthForm from "@/app/components/AuthForm";
import { connectDB } from "@/app/lib/db";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

const RegisterPage = () => {
  connectDB();

  const createUser = async (formData: FormData) => {
    "use server";

    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const user = await auth.api.signUpEmail({
      body: {
        name: username,
        email,
        password,
      },
    });
    console.log(user);

    redirect("/auth/login");
  };

  return (
    <>
      <main>
        {/* <div className="mx-auto border border-black"> */}
        <AuthForm mode={`register`} userAction={createUser} />
        {/* </div> */}
      </main>
    </>
  );
};

export default RegisterPage;
