import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ListName from "@/app/models/ListName";
import { connectDB } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import AppInterface from "@/app/components/AppInterface";

const ListNamesPage = async () => {
  connectDB();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const listNames = await ListName.find({});

  const createListName = async (formData: FormData) => {
    "use server";
    const listName = formData.get("list-name") as string;
    const newListName = new ListName({ listName });
    await newListName.save();
    revalidatePath("/dashboard/list-names");
  };

  console.log(session);

  return (
    <>
      <AppInterface
        mode={`list-names`}
        session={session}
        items={listNames}
        create={createListName}
      />
    </>
  );
};

export default ListNamesPage;
