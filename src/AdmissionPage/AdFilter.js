import React, { useMemo } from "react";
import {
  useGlobalFilter,
  useTable,
  useFilters,
  usePagination,
} from "react-table";
import ColumnFilter from "./ColumnFilter";
import GlobalFilter from "./GlobalFilter";
import QuickSearch from "../AdmissionPage/QuickSearch";

function AdFilter({ columns, data }) {
  const defaultColumn = useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );
  console.log(data, "data");

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { PageIndex: 2, pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  const styles = {
    thead: {
      backgroundColor: "skyblue",
    },
    td: {
      padding: "10px",
      border: "dotted 1px black",
    },
  };

  const { globalFilter } = state;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ color: "darkblue", textAlign: "center" }}>
        ADMISSION DETAILS
      </h1>

      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

      <table
        // class="center"
        style={{
          width: "90%",
          borderWidth: "1.5px",
          borderColor: "black",
          borderStyle: "solid",
        }}
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    border: "solid 1.5px gray",
                    color: "Black",
                    backgroundColor: "skyblue",
                  }}
                >
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr style={{ textAlign: "center" }} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{ padding: "7px", border: "solid 1px gray" }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="Pagination" style={{ display: "flex", padding: "30px" }}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default AdFilter;
