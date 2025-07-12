import { getContacts } from "../utils/getContacts";

export const contacts = async function fetchContacts() {
  console.log(await getContacts(5));
  return await getContacts(5);
};
