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

    case "deposit":
      return {
        ...state,
        accounts: state.accounts.map((account) => {
          if (account.id === action.payload.id) {
            return {
              ...account,
              balances: account.balances.map((balance) => {
                if (balance.symbol === action.payload.currency) {
                  return {
                    ...balance,
                    balance: balance.balance + action.payload.amount,
                  };
                } else {
                  return balance;
                }
              }),
            };
          } else {
            return account;
          }
        }),
      };

    case "withdraw":
      return {
        ...state,
        accounts: state.accounts.map((account) => {
          if (account.id === action.payload.id) {
            return {
              ...account,
              balances: account.balances.map((balance) => {
                if (balance.symbol === action.payload.currency) {
                  return {
                    ...balance,
                    balance: balance.balance - action.payload.amount,
                  };
                } else {
                  return balance;
                }
              }),
            };
          } else {
            return account;
          }
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
      logins: [],

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
          { symbol: "ETH", name: "Ethereum", balance: 0.0082 },
          { symbol: "USDT", name: "Tether", balance: 40.31 },
          { symbol: "BNB", name: "Binance Coin", balance: 0.027 },
          { symbol: "SOL", name: "Solana", balance: 0.06 },
        ],

        transactions: [
          {
            id: "KM9Lt0RXNpO3dYqhscJ1e",
            type: "convert",
            from: {
              amount: 0.04,
              currency: "BNB",
            },
            to: {
              amount: 0.06,
              currency: "SOL",
            },
            date: "2025-07-13T10:00:00",
          },
          {
            id: "ZuEVR5a13CNtWyPQFmOjz",
            type: "send",
            receiver: "tx07-receiver",
            amount: 0.04,
            currency: "BNB",
            date: "2025-07-13T09:00:00",
          },
          {
            id: "fWpkGV7sciRqM9LhJXDoE",
            type: "deposit",
            amount: 0.067,
            currency: "BNB",
            date: "2025-07-13T08:45:00",
          },
          {
            id: "AqGnzWYF10pT7vBh4xMjL",
            type: "convert",
            from: {
              amount: 0.0318,
              currency: "ETH",
            },
            to: {
              amount: 40.31,
              currency: "USDT",
            },
            date: "2025-07-12T15:30:00",
          },
          {
            id: "XkL93Nz0rUMgHd5VWcKqb",
            type: "send",
            receiver: "tx04-receiver",
            amount: 0.01,
            currency: "ETH",
            date: "2025-07-12T09:00:00",
          },
          {
            id: "8hQ0A1oFb72eMxKYjz3uV",
            type: "deposit",
            amount: 0.05,
            currency: "ETH",
            date: "2025-07-11T12:00:00",
          },
          {
            id: "y2vCkLdTPXfR8Jo6hzM1Q",
            type: "withdraw",
            amount: 0.01946,
            currency: "BTC",
            date: "2025-07-11T09:00:00",
          },
          {
            id: "V9fz9mj72HrWaXKblFZrM",
            type: "deposit",
            amount: 0.02,
            currency: "BTC",
            date: "2025-07-10T10:00:00",
          },
        ],
        logins: [
          {
            status: "success",
            location: { city: "Addis Ababa", country: "Ethiopia" },
            date: "2025-07-13T08:20:00",
          },
          {
            status: "failed",
            location: { city: "Nairobi", country: "Kenya" },
            date: "2025-07-12T22:45:10",
          },
          {
            status: "blocked",
            location: { city: "Addis Ababa", country: "Ethiopia" },
            date: "2025-07-12T20:18:45",
          },
          {
            status: "success",
            location: { city: "Addis Ababa", country: "Ethiopia" },
            date: "2025-07-11T06:15:30",
          },
          {
            status: "failed",
            location: { city: "Dubai", country: "UAE" },
            date: "2025-07-10T19:02:00",
          },
          {
            status: "success",
            location: { city: "Addis Ababa", country: "Ethiopia" },
            date: "2025-07-10T07:30:00",
          },
        ],
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
