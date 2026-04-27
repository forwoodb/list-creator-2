import { cookies } from "next/headers";

const ListItemsPage = async () => {
  const cookieStore = await cookies();
  // const cookie = cookieStore.get("token");
  console.log(cookieStore);

  return (
    <>
      <h1>List Items</h1>
    </>
  );
};

export default ListItemsPage;
