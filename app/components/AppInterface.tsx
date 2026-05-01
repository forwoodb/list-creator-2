import Link from "next/link";
import ListItem from "./ListItem";

interface Item {
  _id: string;
  name: string;
}

interface Session {
  user: {
    id: string;
    name: string;
    [key: string]: unknown;
  };
}
interface AppInterfaceProps {
  mode: "list-names" | "list-items";
  session: Session;
  listName: string;
  items: Item[];
  create: (formData: FormData) => Promise<void>;
  deleteName: (formData: FormData) => Promise<void>;
  update: (formData: FormData) => Promise<void>;
}

const AppInterface = async ({
  mode,
  session,
  listName = "List Names",
  items,
  create,
  deleteName,
  update,
}: AppInterfaceProps) => {
  // console.log(session);

  return (
    <>
      <div className="app-container min-w-120 mx-auto p-4 rounded bg-gray-400 shadow-md shadow-gray-800">
        <div className="text-wrapper flex justify-between py-1">
          <h2 className="text-center text-6xl text-gray-200">
            {mode === "list-names" ? `List Names` : listName}
          </h2>
        </div>
        <p>Hello {session.user.name} </p>
        <form action={create} className="mx-auto mb-5 p-2.5 bg-blue-500 ">
          <label htmlFor="name">
            {mode === "list-names" ? `List Name` : `List Item`}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder={mode === "list-names" ? `List Name` : `List Item`}
            className="input m-2"
          />
          <button className="btn btn-neutral ">
            Create List {mode == "list-names" ? "Name" : "Item"}
          </button>
        </form>
        <div className="list-container">
          {items.map((item) => (
            // <div
            //   key={item._id}
            //   className="flex justify-between items-center max-w-lg p-2.5 mx-auto my-2.5 bg-gray-200 rounded"
            // >
            //   {item.name}
            //   <div className="buttons flex justify-between items-center">
            //     {mode === "list-names" && (
            //       <Link
            //         href={`/dashboard/list-items/${item._id}`}
            //         className="inline-flex justify-center align-middle px-2.5 mx-1 cursor-pointer rounded"
            //       >
            //         View
            //       </Link>
            //     )}
            //     <button className="btn">Edit</button>
            //     <form action={deleteName}>
            //       <input type="hidden" name="id" value={item._id} />
            //       <button className="btn">Delete</button>
            //     </form>
            //   </div>
            // </div>
            <ListItem
              key={item._id}
              item={item}
              mode={mode}
              deleteName={deleteName}
              update={update}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AppInterface;
