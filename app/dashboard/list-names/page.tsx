import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const ListNamesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  console.log(session);

  return (
    <>
      <h1>List Names</h1>
      <p>Hello {session.user.name} </p>
    </>
  );
};

export default ListNamesPage;
