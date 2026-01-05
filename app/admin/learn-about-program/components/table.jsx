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
        FETCH LEARN ABOUT PROGRAM
  ------------------------------ */
  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/learn-about-program");

      // API returns array
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching Learn About Program:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
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
        ADD PROGRAM
  ------------------------------ */
  const handleAddSave = async (newData) => {
    try {
      // newData = { title, video_url }
      await api.post("/api/learn-about-program", newData);
      fetchPrograms();
      setShowAddModal(false);
    } catch (error) {
      console.error("Add failed:", error);
    }
  };

  /* -----------------------------
        UPDATE PROGRAM
  ------------------------------ */
  const handleEditSave = async (updatedData) => {
    try {
      // updatedData = { title, video_url }
      await api.put(
        `/api/learn-about-program/${editRow._id}`,
        updatedData
      );
      fetchPrograms();
      closeEditModal();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  /* -----------------------------
        DELETE PROGRAM
  ------------------------------ */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await api.delete(`/api/learn-about-program/${id}`);
      fetchPrograms();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* -----------------------------
        SEARCH FILTER
  ------------------------------ */
  const filteredData = data.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  /* -----------------------------
        TABLE COLUMNS
  ------------------------------ */
  const columns = [
    {
      name: "SL",
      width: "70px",
      center: true,
      selector: (_, index) => index + 1,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
    },
    {
      name: "Video",
      center: true,
      width: "120px",
      cell: (row) =>
        row.video_url ? (
          <a
            href={row.video_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-primary"
          >
            View Video
          </a>
        ) : (
          <span className="text-muted">N/A</span>
        ),
    },
    
    {
      name: "Action",
      center: true,
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
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-success"
          onClick={() => setShowAddModal(true)}
          disabled={loading}
        >
          <Plus size={18} className="me-2" />
          Add Learn About Program
        </button>
      </div>

      {/* TABLE */}
      {loading ? (
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
          title="Learn About Program List"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search by title..."
              style={{ width: "250px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
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

      {/* EDIT MODAL */}
      {showEditModal && (
        <EditFieldModal
          show={showEditModal}
          field={editRow}
          onClose={closeEditModal}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default Table;
