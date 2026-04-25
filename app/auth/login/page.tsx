import AuthForm from "@/app/components/AuthForm";
import { auth } from "@/app/lib/auth";

const LoginPage = () => {
  const verifyUser = async (formData: FormData) => {
    "use server";

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(username, email, password);
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
