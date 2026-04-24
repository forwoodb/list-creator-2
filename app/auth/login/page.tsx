import AuthForm from "@/app/components/AuthForm";

const LoginPage = () => {
  return (
    <>
      <main>
        <AuthForm mode={`login`} />
      </main>
    </>
  );
};

export default LoginPage;
