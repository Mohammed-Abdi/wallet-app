import { useEffect, useReducer, useRef } from "react";
import { useRandomContacts } from "./useRandomContacts";
import { nanoid } from "nanoid";

const guestAccount = {
  id: nanoid(),

  personalInfo: {
    name: "Guest User",
    profilePicture: null,
    age: Math.floor(Math.random() * 10) + 20,
    gender: "None",
  },

  location: { city: "Dire Dawa", country: "Ethiopia" },

  account: {
    username: "guest_user",
    email: "guest.user@gmail.com",
    password: "unnecessary",
  },

  status: {
    accountStatus: "inactive",
    verification: "verified",
    membership: "basic",
  },

  balances: [
    { symbol: "BTC", name: "Bitcoin", balance: 0.00017 },
    { symbol: "ETH", name: "Ethereum", balance: 0 },
    { symbol: "USD", name: "Dollar", balance: 24 },
    { symbol: "BNB", name: "Binance Coin", balance: 0 },
    { symbol: "SOL", name: "Solana", balance: 0 },
  ],

  transactions: [
    {
      id: "fWpkGV7sciRqM9LhJXDoE",
      type: "deposit",
      amount: 67,
      currency: "USD",
      date: "2025-07-13T08:45:00",
    },
    {
      id: "KM9Lt0RXNpO3dYqhscJ1e",
      type: "convert",
      from: {
        amount: 20,
        currency: "USD",
      },
      to: {
        amount: 0.00017,
        currency: "BTC",
      },
      date: "2025-07-13T10:00:00",
    },
    {
      id: "ZuEVR5a13CNtWyPQFmOjz",
      type: "send",
      receiver: "tx07-receiver",
      amount: 23,
      currency: "USD",
      date: "2025-07-13T09:00:00",
    },
  ],
  logins: [
    {
      status: "success",
      date: "2025-07-13T08:20:00",
    },
    {
      status: "failed",
      date: "2025-07-12T22:45:10",
    },
    {
      status: "blocked",
      date: "2025-07-12T20:18:45",
    },
  ],
  timestamps: {
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  },
};

const initialAccountState = {
  accounts: [guestAccount],
  admins: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "initialize":
      return { ...state, accounts: [...state.accounts, ...action.payload] };
    case "login":
      return {
        ...state,
        accounts: state.accounts.map((account) => {
          if (account.account.username === action.payload) {
            return {
              ...account,
              status: { ...account.status, accountStatus: "active" },
              logins: [
                { status: "success", date: new Date().toISOString() },
                ...account.logins,
              ],
              timestamps: {
                ...account.timestamps,
                lastLogin: new Date().toISOString(),
              },
            };
          }
          return account;
        }),
      };

    case "failedLogin":
      return {
        ...state,
        accounts: state.accounts.map((account) => {
          if (account.account.username === action.payload) {
            return {
              ...account,
              logins: [
                { status: "failed", date: new Date().toISOString() },
                ...account.logins,
              ],
            };
          }
          return account;
        }),
      };

    case "logout":
      return {
        ...state,
        accounts: state.accounts.map((account) => {
          if (account.account.username === action.payload) {
            return {
              ...account,
              status: { ...account.status, accountStatus: "inactive" },
              timestamps: {
                ...account.timestamps,
                lastLogin: new Date().toISOString(),
              },
            };
          }
          return account;
        }),
      };

    case "addNewUser":
      return { ...state, accounts: [...state.accounts, action.payload] };

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

    case "send":
      return {
        ...state,
        accounts: state.accounts.map((account) => {
          if (account.id === action.payload.receiver) {
            return {
              ...account,
              balances: account.balances.map((balance) => {
                if (balance.symbol === action.payload.currency) {
                  return {
                    ...balance,
                    balance: balance.balance + action.payload.amount,
                  };
                }
                return balance;
              }),
            };
          }
          return account;
        }),
      };

    case "convert":
      return {
        ...state,
        accounts: state.accounts.map((account) => {
          if (account.id === action.payload.id) {
            return {
              ...account,
              balances: account.balances.map((balance) => {
                if (balance.symbol === action.payload.currency.from) {
                  return {
                    ...balance,
                    balance: balance.balance - action.payload.amount.from,
                  };
                } else if (balance.symbol === action.payload.currency.to) {
                  return {
                    ...balance,
                    balance: balance.balance + action.payload.amount.to,
                  };
                }
                return balance;
              }),
            };
          }
          return account;
        }),
      };

    case "logBalanceTransaction":
      return {
        ...state,
        accounts: state.accounts.map((account) => {
          if (account.id === action.payload.id) {
            return {
              ...account,
              transactions: [
                ...account.transactions,
                {
                  id: action.payload.transactionId,
                  type: action.payload.type,
                  amount: action.payload.amount,
                  currency: action.payload.currency,
                  date: action.payload.date,
                },
              ],
            };
          } else {
            return account;
          }
        }),
      };

    case "logTransferTransaction":
      return {
        ...state,
        accounts: state.accounts.map((account) => {
          if (account.id === action.payload.id) {
            return {
              ...account,
              transactions: [
                ...account.transactions,
                {
                  id: action.payload.transactionId,
                  type: action.payload.type,
                  receiver: action.payload.receiverName,
                  amount: action.payload.amount,
                  currency: action.payload.currency,
                  date: action.payload.date,
                },
              ],
            };
          } else {
            return account;
          }
        }),
      };

    case "logConversionTransaction":
      return {
        ...state,
        accounts: state.accounts.map((account) => {
          if (account.id === action.payload.id) {
            return {
              ...account,
              transactions: [
                ...account.transactions,
                {
                  id: action.payload.transactionId,
                  type: action.payload.type,
                  from: action.payload.from,
                  to: action.payload.to,
                  date: action.payload.date,
                },
              ],
            };
          }
          return account;
        }),
      };

    case "changeUsername":
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === action.payload.id
            ? {
                ...account,
                account: {
                  ...account.account,
                  username: action.payload.username,
                },
              }
            : account
        ),
      };

    case "changeEmail":
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === action.payload.id
            ? {
                ...account,
                account: {
                  ...account.account,
                  email: action.payload.email,
                },
              }
            : account
        ),
      };

    case "changePassword":
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === action.payload.id
            ? {
                ...account,
                account: {
                  ...account.account,
                  password: action.payload.password,
                },
              }
            : account
        ),
      };

    case "changeAge":
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === action.payload.id
            ? {
                ...account,
                personalInfo: {
                  ...account.personalInfo,
                  age: action.payload.age,
                },
              }
            : account
        ),
      };

    case "changeGender":
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === action.payload.id
            ? {
                ...account,
                personalInfo: {
                  ...account.personalInfo,
                  gender: action.payload.gender,
                },
              }
            : account
        ),
      };

    case "changeFullName":
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === action.payload.id
            ? {
                ...account,
                personalInfo: {
                  ...account.personalInfo,
                  name: action.payload.name,
                },
              }
            : account
        ),
      };

    case "changeCity":
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === action.payload.id
            ? {
                ...account,
                location: {
                  ...account.location,
                  city: action.payload.city,
                },
              }
            : account
        ),
      };

    case "changeCountry":
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.id === action.payload.id
            ? {
                ...account,
                location: {
                  ...account.location,
                  country: action.payload.country,
                },
              }
            : account
        ),
      };

    default:
      throw new Error("Unknown action");
  }
}

export function useAccount() {
  const isInitialized = useRef(false);
  const { contacts, status, message } = useRandomContacts(3);
  const [state, accountDispatch] = useReducer(
    reducer,
    initialAccountState,
    () => {
      const storedState = localStorage.getItem("accountData");
      return storedState ? JSON.parse(storedState) : initialAccountState;
    }
  );

  useEffect(() => {
    if (
      !isInitialized.current &&
      contacts.length > 0 &&
      state.accounts.length === 1
    ) {
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
            username: individual.name.split(" ").join("_").toLowerCase(),
            email: individual.email,
            password: "unnecessary",
          },

          status: {
            accountStatus: "contacts",
            verification: "verified",
            membership: i % 2 === 0 ? "pro" : "basic",
          },

          balances: [
            { symbol: "BTC", name: "Bitcoin", balance: 0 },
            { symbol: "ETH", name: "Ethereum", balance: 0 },
            { symbol: "USD", name: "Dollar", balance: 0 },
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

      accountDispatch({ type: "initialize", payload: contactArray });
      isInitialized.current = true;
    }
  }, [contacts, state.accounts]);

  useEffect(() => {
    localStorage.setItem("accountData", JSON.stringify(state));
  }, [state]);

  return {
    admins: state.admins,
    accounts: state.accounts,
    status,
    message,
    accountDispatch,
  };
}
