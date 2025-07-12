import { getRandomUser } from "../services/getRandomUser.js";

export async function generateContacts(count = 1) {
  try {
    const contacts = await Promise.all(
      [...Array(count)].map(async () => {
        const randomUser = await getRandomUser();
        return randomUser;
      })
    );

    return contacts.filter(Boolean).map((user) => ({
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      profilePicture: user.profilePicture,
      location: user.location,
    }));
  } catch (error) {
    console.error("generateContacts error:", error.message);
    return "catch block is executed";
  }
}
