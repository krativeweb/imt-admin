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

  /* =============================
        FETCH DATA
  ============================== */
  const fetchResearch = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/research-infocus");
      setData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching Research In Focus:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResearch();
  }, []);

  /* =============================
        MODAL HANDLERS
  ============================== */
  const openEditModal = (row) => {
    setEditRow(row);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditRow(null);
  };

  /* =============================
        EDIT SAVE
  ============================== */
  const handleEditSave = async (formData) => {
    try {
      await api.put(
        `/api/research-infocus/${editRow._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      fetchResearch();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* =============================
        ADD SAVE
  ============================== */
  const handleAddSave = async (formData) => {
    try {
      await api.post(
        `/api/research-infocus`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      fetchResearch();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  /* =============================
        DELETE
  ============================== */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await api.delete(`/api/research-infocus/${id}`);
      fetchResearch();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* =============================
        SEARCH FILTER
  ============================== */
  const filteredData = data.filter((item) =>
    (
      item.name ||
      item.home_title ||
      item.details_page_title ||
      ""
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* =============================
        TABLE COLUMNS
  ============================== */
  const columns = [
    {
      name: "SL",
      selector: (_, index) => index + 1,
      width: "70px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Home Title",
      selector: (row) => row.home_title,
      sortable: true,
      wrap: true,
    },
    
    {
      name: "Image",
      cell: (row) =>
        row.image ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/${row.image}`}
            alt="Image"
            style={{
              width: "80px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "4px",
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
          Add Research In Focus
        </button>
      </div>

      {/* TABLE / LOADER */}
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <div
            className="spinner-border"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <DataTable
          title="Research In Focus List"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or title..."
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
