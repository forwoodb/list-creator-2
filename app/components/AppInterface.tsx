import Link from "next/link";

const AppInterface = async ({ mode, session, items, create }) => {
  // console.log(session);

  return (
    <>
      <div className="app-container min-w-120 mx-auto p-4 rounded bg-gray-400 shadow-md shadow-gray-800">
        <div className="text-wrapper flex justify-between py-1">
          <h2 className="text-center text-6xl text-gray-200">
            {mode === "list-names" ? `List Names` : `List Items`}
          </h2>
        </div>
        <p>Hello {session.user.name} </p>
        <form action={create} className="mx-auto mb-5 p-2.5 bg-blue-500 ">
          <label htmlFor="list-name">
            {mode === "list-names" ? `List Name` : `List Item`}
          </label>
          <input
            type="text"
            id="list-name"
            name="list-name"
            placeholder={mode === "list-names" ? `List Name` : `List Item`}
            className="input m-2"
          />
          <button className="btn btn-neutral ">Create List Name</button>
        </form>
        <div className="list-container">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center max-w-lg p-2.5 mx-auto my-2.5 bg-gray-200 rounded"
            >
              {mode === "list-names" ? item.listName : item.listItem}
              <div className="buttons">
                {mode === "list-names" && (
                  <Link
                    href={`/dashboard/list-items/${item._id}`}
                    className="inline-flex justify-center align-middle px-2.5 mx-1 cursor-pointer rounded"
                  >
                    View
                  </Link>
                )}
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

export default AppInterface;
