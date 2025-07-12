import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../context/AccountContext";

export function useRandomContacts() {
  const { accountDispatch } = useContext(AccountContext);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch(
          "https://itsmamme-wallet-app-backend.onrender.com/api/contacts"
        );
        if (!res.ok) throw new Error("Failed to fetch contacts");
        const data = await res.json();
        setContacts(data);

        // Optionally dispatch to context
        accountDispatch({ type: "SET_CONTACTS", payload: data });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, [accountDispatch]);

  return { contacts, loading, error };
}
