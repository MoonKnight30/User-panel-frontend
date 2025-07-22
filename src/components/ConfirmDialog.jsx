import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";

Modal.setAppElement("#root");

const ConfirmDialog = ({ isOpen, onClose, onConfirm, user }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setIsDark(storedTheme === "dark");
  }, [isOpen]);

  const handleDelete = () => {
    onConfirm(); // this deletes the user from parent logic
    toast.success("User deleted successfully!");
    onClose(); // close the modal after deletion
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={`p-6 rounded-xl shadow-md max-w-md w-full mx-auto outline-none border ${
        isDark
          ? "bg-gray-800 text-gray-100 border-gray-600"
          : "bg-white text-gray-800 border-gray-200"
      }`}
      overlayClassName="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <h2 className="text-2xl font-semibold mb-3">Confirm Deletion</h2>
      <p className="mb-6">
        Are you sure you want to delete{" "}
        <span className="font-medium text-red-500">
          {user?.name || "this user"}
        </span>
        ?
      </p>

      <div className="flex justify-end gap-3">
        <button
          className={`px-4 py-2 rounded-md transition ${
            isDark
              ? "bg-gray-600 hover:bg-gray-500 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-black"
          }`}
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
