"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2, Plus, FileText } from "lucide-react";

import EditNewsletterModal from "./modals/editfield";
import AddNewsletterModal from "./modals/addfield";
import api from "../../lib/api";

const NewsletterTable = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  /* ===============================
      FETCH NEWSLETTERS
  =============================== */
  const fetchNewsletters = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/newsletters");
      setData(res.data || []);
    } catch (error) {
      console.error("Error fetching newsletters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  /* ===============================
      EDIT
  =============================== */
  const openEditModal = (row) => {
    setEditRow(row);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditRow(null);
  };

  const handleEditSave = async (updatedData) => {
    try {
      await api.put(`/api/newsletters/${updatedData._id}`, updatedData);
      fetchNewsletters();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* ===============================
      SOFT DELETE
  =============================== */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this newsletter?")) return;

    try {
      await api.delete(`/api/newsletters/${id}`);
      fetchNewsletters();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* ===============================
      ADD
  =============================== */
  const handleAddSave = async (newData) => {
    try {
      await api.post("/api/newsletters", newData);
      fetchNewsletters();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  /* ===============================
      SEARCH FILTER
  =============================== */
  const filteredData = data.filter((item) =>
    `${item.month} ${item.year}`.toLowerCase().includes(search.toLowerCase())
  );

  /* ===============================
      TABLE COLUMNS
  =============================== */
  const columns = [
    {
      name: "SL",
      selector: (_, index) => index + 1,
      width: "70px",
    },
    {
      name: "Month",
      selector: (row) => row.month,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
      width: "100px",
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
          <Plus size={18} className="me-2" /> Add Newsletter
        </button>
      </div>

      {loading ? (
        /* 🔄 Loader */
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
          title="Newsletter List"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search month or year..."
              style={{ width: "250px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <EditNewsletterModal
          show={showEditModal}
          field={editRow}
          onClose={closeEditModal}
          onSave={handleEditSave}
        />
      )}

      {/* Add Modal */}
      {showAddModal && (
        <AddNewsletterModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}
    </div>
  );
};

export default NewsletterTable;
