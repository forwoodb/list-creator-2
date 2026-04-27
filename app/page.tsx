import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  console.log(cookieStore);

  return (
    <>
      <main>
        <h1>Home Page</h1>
      </main>
    </>
  );
}
