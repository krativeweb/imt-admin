"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil } from "lucide-react";
import EditfieldModal from "./modals/editfield";
import api from "../../lib/api";

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  /* ---------------------------------
     FETCH CONTACT INFO PAGES
  --------------------------------- */
  const fetchPages = async () => {
    try {
      setLoading(true);

      // 🔥 CONTACT INFO API
      const res = await api.get("/api/contact-info");

      // Backend returns ARRAY
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching Contact Info pages:", error);
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
     UPDATE CONTACT INFO
  --------------------------------- */
  const handleEditSave = async (formData) => {
    if (!editRow?._id) return;

    try {
      await api.put(
        `/api/contact-info/${editRow._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      await fetchPages();
      closeEditModal();
    } catch (err) {
      console.error("Contact Info update failed:", err);
    }
  };

  /* ---------------------------------
     TABLE COLUMNS
  --------------------------------- */
  const columns = [
    {
      name: "SL No",
      width: "80px",
      center: true,
      cell: (_, index) => index + 1,
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
      cell: (row) =>
        row.banner_image ? (
          <img
            src={`${baseURL}${row.banner_image}`}
            alt={row.page_title}
            width="80"
            height="40"
            style={{
              objectFit: "cover",
              borderRadius: "6px",
              border: "1px solid #ddd",
            }}
          />
        ) : (
          <span className="text-muted">No Image</span>
        ),
    },
    {
      name: "Action",
      center: true,
      width: "120px",
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
          title="Contact Information CMS"
          columns={columns}
          data={data}
          highlightOnHover
          pagination={false}   // Usually single page for contact info
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
