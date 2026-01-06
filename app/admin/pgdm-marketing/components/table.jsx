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
     FETCH PGDM MARKETING DATA
  --------------------------------- */
  const fetchPages = async () => {
    try {
      setLoading(true);

      // ✅ PGDM MARKETING API
      const res = await api.get("/api/pgdm-marketing");

      setData(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching PGDM Marketing:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  /* ---------------------------------
     RESET PAGE ON SEARCH
  --------------------------------- */
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
     UPDATE PGDM MARKETING
  --------------------------------- */
  const handleEditSave = async (formData) => {
    if (!editRow?._id) return;

    try {
      const res = await api.put(
        `/api/pgdm-marketing/${editRow._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data?.success || res.data?.data) {
        await fetchPages();
        closeEditModal();
      }
    } catch (err) {
      console.error("PGDM Marketing update failed:", err);
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
      center: true,
      cell: (_, index) => index + 1 + currentPage * rowsPerPage,
    },
    {
      name: "Page Title",
      selector: (row) => row.page_title,
      sortable: true,
      center: true,
    },
    {
      name: "Banner Image",
      center: true,
      width: "160px",
      cell: (row) => {
        if (!row.banner_image) {
          return <span className="text-muted">No Image</span>;
        }

        return (
          <img
            src={`${baseURL}${row.banner_image}`}
            alt={row.page_title}
            width="80"
            height="45"
            style={{
              objectFit: "cover",
              borderRadius: "6px",
              border: "1px solid #ddd",
            }}
          />
        );
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
            style={{
              width: "3rem",
              height: "3rem",
              color: "#D4AA2D",
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <DataTable
          title="PGDM Marketing Content"
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
