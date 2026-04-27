import { connectDB } from "../lib/db";
import { User } from "../models/User";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  connectDB();

  // Get Users
  const data = await User.find({}).lean();
  const users = JSON.parse(JSON.stringify(data));
  console.log(users);

  // Edit Users
  const editUser = async (id: string) => {
    "use server";

    redirect(`/admin/edit/${id}`);
  };

  // Delete Users
  const deleteUser = async (id: string) => {
    "use server";
    console.log(id);

    // await User.findByIdAndDelete({});
  };

  return (
    <>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <form action={editUser.bind(null, user._id)}>
                  <button>Edit</button>
                </form>
              </td>
              <td>
                <form action={deleteUser.bind(null, user._id)}>
                  <button>Delete</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminPage;
