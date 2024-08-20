"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getCountries } from "./common/api";
import { ICountry } from "./common/interfaces";

export default function Home() {
  const [data, setData] = useState<ICountry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getAllCountries = async () => {
    try {
      const countries = await getCountries();
      setData(countries.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Shadcn</Button>
    </main>
  );
}
