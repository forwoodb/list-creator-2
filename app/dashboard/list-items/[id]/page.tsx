import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connectDB } from "@/app/lib/db";
import { revalidatePath } from "next/cache";

import AppInterface from "@/app/components/AppInterface";
import ListItem from "@/app/models/ListItem";
import ListName from "@/app/models/ListName";

interface PageProps {
  params: Promise<{ id: string }>; // Replace with your actual structure
}

const ListItemsPage = async ({ params }: PageProps) => {
  // Connect to the database
  await connectDB();

  // Get session info
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  // Get list ID
  const paramsData = await params;
  const listId = paramsData.id;

  // Get list name
  const listName = await ListName.findById(listId).lean();

  // Get list items
  const data = await ListItem.find({ listId });
  const listItems = JSON.parse(JSON.stringify(data));

  // Create a new list item
  const createListItem = async (formData: FormData) => {
    "use server";

    await connectDB();

    const name = formData.get("name") as string;
    const newListItem = new ListItem({ listId, name });
    await newListItem.save();

    revalidatePath(`/dashboard/list-items/${listId}`); // Revalidate the path to update the list items after creation
  };

  const deleteListItem = async (formData: FormData) => {
    "use server";

    await connectDB();

    const id = formData.get("id") as string;

    await ListItem.findByIdAndDelete(id);

    revalidatePath(`/dashboard/list-items/${listId}`); // Revalidate the path to update the list items after deletion
  };

  const updateListItem = async (formData: FormData) => {
    "use server";

    await connectDB();

    const id = formData.get("id");
    const name = formData.get("name");

    await ListItem.findByIdAndUpdate(id, { name });

    revalidatePath(`/dashboard/list-items/${listId}`);

    console.log(id, name);
  };
  return (
    <>
      <AppInterface
        mode={"list-items"}
        session={session}
        listName={listName.name}
        items={listItems}
        create={createListItem}
        // create={createListItem.bind(null, listId)}
        deleteName={deleteListItem}
        update={updateListItem}
      />
    </>
  );
};

export default ListItemsPage;
