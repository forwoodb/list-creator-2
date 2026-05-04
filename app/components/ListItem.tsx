"use client";

import { useState } from "react";
import Link from "next/link";

interface ListItemProps {
  item: {
    _id: string;
    name: string;
  };
  mode: string;
  deleteName: (formData: FormData) => Promise<void>;
  update: (formData: FormData) => Promise<void>;
}

const ListItem = ({ item, mode, deleteName, update }: ListItemProps) => {
  const [edit, setEdit] = useState(false);
  const [localName, setLocalName] = useState(item.name);

  const editItem = () => {
    setEdit(!edit);
  };

  if (edit) {
    return (
      <div className="flex justify-between items-center max-w-lg p-2.5 mx-auto my-2.5 bg-gray-200 rounded">
        <form
          action={async (formData: FormData) => {
            const newName = formData.get("name") as string;
            setLocalName(newName);
            setEdit(false);
            await update(formData);
          }}
          className="flex justify-between w-full"
        >
          <input type="hidden" name="id" value={item._id} />
          <input
            type="text"
            name="name"
            defaultValue={localName}
            className="bg-white"
          />
          <button type="submit" className="btn">
            {/* <button type="submit" className="btn"> */}
            Update
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div
        key={item._id}
        className="flex justify-between items-center max-w-lg p-2.5 mx-auto my-2.5 bg-gray-200 rounded"
      >
        {item.name}
        <div className="buttons flex justify-between items-center">
          {mode === "list-names" && (
            <Link
              href={`/dashboard/list-items/${item._id}`}
              className="inline-flex justify-center align-middle px-2.5 mx-1 cursor-pointer rounded"
            >
              View
            </Link>
          )}
          <button onClick={editItem} className="btn">
            Edit
          </button>
          <form action={deleteName}>
            <input type="hidden" name="id" value={item._id} />
            <button className="btn">Delete</button>
          </form>
        </div>
      </div>
    );
  }
};

export default ListItem;
