"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { getCountries, getCountryCapital } from "./common/api";
import { ICountriesResponse, ICountry } from "./common/interfaces";

import Loader from "@/components/Loader";
import CustomError from "@/components/CustomError";
import CardList from "@/components/CardsList";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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

  const [searchText, setSearchText] = useState(searchParams.get("query") || "");

  useEffect(() => {
    getAllCountries();
  }, []);

  const handleSearch = async (searchText: string) => {
    if(searchText.trim().length === 0) return
    const updatedParams = new URLSearchParams(window.location.search);

    if (searchText) {
      updatedParams.set("query", searchText);
    } else {
      updatedParams.delete("query");
    }

    setSearchText(searchText);

    replace(`${pathname}?${updatedParams.toString()}`);

    setLoading(true);
    try {
      const response: ICountry = await getCountryCapital(searchText);

      setData([response]);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setData(null);
      }
    }
    setLoading(false);
  };

  const handleChange = (value: string) => {
    setSearchText(value);
  };

  return (
    <main className="min-h-screen p-20">
      <SearchBar
        handleSearch={handleSearch}
        handleChange={handleChange}
        searchText={searchText}
      />
      <div className="flex flex-wrap  gap-2 items-center justify-between mt-12">
        {loading && <Loader />}
        {error && <CustomError message={error} />}
        {data && <CardList countries={data} />}
      </div>
    </main>
  );
}
