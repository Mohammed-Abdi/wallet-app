import { useReducer } from "react";
import { useRandomContacts } from "./useRandomContacts";
import { nanoid } from "nanoid";

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        accounts: state.accounts.map((account) => {
          if (account.account.username === action.payload) {
            return {
              ...account,
              status: { ...account.status, accountStatus: "active" },
              timestamps: {
                ...account.timestamps,
                lastLogin: new Date().toISOString(),
              },
            };
          }
          return account;
        }),
      };

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
        username: individual.name.split(" ").join("_"),
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
        createdAt: new Date().toLocaleString(),
        lastLogin: new Date().toLocaleString(),
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
          profilePicture: "/images/guest-user.webp",
          age: 20,
          gender: "Unknown",
        },

        location: { city: "Addis Ababa", country: "Ethiopia" },

        account: {
          username: "guest_user",
          email: "guest@example.com",
          password: "unnecessary",
        },

        status: {
          accountStatus: "guest",
          verification: "verified",
          membership: "basic",
        },

        balances: [
          { symbol: "BTC", name: "Bitcoin", balance: 0.00054 },
          { symbol: "ETH", name: "Ethereum", balance: 1.382 },
          { symbol: "USDT", name: "Tether", balance: 257.31 },
          { symbol: "BNB", name: "Binance Coin", balance: 3.27 },
          { symbol: "SOL", name: "Solana", balance: 18.6 },
        ],

        transactions: [
          {
            id: "NBmDYjz_U2waFgHgm-RjQ",
            type: "deposit",
            amount: 100,
            currency: "USD",
            date: "2025-07-13T09:00:00",
          },
          {
            id: "JHwT9_KLxSmaVrcu3-fgY",
            type: "deposit",
            amount: 0.5,
            currency: "ETH",
            date: "2025-07-12T15:45:22",
          },
          {
            id: "RtPwEZB7oZplA-HYjbNc3",
            type: "withdraw",
            amount: 10,
            currency: "USD",
            date: "2025-07-13T10:27:58",
          },
          {
            id: "a1F_4KZlWQYc9oPLmhTjV",
            type: "withdraw",
            amount: 0.01,
            currency: "BTC",
            date: "2025-07-11T20:15:00",
          },
          {
            id: "LzJybFzUZVqAwB_Uu-cC9",
            type: "send",
            amount: 50,
            currency: "USDT",
            date: "2025-07-13T11:02:14",
          },
          {
            id: "YgRqmPQmFz7Ht_Mp-XkX1",
            type: "send",
            amount: 20,
            currency: "SOL",
            date: "2025-07-10T13:22:10",
          },
          {
            id: "BvEW9MDHdNsqmfy6_qJz2",
            type: "convert",
            from: {
              amount: 0.3,
              currency: "ETH",
            },
            to: {
              amount: 0.007,
              currency: "BTC",
            },
            date: "2025-07-13T11:45:00",
          },
          {
            id: "q3MzA8flD_t7wBHVX0kUe",
            type: "convert",
            from: {
              amount: 100,
              currency: "USDT",
            },
            to: {
              amount: 0.145,
              currency: "BNB",
            },
            date: "2025-07-09T18:30:15",
          },
        ],

        timestamps: {
          createdAt: new Date().toLocaleString(),
          lastLogin: new Date().toLocaleString(),
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
