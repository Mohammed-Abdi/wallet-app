import { useReducer } from "react";
import { useRandomContacts } from "./useRandomContacts";
import { nanoid } from "nanoid";

function reducer(state, action) {
  switch (action.type) {
    case "setContacts":
      return { ...state, contacts: [...state.contacts, action.payload] };
    default:
      throw new Error("Unknown action");
  }
}

export function useAccount() {
  const { contacts, status, message } = useRandomContacts(3);

  const contactArray = contacts.map((individual, i) => {
    return {
      id: nanoid(),

      personalInfo: {
        name: individual.name,
        profilePicture: individual.profilePicture,
        age: 20,
        gender: individual.gender,
      },

      location: individual.location,

      account: {
        username: `@${individual.name.split(" ").join("_")}`,
        email: individual.email,
        password: "unnecessary",
      },

      status: {
        accountStatus: "inactive",
        verification: "verified",
        membership: i % 2 !== 0 ? "pro" : "freePlan",
      },

      balances: [
        { symbol: "BTC", name: "Bitcoin", balance: 0 },
        { symbol: "ETH", name: "Ethereum", balance: 0 },
        { symbol: "USDT", name: "Tether", balance: 0 },
        { symbol: "BNB", name: "Binance Coin", balance: 0 },
        { symbol: "SOL", name: "Solana", balance: 0 },
      ],

      transactions: [],

      timestamps: {
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      },
    };
  });

  const initialAccountState = {
    accounts: [
      ...contactArray,
      {
        id: nanoid(),

        personalInfo: {
          name: "Guest",
          profilePicture: "/avatars/guest.svg",
          age: 20,
          gender: "Unknown",
        },

        location: { city: "Addis Ababa", country: "Ethiopia" },

        account: {
          username: "@guest",
          email: "guest@example.com",
          password: "unnecessary",
        },

        status: {
          accountStatus: "guest",
          verification: "unverified",
          membership: "freePlan",
        },

        balances: [
          { symbol: "BTC", name: "Bitcoin", balance: 0 },
          { symbol: "ETH", name: "Ethereum", balance: 0 },
          { symbol: "USDT", name: "Tether", balance: 0 },
          { symbol: "BNB", name: "Binance Coin", balance: 0 },
          { symbol: "SOL", name: "Solana", balance: 0 },
        ],

        transactions: [],

        timestamps: {
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        },
      },
    ],

    admins: null,
  };

  const [{ accounts, admins }, accountDispatch] = useReducer(
    reducer,
    initialAccountState
  );

  return { admins, accounts, status, message, accountDispatch };
}
