import AuthForm from "@/app/components/AuthForm";
import { connectDB } from "@/app/lib/db";

const RegisterPage = () => {
  connectDB();

  const createUser = async (formData: FormData) => {
    "use server";

    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log(username, email, password);
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
