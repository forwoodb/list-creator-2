import { User } from "@/app/models/User";
import { redirect } from "next/navigation";

const EditUserPage = async ({ params }) => {
  const { id } = await params;

  const data = await User.findById(id).lean();
  const user = JSON.parse(JSON.stringify(data));

  const updateUser = async (formData: FormData) => {
    "use server";

    const username = formData.get("username");
    const email = formData.get("email");
    const role = formData.get("role");

    await User.findByIdAndUpdate(id, { username, email, role });

    console.log(username, email, role);

    redirect("/admin");
  };

  return (
    <>
      <form action={updateUser} className="flex flex-col gap-4 w-xs mx-auto">
        <input
          type="text"
          name="username"
          value={user.username}
          className="input"
        />
        <input type="text" name="email" value={user.email} className="input" />
        <select name="role" id="role" className="select">
          <option value="user" selected={user.role === "user"}>
            User
          </option>
          <option value="admin" selected={user.role === "admin"}>
            Admin
          </option>
        </select>
        <button className="btn">Update </button>
      </form>
    </>
  );
};

export default EditUserPage;
