"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil } from "lucide-react";
import EditfieldModal from "./modals/editfield";
import api from "../../lib/api";

const Table = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ---------------------------------
     FETCH FPM DATA
  --------------------------------- */
  const fetchPages = async () => {
    try {
      setLoading(true);

      // ✅ FPM API
      const res = await api.get("/api/fellow-program-management");

      setData(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching FPM pages:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [search]);

  /* ---------------------------------
     MODAL HANDLERS
  --------------------------------- */
  const openEditModal = (row) => {
    setEditRow(row);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditRow(null);
  };

  /* ---------------------------------
     UPDATE FPM PAGE
  --------------------------------- */
  const handleEditSave = async (formData) => {
    if (!editRow?._id) return;

    try {
      await api.put(
        `/api/fellow-program-management/${editRow._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      await fetchPages();
      closeEditModal();
    } catch (err) {
      console.error("FPM update failed:", err);
    }
  };

  /* ---------------------------------
     SEARCH FILTER
  --------------------------------- */
  const filteredData = data.filter((item) =>
    item.page_title?.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------------------------
     TABLE COLUMNS
  --------------------------------- */
  const columns = [
    {
      name: "SL No",
      width: "80px",
      cell: (_, index) => index + 1 + currentPage * rowsPerPage,
      style: {
        justifyContent: "center",
        textAlign: "center",
      },
    },
    {
      name: "Page Title",
      selector: (row) => row.page_title,
      sortable: true,
      style: {
        justifyContent: "center",
        textAlign: "center",
      },
    },
    {
      name: "Banner Image",
      width: "160px",
      cell: (row) =>
        row.banner_image ? (
          <img
            src={`${baseURL}/${row.banner_image}`}
            alt={row.page_title}
            width="80"
            height="45"
            style={{
              objectFit: "cover",
              borderRadius: "6px",
              border: "1px solid #ddd",
            }}
          />
        ) : (
          <span className="text-muted">No Image</span>
        ),
      style: {
        justifyContent: "center",
        textAlign: "center",
      },
    },
    {
      name: "Action",
      center: true,
      width: "100px",
      cell: (row) => (
        <Pencil
          size={20}
          className="text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => openEditModal(row)}
        />
      ),
    },
  ];

  return (
    <div className="p-2">
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <div
            className="spinner-border"
            role="status"
            style={{ width: "3rem", height: "3rem", color: "#D4AA2D" }}
          />
        </div>
      ) : (
        <DataTable
          title="Fellow Program in Management (FPM)"
          columns={columns}
          data={filteredData}
          highlightOnHover
          pagination={filteredData.length > 1}
          onChangePage={(page) => setCurrentPage(page - 1)}
          onChangeRowsPerPage={(newPerPage) => {
            setRowsPerPage(newPerPage);
            setCurrentPage(0);
          }}
          subHeader
          subHeaderAlign="right"
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search by page title..."
              style={{ width: "250px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      )}

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
