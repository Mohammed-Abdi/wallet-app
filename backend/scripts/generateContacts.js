import { getRandomUser } from "../services/getRandomUser.js";

export async function generateContacts(count = 1) {
  try {
    const contacts = await Promise.all(
      [...Array(count)].map(async () => {
        const randomUser = await getRandomUser();
        return randomUser;
      })
    );

    return "this is returning";
  } catch (error) {
    console.error("generateContacts error:", error.message);
    return null;
  }
}
