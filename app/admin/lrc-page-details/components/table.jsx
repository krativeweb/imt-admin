"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil } from "lucide-react";
import EditfieldModal from "./modals/editfield";
import api from "../../lib/api";

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loader

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  /* ---------------------------------
     FETCH LRC PAGE DATA
  --------------------------------- */
  const fetchLrcPage = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/lrc-page");

      // backend returns single object → convert to array
      setData(res.data ? [res.data] : []);
    } catch (error) {
      console.error("Error fetching LRC page:", error);
    } finally {
      setLoading(false); // ✅ stop loader
    }
  };

  useEffect(() => {
    fetchLrcPage();
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
     UPDATE LRC PAGE
  --------------------------------- */
  const handleEditSave = async (updatedData) => {
    try {
      const res = await api.put(`/api/lrc-page/${editRow._id}`, updatedData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.data) {
        await fetchLrcPage();
        closeEditModal();
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* ---------------------------------
     TABLE COLUMNS
  --------------------------------- */
  const columns = [
    {
      name: "Page Title",
      selector: (row) => row.page_title,
      center: true,
    },
    {
      name: "Page Slug",
      selector: (row) => row.page_slug,
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

        const imagePath = row.banner_image
          .replace(/\\/g, "/")
          .replace(/^\/+/g, "");

        return (
          <img
            src={`${baseURL}/${imagePath}`}
            alt="Banner"
            width="90"
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
        /* 🔄 Loader */
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "250px" }}
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
          title="LRC Page SEO & Content"
          columns={columns}
          data={data}
          highlightOnHover
          pagination={false} // only one row
        />
      )}

      {showEditModal && editRow && (
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
