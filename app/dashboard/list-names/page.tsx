import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ListName from "@/app/models/ListName";
import { connectDB } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import AppInterface from "@/app/components/AppInterface";
import ListItem from "@/app/models/ListItem";

const ListNamesPage = async () => {
  // Connect to the database
  connectDB();

  // Get session info
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  // Get user ID from session
  const userId = session.user.id;

  // Get list names for the user
  const data = await ListName.find({ userId }).lean();
  const listNames = JSON.parse(JSON.stringify(data));

  const createListName = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    const newListName = new ListName({ name, userId });
    await newListName.save();

    revalidatePath("/dashboard/list-names");
  };

  const deleteListName = async (formData: FormData) => {
    "use server";
    const id = formData.get("id") as string;
    // console.log(id);

    await ListName.findByIdAndDelete(id);
    await ListItem.deleteMany({ listId: id }); // Delete associated list items

    revalidatePath("/dashboard/list-names");
  };

  const updateListName = async (formData: FormData) => {
    "use server";

    const id = formData.get("id");
    const name = formData.get("name");

    const newListName = await ListName.findByIdAndUpdate(id, { name });

    console.log(newListName);
    revalidatePath("/dashboard/list-names");
  };

  // console.log(session);

  return (
    <>
      <AppInterface
        mode={`list-names`}
        session={session}
        listName={`List Names`}
        items={listNames}
        create={createListName}
        deleteName={deleteListName}
        update={updateListName}
      />
    </>
  );
};

export default ListNamesPage;
