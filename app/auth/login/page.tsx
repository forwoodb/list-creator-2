import AuthForm from "@/app/components/AuthForm";
import { auth } from "@/app/lib/auth";
import { connectDB } from "@/app/lib/db";
import { redirect } from "next/navigation";

const LoginPage = () => {
  connectDB();

  const verifyUserEmail = async (formData: FormData) => {
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

  const verifyUserGoogle = async () => {
    "use server";

    const res = await auth.api.signInSocial({
      body: {
        provider: "google",
        callbackURL: `/dashboard/list-names`,
      },
    });

    if (res.url) {
      redirect(res.url);
    }
  };

  return (
    <>
      <main>
        <AuthForm
          mode={`login`}
          emailAction={verifyUserEmail}
          googleAction={verifyUserGoogle}
        />
      </main>
    </>
  );
};

export default LoginPage;
