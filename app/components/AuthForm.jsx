import Link from "next/link";
const AuthForm = ({ mode, userAction }) => {
  return (
    <>
      <div className="form-wrapper flex flex-col items-center w-xs mx-auto">
        <form action={userAction}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Register</legend>

            <label className="label">Username</label>
            <input
              type="username"
              name="username"
              placeholder="Username"
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
