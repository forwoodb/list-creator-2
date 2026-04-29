import Link from "next/link";
const AuthForm = ({ mode, emailAction, googleAction }) => {
  return (
    <>
      <div className="form-wrapper flex flex-col items-center w-xs mx-auto">
        <form action={emailAction}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">
              {mode === "register" ? "Register" : "Log In"}
            </legend>

            <label className="label">Name</label>
            <input
              type="name"
              name="name"
              placeholder="Name"
              className="input"
            />

            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input"
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input"
            />

            <button className="btn btn-neutral mt-4">
              {mode === "register" ? `Register` : "Log In"}
            </button>
          </fieldset>
        </form>
        <p>Or</p>
        <form action={googleAction}>
          <button type="submit">
            {mode === "register" ? "Sign Up" : "Log In"} With Google
          </button>
        </form>
        {/* <Link href={`/api/auth/social/google`}>
          {mode === "register" ? "Sign Up" : "Log In"} With Google
        </Link> */}
        {mode === "register" ? (
          <p>
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-bold border-b border-primary"
            >
              Log In
            </Link>
          </p>
        ) : (
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-primary font-bold border-b border-primary"
            >
              Register
            </Link>
          </p>
        )}
      </div>
    </>
  );
};

export default AuthForm;
