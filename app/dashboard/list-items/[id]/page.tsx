import AppInterface from "@/app/components/AppInterface";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const ListItemsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const listItems = await ListItems.find({});

  return (
    <>
      <AppInterface mode={"list-items"} session={session} items={listItems} />
    </>
  );
};

export default ListItemsPage;
