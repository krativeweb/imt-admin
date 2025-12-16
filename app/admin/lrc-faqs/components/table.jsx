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
  const [loading, setLoading] = useState(true); // ✅ loader

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  /* =====================================
        FETCH ALL FAQ
  ===================================== */
  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/lrc-faq");
      setData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false); // ✅ stop loader
    }
  };

  useEffect(() => {
    fetchFaqs();
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
        UPDATE FAQ
  ===================================== */
  const handleEditSave = async (updatedData) => {
    try {
      await api.put(`/api/lrc-faq/${editRow._id}`, {
        question: updatedData.question,
        answer: updatedData.answer,
      });

      fetchFaqs();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* =====================================
        DELETE FAQ
  ===================================== */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this FAQ?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/lrc-faq/${id}`);
      fetchFaqs();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* =====================================
        ADD FAQ
  ===================================== */
  const handleAddSave = async (newData) => {
    try {
      await api.post("/api/lrc-faq", {
        question: newData.question,
        answer: newData.answer,
      });

      fetchFaqs();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  /* =====================================
        SEARCH FILTER
  ===================================== */
  const filteredData = data.filter((item) =>
    (item.question || "").toLowerCase().includes(search.toLowerCase())
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
      name: "Question",
      selector: (row) => row.question,
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
          <Plus size={18} className="me-2" /> Add FAQ
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
          title="FAQ List"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search Question..."
              style={{ width: "250px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      )}

      {/* Edit FAQ Modal */}
      {showEditModal && (
        <EditFieldModal
          show={showEditModal}
          field={editRow}
          onClose={closeEditModal}
          onSave={handleEditSave}
        />
      )}

      {/* Add FAQ Modal */}
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
