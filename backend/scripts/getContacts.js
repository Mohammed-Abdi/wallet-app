import { generateContacts } from "../scripts/generateContacts.js";

export async function getContacts(numberOfContacts) {
  try {
    const contacts = await generateContacts(numberOfContacts);
    if (!contacts.length) throw new Error("No contacts generated");
    return contacts;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}
