"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { getCountries } from "./common/api";
import { ICountriesResponse, ICountry } from "./common/interfaces";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/Loader";

export default function Home() {
  const [data, setData] = useState<ICountry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false)

  const getAllCountries = async () => {
    setLoading(true)
    try {
      const countries: ICountriesResponse = await getCountries();
      if (countries.error) return setError(countries.msg);
      setData(countries.data);
    
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
    setLoading(false)
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  if (error) return <div>Error: {error}</div>;
  // if (!data) return <div>Loading...</div>;

  return (
    <main className="flex flex-wrap min-h-screen  gap-2 items-center justify-between p-24">
      {loading && <Loader/>}
      {data &&
        data.map((country) => (
          <Card className="w-64 h-56" key={uuidv4()}>
            <CardHeader>
              <CardTitle className="text-lg">{country.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="italic text-sm">Capital: {country.capital}</p>
            </CardContent>
          </Card>
        ))}
    </main>
  );
}
