import { useEffect, useState } from "react";

export function useLiveDate(interval = 1000) {
  const [date, setDate] = useState(() => new Date().toISOString());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date().toISOString());
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return date;
}
