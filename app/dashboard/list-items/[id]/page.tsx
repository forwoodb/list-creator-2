import AppInterface from "@/app/components/AppInterface";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ListItem from "@/app/models/ListItem";
import { connectDB } from "@/app/lib/db";
import { revalidatePath } from "next/cache";

const ListItemsPage = async ({ params }) => {
  connectDB();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const listItems = await ListItem.find({});

  const createListItem = async (formData: FormData) => {
    "use server";
    const { id } = await params;

    const listItem = formData.get("list-name") as string;

    const newListItem = new ListItem({ listId: id, listItem });
    await newListItem.save();

    revalidatePath(`/dashboard/list-items/${id}`); // Revalidate the path to update the list items after creation
  };

  return (
    <>
      <AppInterface
        mode={"list-items"}
        session={session}
        items={listItems}
        create={createListItem}
      />
    </>
  );
};

export default ListItemsPage;
