"use client";
import { useState, useEffect } from "react";

import { getCountries } from "./common/api";
import { ICountriesResponse, ICountry } from "./common/interfaces";

import Loader from "@/components/Loader";
import CustomError from "@/components/CustomError";
import CardList from "@/components/CardsList";

export default function Home() {
  const [data, setData] = useState<ICountry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllCountries = async () => {
    setData(null);
    setError(null);
    setLoading(true);
    try {
      const countries: ICountriesResponse = await getCountries();
      if (countries.error) return setError(countries.msg);
      setData(countries.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return (
    <main className="flex flex-wrap min-h-screen  gap-2 items-center justify-between p-24">
      {loading && <Loader />}
      {error && <CustomError message={error} />}
      {data && <CardList countries={data} />}
    </main>
  );
}
