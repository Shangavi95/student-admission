import React, { useEffect, useMemo, useState } from "react";
import {
  useGlobalFilter,
  useTable,
  useFilters,
  usePagination,
} from "react-table";
import { GlobalFilter, SelectColumnFilter } from "./SelectColumnFilter";
import Button from "@mui/material/Button";
import ModalForm from "./ModalForm";

function AdmissionTable1() {
  const [cells, setCells] = useState([]);
  const data = useMemo(() => cells, [cells]);
  const [open, setOpen] = useState(false);
  const [admissionDataLength, setAdmissionDataLength] = useState("");
  const [editFieldValues, setEditFieldValues] = useState({});
  const [editIndex, setEditIndex] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "SI.No",
        accessor: "sIno",
        disableFilters: true,
      },
      {
        Header: "Student Name",
        accessor: "Name",
        disableFilters: true,
      },
      {
        Header: "Student CutOff",
        accessor: "CutOff",
        disableFilters: true,
      },
      {
        Header: "Student Address",
        accessor: "Address",
        disableFilters: true,
      },
      {
        Header: " University",
        accessor: "University",
        disableFilters: true,
      },
      {
        Header: "State",
        accessor: "State",
      },
      {
        Header: "Actions",
        accessor: "action",
        disableFilters: true,
        Cell: ({ row }) => (
          <div>
            <button style={{ margin: "0 5px" }} onClick={() => handleEdit(row)}>
              Edit
            </button>
            <button
              style={{ margin: "0 5px" }}
              onClick={(e) => handleDelete(row)}
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    preGlobalFilteredRows,
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
      defaultColumn: { Filter: SelectColumnFilter },
      initialState: { PageIndex: 2, pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  useEffect(() => {
    reloadTableData();
  }, []);

  useEffect(() => {
    setAdmissionDataLength(cells.length);
  }, [admissionDataLength, cells]);

  const reloadTableData = () => {
    let studentInformation = JSON.parse(
      window.localStorage.getItem("studentInfo")
    );
    console.log(studentInformation, "studentInformation");
    if (studentInformation) {
      setCells(studentInformation);
    }
    setAdmissionDataLength(cells.length);
    console.log(cells, "cells");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditFieldValues({
      sIno: admissionDataLength + 1,
      Name: "",
      CutOff: "",
      Address: "",
      State: "",
      University: "",
    });
    setOpen(false);
  };

  function handleEdit(row) {
    console.log(row.index, "edit button click<<<<<<<");
    let editStudentInfoData = JSON.parse(
      window.localStorage.getItem("studentInfo")
    );
    let editData = editStudentInfoData[row.index];
    console.log(editData, "edit data <<<<<<<");
    setIsEdit(true);
    setEditIndex(row.index);
    setEditFieldValues(editData);
    handleClickOpen();
  }

  function handleDelete(row) {
    let deleteStudentInfoData = JSON.parse(
      window.localStorage.getItem("studentInfo")
    );
    const deleteRowIndex = row.index;
    deleteStudentInfoData.splice(deleteRowIndex,1);
    localStorage.setItem("studentInfo", JSON.stringify(deleteStudentInfoData));
    reloadTableData();
  }

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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "90%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <Button variant="outlined" onClick={handleClickOpen}>
          Add +
        </Button>
      </div>
      {open && (
        <ModalForm
          dataLength={admissionDataLength + 1}
          reloadTableData={reloadTableData}
          open
          handleClose={handleClose}
          isEdit={isEdit}
          editIndex={editIndex}
          editFieldValues={editFieldValues}
        />
      )}
      <table
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
          {page.map((row, id) => {
            prepareRow(row);
            return (
              <tr
                key={id}
                style={{ textAlign: "center" }}
                {...row.getRowProps()}
              >
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

export default AdmissionTable1;
