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
        <div className="alt-wrapper flex flex-col justify-between items-center w-xs h-30 mx-auto">
          <p>Or</p>
          <form action={googleAction}>
            <button class="btn btn-outline btn-neutral">
              <svg
                xmlns="http://w3.org"
                viewBox="0 0 48 48"
                width="24px"
                height="24px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
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
      </div>
    </>
  );
};

export default AuthForm;
