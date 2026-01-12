"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2, Plus } from "lucide-react";

import AddMediaRoomModal from "./modals/addfield";
import EditMediaRoomModal from "./modals/editfield";
import api from "../../lib/api";

const MediaRoomTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);

  /* -----------------------------
        FETCH MEDIA
  ------------------------------ */
  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/media-room");
      setData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching media room:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  /* -----------------------------
        ADD MEDIA
  ------------------------------ */
  const handleAddSave = async (newData) => {
    try {
      const formData = new URLSearchParams();
      formData.append("title", newData.title);
      formData.append("year", newData.year);
      formData.append("content", newData.content);
  
      await api.post("/api/media-room", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
  
      await fetchMedia();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add failed:", err.response?.data || err);
    }
  };
  
  /* -----------------------------
        EDIT MEDIA
  ------------------------------ */
  const handleEditSave = async (updatedData) => {
    try {
      await api.put(`/api/media-room/${editRow._id}`, updatedData);
      await fetchMedia();
      setShowEditModal(false);
      setEditRow(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* -----------------------------
        DELETE MEDIA
  ------------------------------ */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this media item?")) return;

    try {
      await api.delete(`/api/media-room/${id}`);
      fetchMedia();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* -----------------------------
        TABLE COLUMNS
  ------------------------------ */
  const columns = [
    {
      name: "SL",
      width: "70px",
      cell: (_, index) => (
        <div style={{ textAlign: "center", width: "100%" }}>
          {index + 1}
        </div>
      ),
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
    },
    {
      name: "Year",
      width: "100px",
      cell: (row) => (
        <div style={{ textAlign: "center", width: "100%" }}>
          {row.year}
        </div>
      ),
    },
    {
      name: "Action",
      width: "120px",
      cell: (row) => (
        <div className="d-flex justify-content-center">
          <Pencil
            size={18}
            className="text-primary me-3"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditRow(row);
              setShowEditModal(true);
            }}
          />
          <Trash2
            size={18}
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(row._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-2">
      {/* ADD BUTTON */}
      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn-success"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} className="me-2" />
          Add Media
        </button>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-warning" />
        </div>
      ) : (
        <DataTable
          title="Media Room"
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          responsive
        />
      )}

      {/* ADD MODAL */}
      {showAddModal && (
        <AddMediaRoomModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}

      {/* EDIT MODAL */}
      {showEditModal && editRow && (
        <EditMediaRoomModal
          show={showEditModal}
          field={editRow}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default MediaRoomTable;
