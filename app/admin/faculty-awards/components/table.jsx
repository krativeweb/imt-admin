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

  /* =====================================
        FETCH ALL FACULTY AWARDS
  ===================================== */
  const fetchFacultyAwards = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/faculty-awards");
      setData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching faculty awards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacultyAwards();
  }, []);

  /* =====================================
        OPEN / CLOSE EDIT
  ===================================== */
  const openEditModal = (row) => {
    setEditRow(row);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditRow(null);
  };

  /* =====================================
        UPDATE FACULTY AWARD
  ===================================== */
  const handleEditSave = async (updatedData) => {
    try {
      const formData = new FormData();
      formData.append("content", updatedData.content);

      if (updatedData.image) {
        formData.append("image", updatedData.image);
      }

      await api.put(
        `/api/faculty-awards/${editRow._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      fetchFacultyAwards();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* =====================================
        DELETE FACULTY AWARD (SOFT)
  ===================================== */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this faculty award?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/faculty-awards/${id}`);
      fetchFacultyAwards();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* =====================================
        ADD FACULTY AWARD
  ===================================== */
  const handleAddSave = async (newData) => {
    try {
      const formData = new FormData();
      formData.append("image", newData.image);
      formData.append("content", newData.content);

      await api.post("/api/faculty-awards", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchFacultyAwards();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  /* =====================================
        SEARCH FILTER (CONTENT)
  ===================================== */
  const filteredData = data.filter((item) =>
    (item.content || "").toLowerCase().includes(search.toLowerCase())
  );

  /* =====================================
        TABLE COLUMNS
  ===================================== */
  const columns = [
    {
      name: "SL",
      selector: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Image",
      width: "120px",
      cell: (row) =>
        row.image ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/${row.image}`}
            alt="Faculty Award"
            style={{
              width: "70px",
              height: "45px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        ) : (
          "-"
        ),
    },
    {
      name: "Content",
      selector: (row) =>
        row.content
          ?.replace(/<[^>]*>?/gm, "")
          .substring(0, 80) + "...",
      wrap: true,
    },
    {
      name: "Action",
      width: "150px",
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
      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn-success"
          onClick={() => setShowAddModal(true)}
          disabled={loading}
        >
          <Plus size={18} className="me-2" /> Add Faculty Award
        </button>
      </div>

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
          title="Faculty Awards"
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

      {/* Edit Modal */}
      {showEditModal && (
        <EditFieldModal
          show={showEditModal}
          field={editRow}
          onClose={closeEditModal}
          onSave={handleEditSave}
        />
      )}

      {/* Add Modal */}
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
