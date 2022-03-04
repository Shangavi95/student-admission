import React, { useEffect, useState, useMemo } from "react";
import FilterTable from "./FilterTable";
import PaginationTable from "./PaginationTable";
import axios from "axios";

const baseURL = "http://universities.hipolabs.com/search?country=India";

export default function TableWithAPI() {
  const [cells, setCells] = useState([]);

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
      },
      {
        Header: "Country",
        accessor: "country",
      },
      {
        Header: "Web_pages",
        accessor: "web_pages",
      },
      {
        Header: "Alpha_two_code",
        accessor: "alpha_two_code",
      },
      {
        Header: "State-province",
        accessor: "state-province",
      },
      {
        Header: "Domains",
        accessor: "domains",
      },
    ],
    []
  );

  const data = useMemo(() => cells, [cells]);

  return (
    <>
      {cells && (
        // <FilterTable columns={columns} data={data} />
        <PaginationTable columns={columns} data={data} />
      )}
    </>
  );
}
