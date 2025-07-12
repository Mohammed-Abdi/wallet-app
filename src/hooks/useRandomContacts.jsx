import { useEffect, useReducer } from "react";

const initialState = {
  contacts: [],
  status: "loading",
  message: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "setContacts":
      return { ...state, contacts: action.payload };
    case "setReady":
      return { ...state, status: "ready" };
    case "setError":
      return { ...state, status: "error" };
    case "setMessage":
      return { ...state, message: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

export function useRandomContacts(numberOfContacts = 1) {
  const [{ contacts, status, message }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getRandomUser() {
      try {
        const res = await fetch(
          `https://randomuser.me/api/?results=${numberOfContacts}`
        );
        if (!res.ok) throw new Error(`Fetch failed with status ${res.status}`);

        const data = await res.json();
        if (!data?.results?.length) throw new Error("No results found");

        const result = data.results.map((result) => ({
          name: `${result.name.first} ${result.name.last}`,
          email: result.email,
          age: result.dob.age,
          gender: result.gender,
          profilePicture: result.picture.large,
          location: {
            city: result.location.city,
            country: result.location.country,
          },
        }));

        dispatch({ type: "setContacts", payload: result });
        dispatch({ type: "setReady" });
      } catch (error) {
        console.error(error.message);
        dispatch({ type: "setError" });
        dispatch({ type: "setMessage", payload: `Oops! ${error.message}` });
      }
    }

    getRandomUser();
  }, [numberOfContacts]);

  return { contacts, status, message };
}
