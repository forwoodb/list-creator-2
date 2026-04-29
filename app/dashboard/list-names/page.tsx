import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ListName from "@/app/models/ListName";
import { connectDB } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import AppInterface from "@/app/components/AppInterface";

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
  const listNames = await ListName.find({ userId });

  const createListName = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") as string;
    const newListName = new ListName({ name, userId });
    await newListName.save();

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
      />
    </>
  );
};

export default ListNamesPage;
