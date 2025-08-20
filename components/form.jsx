"use client";

import { sendEmail } from "@/app/actions/email";
import { toast } from "sonner";

export default function FormComponent() {
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.target);

      const response = await sendEmail(formData);
      toast.success("Role added successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 p-5 max-w-lg border rounded-xl shadow mx-0 bg-white mt-4"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="border p-2 rounded"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="border p-2 rounded"
        />

        <select name="role" className="border p-2 rounded">
          <option value="">Select a role</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="manager">Manager</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </>
  );
}
