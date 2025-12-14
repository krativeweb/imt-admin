"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil } from "lucide-react";
import EditfieldModal from "./modals/editfield";
import api from "../../lib/api";

const Table = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* -----------------------------------------
        FETCH ALL PLACEMENT PAGES
  ----------------------------------------- */
  const fetchPages = async () => {
    try {
      const res = await api.get(`/api/placement`);
      setData(res.data.data || []);
    } catch (error) {
      console.error("Error fetching placement pages:", error);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  /* -----------------------------------------
        OPEN / CLOSE MODAL
  ----------------------------------------- */
  const openEditModal = (row) => {
    setEditRow(row);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditRow(null);
  };

  /* -----------------------------------------
        SAVE EDITED DATA
  ----------------------------------------- */
  const handleEditSave = async (updatedData) => {
    try {
      const res = await api.put(
        `/api/placement/edit/${editRow._id}`,
        updatedData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.msg) {
        await fetchPages(); // Refresh list
        closeEditModal();
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* -----------------------------------------
        FILTER SEARCH RESULTS
  ----------------------------------------- */
  const filteredData = data.filter(
    (item) =>
      item.page_title?.toLowerCase().includes(search.toLowerCase()) ||
      item.banner_text?.toLowerCase().includes(search.toLowerCase())
  );

  /* -----------------------------------------
        TABLE COLUMNS
  ----------------------------------------- */
  const columns = [
    {
      name: "SL No",
      selector: (row, index) => index + 1 + currentPage * rowsPerPage,
      width: "80px",
      style: { textAlign: "center" },
    },
    {
      name: "Page Title",
      selector: (row) => row.page_title,
      sortable: true,
      style: { textAlign: "center" },
    },
  
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-3 justify-content-center">
          <Pencil
            size={20}
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => openEditModal(row)}
          />
        </div>
      ),
      style: { textAlign: "center" },
    },
  ];

  /* -----------------------------------------
        FINAL RETURN
  ----------------------------------------- */
  return (
    <div className="p-2">
      <DataTable
        title="Placement Pages"
        columns={columns}
        data={filteredData}
        highlightOnHover
        pagination
        onChangePage={(page) => setCurrentPage(page - 1)}
        onChangeRowsPerPage={(newPerPage) => setRowsPerPage(newPerPage)}
        subHeader
        subHeaderAlign="right"
        subHeaderComponent={
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            style={{ width: "250px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />

      {showEditModal && (
        <EditfieldModal
          show={showEditModal}
          onClose={closeEditModal}
          field={editRow}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default Table;
