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

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  /* ---------------------------------
     FETCH HAPPENINGS SEO DATA
  --------------------------------- */
  const fetchPages = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/happenings-seo");

      // ✅ single SEO document → wrap into array
      setData(res.data ? [res.data] : []);
    } catch (error) {
      console.error("Error fetching happenings SEO:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

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
     UPDATE HAPPENINGS SEO
  --------------------------------- */
  const handleEditSave = async (updatedData) => {
    try {
      await api.put(
        `/api/happenings-seo/${editRow._id}`,
        updatedData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      await fetchPages();
      closeEditModal();
    } catch (err) {
      console.error("Happenings SEO update failed:", err);
    }
  };

  /* ---------------------------------
     SEARCH FILTER
  --------------------------------- */
  const filteredData = data.filter(
    (item) =>
      item.page_title?.toLowerCase().includes(search.toLowerCase()) ||
      item.meta_title?.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------------------------
     TABLE COLUMNS
  --------------------------------- */
  const columns = [
    {
      name: "SL No",
      selector: (_, index) => index + 1 + currentPage * rowsPerPage,
      width: "80px",
      center: true,
    },
    {
      name: "Page Title",
      selector: (row) => row.page_title,
      sortable: true,
      wrap: true,
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
            src={`${baseURL}/${row.banner_image}`}
            alt="Banner"
            style={{
              width: 120,
              height: 70,
              objectFit: "cover",
              borderRadius: 6,
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
        /* LOADER */
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <div
            className="spinner-border"
            role="status"
            style={{ width: "3rem", height: "3rem", color: "#D4AA2D" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <DataTable
          title="Happenings Page SEO Settings"
          columns={columns}
          data={filteredData}
          highlightOnHover
          pagination
          onChangePage={(page) => setCurrentPage(page - 1)}
          onChangeRowsPerPage={(newPerPage) =>
            setRowsPerPage(newPerPage)
          }
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
