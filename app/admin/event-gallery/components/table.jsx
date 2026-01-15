"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2, Plus } from "lucide-react";
import EditFieldModal from "./modals/editfield";
import AddFieldModal from "./modals/addfield";
import api from "../../lib/api";

const Table = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editRow, setEditRow] = useState(null); // null = ADD, object = EDIT

  /* ===============================
        FETCH EVENT GALLERY
  ================================ */
  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/event-gallery");
      setData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching event gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  /* ===============================
        OPEN MODALS
  ================================ */
  const openAddModal = () => {
    setEditRow(null);
    setShowModal(true);
  };

  const openEditModal = (row) => {
    setEditRow(row);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditRow(null);
  };

  /* ===============================
        ADD / EDIT SAVE
  ================================ */
  const handleSave = async (formValues) => {
    try {
      const formData = new FormData();

      if (formValues.images) {
        formData.append("image", formValues.images);
      }

      formData.append("content", formValues.content || "");

      if (editRow) {
        // ✏️ EDIT
        await api.put(
          `/api/event-gallery/edit/${editRow._id}`,
          formData
        );
      } else {
        // ➕ ADD
        await api.post("/api/event-gallery/add", formData);
      }

      fetchGallery();
      closeModal();
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  /* ===============================
        DELETE EVENT GALLERY
  ================================ */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event photo?")) return;

    try {
      await api.delete(`/api/event-gallery/delete/${id}`);
      fetchGallery();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* ===============================
        SEARCH FILTER
  ================================ */
  const filteredData = data.filter((item) =>
    (item.content || "").toLowerCase().includes(search.toLowerCase())
  );

  /* ===============================
        TABLE COLUMNS
  ================================ */
  const columns = [
    {
      name: "SL",
      selector: (_, index) => index + 1,
      width: "70px",
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={
            row.image.startsWith("http")
              ? row.image
              : `${process.env.NEXT_PUBLIC_API_URL}/${row.image}`
          }
          alt="Event"
          width="90"
          style={{
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      ),
    },
    {
      name: "Action",
      width: "120px",
      cell: (row) => (
        <>
          <Pencil
            size={18}
            className="text-primary me-3"
            style={{ cursor: "pointer" }}
            onClick={() => openEditModal(row)}
          />
          <Trash2
            size={18}
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(row._id)}
          />
        </>
      ),
    },
  ];

  return (
    <div className="p-2">
      {/* ADD BUTTON */}
      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn-success"
          onClick={openAddModal}
          disabled={loading}
        >
          <Plus size={18} className="me-2" />
          Add Event Photo
        </button>
      </div>

      {/* LOADER */}
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
          />
        </div>
      ) : (
        <DataTable
          title="Event Gallery"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search content..."
              style={{ width: "250px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      )}

      {/* ADD / EDIT MODAL */}
      {showModal &&
        (editRow ? (
          <EditFieldModal
            show={showModal}
            onClose={closeModal}
            onSave={handleSave}
            field={editRow}
          />
        ) : (
          <AddFieldModal
            show={showModal}
            onClose={closeModal}
            onSave={handleSave}
          />
        ))}
    </div>
  );
};

export default Table;
