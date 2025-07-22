import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

function UserTable({ users, onView, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border border-gray-300">
        <thead className="tw:bg-red-500 dark:bg-lime-500 text-white">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="px-4 py-2 border">{user.id}</td>
                <td className="px-4 py-2 border">{user.name}</td>
                <td className="px-4 py-2 border">{user.email}</td>
                <td className="px-4 py-2 border">{user.role}</td>
                <td className="px-4 py-2 border space-x-2">
                  <button className="text-blue-500 hover:text-blue-700"
                  onClick={() => onView(user)}
                  >
                    <FaEye />
                  </button>
                  <button className="text-green-500 hover:text-green-700"
                  onClick={() => onEdit(user)}
                  >
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700"
                  onClick={() => onDelete(user)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
