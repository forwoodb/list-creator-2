import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ListName from "@/app/models/ListName";
import { connectDB } from "@/app/lib/db";
import Link from "next/link";
import { revalidatePath } from "next/cache";

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

  // console.log(session);

  return (
    <>
      <div className="app-container min-w-120 mx-auto p-4 rounded bg-gray-400 shadow-md shadow-gray-800">
        <div className="text-wrapper flex justify-between py-1">
          <h2 className="text-center text-6xl text-gray-200">List Names</h2>
        </div>
        <p>Hello {session.user.name} </p>
        <form
          action={createListName}
          className="mx-auto mb-5 p-2.5 bg-blue-500 border"
        >
          <label htmlFor="list-name">List Name</label>
          <input
            type="text"
            id="list-name"
            name="list-name"
            placeholder="List Name"
            className="input m-2"
          />
          <button className="btn btn-neutral ">Create List Name</button>
        </form>
        <div className="list-container">
          {listNames.map((list) => (
            <div
              key={list._id}
              className="flex justify-between align-middle max-w-lg p-2.5 mx-auto my-2.5 bg-gray-200 rounded"
            >
              {list.listName}
              <div className="buttons">
                <Link
                  href={`/listItems/${list._id}`}
                  className="inline-flex justify-center 
                                        align-middle 
                                        px-2.5 
                                        mx-1
                                        cursor-pointer 
                                        rounded"
                >
                  View
                </Link>
                <button className="btn">Edit</button>
                <button className="btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListNamesPage;
