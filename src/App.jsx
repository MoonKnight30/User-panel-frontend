import React, { useState, useEffect } from "react";
import UserTable from "./components/UserTable";
import UserForm from "./components/UserForm";
import UserModal from "./components/UserModal";
import ConfirmDialog from "./components/ConfirmDialog";
import initialUsers from "./data/users.json";
import { Toaster } from "react-hot-toast";

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDark, setIsDark] = useState(false);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const handleDownloadCSV = () => {
    const csvHeader = ["ID", "Name", "Email", "Role"];
    const csvRows = users.map((user) => [
      user.id,
      user.name,
      user.email,
      user.role,
    ]);

    const csvContent = [
      csvHeader.join(","), // header
      ...csvRows.map((row) => row.join(",")), // each user row
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    const storedTheme = localStorage.getItem("theme");
    setIsDark(storedTheme === "dark");
  }, [theme]);

  const getNextId = (usersArray) => {
    if (!usersArray.length) return 1;
    return Math.max(...usersArray.map((u) => u.id || 0)) + 1;
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleAddUser = (user) => {
    setUsers((prevUsers) => {
      const newUser = { ...user, id: getNextId(prevUsers) };
      return [...prevUsers, newUser];
    });
    setIsFormOpen(false);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setIsFormOpen(false);
    setIsEditMode(false);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsViewOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsFormOpen(true);
    setIsEditMode(true);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
    setUserToDelete(null);
    setIsDeleteOpen(false);
  };

  const filteredUsers = users.filter((user) => {
    const query = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <div
      className={`min-h-screen transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`flex justify-between items-center px-6 py-4 border-b shadow 
                      ${
                        theme === "dark"
                          ? "bg-gray-800 text-gray-100 border-gray-700"
                          : "bg-blue-50 text-blue-500 border-blue-200"
                      }`}
      >
        <h1 className="text-2xl font-bold">User Management Panel</h1>

        {/* Dark Mode Toggle */}
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          <svg
            className="swap-off fill-current w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
          <svg
            className="swap-on fill-current w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
        </label>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8 w-full">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          {/* Add Button */}
          <button
            onClick={handleDownloadCSV}
            className={`ml-4 px-5 py-2 rounded-md transition shadow 
          ${
            theme === "dark"
              ? "bg-gray-600 hover:bg-gray-700 text-white"
              : "bg-gray-800 hover:bg-gray-700 text-white"
          }`}
          >
            Download CSV
          </button>
          <button
            onClick={() => {
              setSelectedUser(null);
              setIsEditMode(false);
              setIsFormOpen(true);
            }}
            className={`px-5 py-2 rounded-md transition shadow 
          ${
            theme === "dark"
              ? "bg-cyan-600 hover:bg-blue-800 text-white"
              : "bg-cyan-600 hover:bg-cyan-700 text-white"
          }`}
          >
            + Add User
          </button>

          {/* 🔍 Search Box */}
          <input
            type="text"
            placeholder="Search users..."
            className="input input-bordered w-72"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <UserTable
          users={filteredUsers}
          onView={handleViewUser}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </main>

      {/* Modals */}
      <UserModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        user={selectedUser}
      />
      <UserForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={isEditMode ? handleUpdateUser : handleAddUser}
        initialData={selectedUser}
        isEdit={isEditMode}
      />
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        user={userToDelete}
      />
    </div>
    </>
  );
}

export default App;
