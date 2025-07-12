import { generateContacts } from "../scripts/generateContacts.js";

export async function getContacts(numberOfContacts) {
  try {
    const contacts = await generateContacts(numberOfContacts);
    if (!Array.isArray(contacts) || contacts.length === 0) {
      throw new Error("No contacts generated");
    }
    return contacts;
  } catch (error) {
    console.error("getContacts error:", error.message);
    return [];
  }
}
