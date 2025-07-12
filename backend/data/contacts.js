import { getContacts } from "../scripts/getContacts";

export const contacts = async function fetchContacts() {
  return await getContacts(5);
};
