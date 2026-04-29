import AuthForm from "@/app/components/AuthForm";
import { connectDB } from "@/app/lib/db";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

const RegisterPage = () => {
  connectDB();

  const signupEmailAction = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log(name);

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    redirect("/dashboard/list-names");
  };

  const signInGoogleAction = async () => {
    "use server";

    connectDB();

    console.log("google");

    const res = await auth.api.signInSocial({
      // await auth.api.signInSocial({
      body: {
        provider: "google",
        callbackURL: "/dashboard/list-names",
      },
    });

    // 2. data.url is the generated Google Auth URL
    if (res?.url) {
      redirect(res.url); // Use Next.js redirect here!
    } else {
      console.error("No redirect URL returned from Better Auth");
    }
  };

  return (
    <>
      <main>
        {/* <div className="mx-auto border border-black"> */}
        <AuthForm
          mode={`register`}
          emailAction={signupEmailAction}
          googleAction={signInGoogleAction}
        />
      </main>
    </>
  );
};

export default RegisterPage;
