import React, { FC } from "react";

import SearchFilters from "./components/Filters";
import SearchPageItems from "./components/Items";

interface SearchPageProps {}

const SearchPage: FC<SearchPageProps> = () => {
  return (
    <>
      <SearchFilters />
      <SearchPageItems />
    </>
  );
};

export default SearchPage;
