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

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  /* -----------------------------
        FETCH STUDENT TUTORIALS
  ------------------------------ */
  const fetchStudentTutorials = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/student-tutorials");
      setData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching Student Tutorials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentTutorials();
  }, []);

  /* -----------------------------
        MODAL HANDLERS
  ------------------------------ */
  const openEditModal = (row) => {
    setEditRow(row);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setEditRow(null);
    setShowEditModal(false);
  };

  /* -----------------------------
        ADD
  ------------------------------ */
  const handleAddSave = async (newData) => {
    try {
      const formData = new FormData();
      formData.append("name", newData.name);
      formData.append("image", newData.image);
      formData.append("description", newData.description);

      await api.post("/api/student-tutorials", formData);
      fetchStudentTutorials();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add Student Tutorial failed:", err);
    }
  };

  /* -----------------------------
        UPDATE
  ------------------------------ */
  const handleEditSave = async (updatedData) => {
    try {
      const formData = new FormData();
      formData.append("name", updatedData.name);
      formData.append("description", updatedData.description);

      if (updatedData.image) {
        formData.append("image", updatedData.image);
      }

      await api.put(
        `/api/student-tutorials/${editRow._id}`,
        formData
      );

      fetchStudentTutorials();
      closeEditModal();
    } catch (err) {
      console.error("Update Student Tutorial failed:", err);
    }
  };

  /* -----------------------------
        DELETE
  ------------------------------ */
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/student-tutorials/${id}`);
      fetchStudentTutorials();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* -----------------------------
        SEARCH FILTER
  ------------------------------ */
  const filteredData = data.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  const getImageUrl = (path) => {
    if (!path) return null;
  
    // if backend already gives /api/...
    if (path.startsWith("/api")) {
      return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
    }
  
    // fallback
    return `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
  };
  

  /* -----------------------------
        TABLE COLUMNS
  ------------------------------ */
  const columns = [
    {
      name: "SL",
      selector: (_, index) => index + 1,
      width: "70px",
    },
    {
      name: "Student Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Image",
      cell: (row) =>
        row.image ? (
          <img
  src={getImageUrl(row.image)}
  alt={row.name}
  style={{
    width: "80px",
    height: "50px",
    objectFit: "contain",
    background: "#fff",
    borderRadius: "4px",
    border: "1px solid #ddd",
  }}
  onError={(e) => {
    e.target.src = "/no-image.png"; // optional fallback
  }}
/>
        ) : (
          <span className="text-muted">No Image</span>
        ),
    },
    {
      name: "Action",
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
          onClick={() => setShowAddModal(true)}
          disabled={loading}
        >
          <Plus size={18} className="me-2" />
          Add Student Tutorial
        </button>
      </div>

      {/* TABLE / LOADER */}
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <div className="spinner-border" role="status" />
        </div>
      ) : (
        <DataTable
          title="Student Tutorials List"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search by student name..."
              style={{ width: "250px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <EditFieldModal
          show={showEditModal}
          field={editRow}
          onClose={closeEditModal}
          onSave={handleEditSave}
        />
      )}

      {/* ADD MODAL */}
      {showAddModal && (
        <AddFieldModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}
    </div>
  );
};

export default Table;
