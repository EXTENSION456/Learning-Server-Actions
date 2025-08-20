"use server";

import { connectDb } from "@/lib/mongo";
import User from "@/models/userModel";
import { revalidatePath } from "next/cache";

export async function sendEmail(formData) {
  try {
    await connectDb();

    const email = formData.get("email");

    const user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exists");
    }

    const payload = {
      email,
      name: formData.get("name"),
      role: formData.get("role"),
    };

    const newUser = new User(payload);
    await newUser.save();
    revalidatePath("/form");
    return { success: true, message: "User created successfully." };
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error(error.message);
  }
}

export async function getUsers() {
  try {
    const users = await User.find({}).lean();

    const serializableUsers = users.map((user) => {
      const plainUser = { ...user };
      plainUser._id = plainUser._id.toString();
      return plainUser;
    });

    return serializableUsers;
  } catch (error) {
    throw new Error(error.message);
  }
}
