import AuthForm from "@/app/components/AuthForm";

const RegisterPage = () => {
  return (
    <>
      <main>
        {/* <div className="mx-auto border border-black"> */}
        <AuthForm mode={`register`} />
        {/* </div> */}
      </main>
    </>
  );
};

export default RegisterPage;
