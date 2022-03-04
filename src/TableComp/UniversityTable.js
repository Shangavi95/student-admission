import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import FilterTable from "./FilterTable";

function UniversityTable() {
  const [cells, setCells] = useState([]);
  const baseURL = "http://universities.hipolabs.com/search?country=India";

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setCells(response.data);
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        disableFilters: true,
      },
      {
        Header: "Country",
        accessor: "country",
        disableFilters: true,
      },
      {
        Header: "Web pages",
        accessor: "web_pages",
        disableFilters: true,
      },
      {
        Header: "Alpha two code",
        accessor: "alpha_two_code",
        disableFilters: true,
      },
      {
        Header: "State province",
        accessor: "state-province",
      },
      {
        Header: "Domains",
        accessor: "domains",
        disableFilters: true,
      },
    ],
    []
  );

  const data = useMemo(() => cells, [cells]);

  return <FilterTable columns={columns} data={data} />;
}

export default UniversityTable;
