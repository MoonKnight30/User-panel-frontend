import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";

Modal.setAppElement("#root");

function UserForm({ isOpen, onClose, onSubmit, initialData, isEdit }) {
  const defaultForm = {
    name: "",
    email: "",
    password: "",
    role: "Viewer",
    phone: "",
    address: "",
  };

  const [formData, setFormData] = useState(defaultForm);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (isEdit && initialData) {
      setFormData({ ...initialData, password: "" });
    } else {
      setFormData(defaultForm);
    }
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
  }, [isEdit, initialData, isOpen]); // `isOpen` added to reset form when modal opens

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isDark = theme === "dark";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      if (!formData.name || !formData.email || !formData.role) {
        toast.error("Please fill in Name, Email, and Role.");
        return;
      }
    } else {
      const requiredFields = [
        "name",
        "email",
        "password",
        "role",
        "phone",
        "address",
      ];
      const emptyField = requiredFields.find(
        (field) => !formData[field]?.trim()
      );
      if (emptyField) {
        toast.error(`Please fill in the "${emptyField}" field.`);
        return;
      }
    }

    onSubmit(formData);
    onClose();
    setFormData(defaultForm);
    toast.success(
      isEdit ? "User updated successfully!" : "User added successfully!"
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={`p-6 rounded-xl max-w-md w-full mx-auto shadow-lg outline-none border transition-all duration-300 ${
        isDark
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-white text-gray-900 border-gray-200"
      }`}
      overlayClassName="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
        {isEdit ? "Edit User" : "Add New User"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="input input-bordered w-full"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="input input-bordered w-full"
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="input input-bordered w-full"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="input input-bordered w-full"
        >
          <option>Admin</option>
          <option>Editor</option>
          <option>Viewer</option>
        </select>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="input input-bordered w-full"
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="input input-bordered w-full"
        />

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded-md transition ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-white"
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 rounded-md transition ${
              isDark
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {isEdit ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default UserForm;
