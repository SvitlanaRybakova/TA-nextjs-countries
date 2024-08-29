"use client";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { getCountries } from "./common/api";
import { ICountry } from "./common/interfaces";

import Loader from "@/components/Loader";
import CustomError from "@/components/CustomError";
import CardList from "@/components/CardsList";
import SearchBar from "@/components/SearchBar";
import useLazyLoader from "./common/hooks/useLazyLoader";
import ButtonLoadMore from "@/components/ButtonLoadMore";

export default function Home() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [data, setData] = useState<ICountry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState(searchParams.get("query") || "");

  const params = new URLSearchParams(window.location.search);

  const { limit, ammountOfClick, onLoadMore } = useLazyLoader(data?.length);

  const renderCountries = async () => {
    setData([]);
    setError(null);
    setLoading(true);
    try {
      const countries: ICountry[] = await getCountries(searchText);

      setData(countries);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    renderCountries();
  }, []);

  const handleSearch = async (searchText: string) => {
    if (searchText.trim().length === 0) {
      params.delete("query");
      replace(`${pathname}?${params.toString()}`);
      console.log("inside the if", searchText.length, params.toString());

      renderCountries();
      return;
    }

    if (searchText) {
      params.set("query", searchText);
    } else {
      params.delete("query");
    }

    setSearchText(searchText);
    replace(`${pathname}?${params.toString()}`);
    setLoading(true);
    try {
      renderCountries();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        setData([]);
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
      <div className="flex flex-wrap  gap-2 items-center  mt-12">
        {loading && <Loader />}
        {error && <CustomError message={error} />}
        {data && <CardList countries={data} limit={limit} />}
      </div>
      <ButtonLoadMore ammountOfClick={ammountOfClick} onLoadMore={onLoadMore} />
    </main>
  );
}
