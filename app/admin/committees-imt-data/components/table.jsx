"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2, Plus } from "lucide-react";
import EditCommitteesImtModal from "./modals/editfield";
import AddCommitteesImtModal from "./modals/addfield";
import api from "../../lib/api";

const Table = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  /* -----------------------------
        FETCH COMMITTEES IMT DATA
  ------------------------------ */
  const fetchCommitteesImt = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/committees-imt-data`);
      setData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching Committees IMT Data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommitteesImt();
  }, []);

  /* -----------------------------
        OPEN / CLOSE MODALS
  ------------------------------ */
  const openEditModal = (row) => {
    setEditRow(row);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditRow(null);
  };

  /* -----------------------------
        SAVE EDIT COMMITTEES IMT
  ------------------------------ */
  const handleEditSave = async (updatedData) => {
    try {
      await api.put(
        `/api/committees-imt-data/${editRow._id}`,
        updatedData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      fetchCommitteesImt();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* -----------------------------
        DELETE COMMITTEES IMT
  ------------------------------ */
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/committees-imt-data/${id}`);
      fetchCommitteesImt();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* -----------------------------
        ADD COMMITTEES IMT
  ------------------------------ */
  const handleAddSave = async (formData) => {
    try {
      await api.post(`/api/committees-imt-data`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchCommitteesImt();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  /* -----------------------------
        SEARCH FILTER
  ------------------------------ */
  const filteredData = data.filter((item) =>
    (item.tab_title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* -----------------------------
        TABLE COLUMNS
  ------------------------------ */
  const columns = [
    {
      name: "SL",
      selector: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Committee Title",
      selector: (row) => row.tab_title,
      sortable: true,
      wrap: true,
    },
    {
      name: "Tab Image",
      cell: (row) =>
        row.tab_image ? (
          <img
            src={`${baseURL}${row.tab_image}`}
            alt="Committee"
            style={{
              width: 120,
              height: 80,
              objectFit: "cover",
              borderRadius: 6,
              border: "1px solid #ddd",
            }}
          />
        ) : (
          <span className="text-muted">No Image</span>
        ),
      width: "160px",
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
      width: "140px",
      center: true,
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
          Add Committees IMT Data
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
          title="Committees IMT Data List"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search by Committee Title..."
              style={{ width: "250px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <EditCommitteesImtModal
          show={showEditModal}
          field={editRow}
          onClose={closeEditModal}
          onSave={handleEditSave}
        />
      )}

      {/* ADD MODAL */}
      {showAddModal && (
        <AddCommitteesImtModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}
    </div>
  );
};

export default Table;
