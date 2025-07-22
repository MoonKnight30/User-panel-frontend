import React, { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function UserModal({ isOpen, onClose, user }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    setIsDark(storedTheme === "dark");
  }, [isOpen]); 
  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={`p-6 rounded-xl max-w-md w-full mx-auto outline-none shadow-lg border ${
        isDark
          ? "bg-gray-800 text-gray-100 border-gray-600"
          : "bg-white text-gray-800 border-gray-200"
      }`}
      overlayClassName="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <h2
        className={`text-2xl font-semibold mb-4 border-b pb-2 ${
          isDark ? "border-gray-500" : "border-gray-300"
        }`}
      >
        User Details
      </h2>

      <div className="space-y-3 text-sm">
        <p>
          <span className="font-medium">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium">Role:</span> {user.role}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {user.phone}
        </p>
        <p>
          <span className="font-medium">Address:</span> {user.address}
        </p>
      </div>

      <div className="mt-6 text-right">
        <button
          onClick={onClose}
          className={`px-4 py-2 rounded-md transition ${
            isDark
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}

export default UserModal;
