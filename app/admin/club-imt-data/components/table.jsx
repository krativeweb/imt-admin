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

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  /* -----------------------------
        FETCH CLUB IMT DATA
  ------------------------------ */
  const fetchClubImt = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/club-imt-data`);
      setData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching Club IMT Data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubImt();
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
        SAVE EDIT CLUB IMT
  ------------------------------ */
  const handleEditSave = async (updatedData) => {
    try {
      await api.put(
        `/api/club-imt-data/${editRow._id}`,
        updatedData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      fetchClubImt();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* -----------------------------
        DELETE CLUB IMT
  ------------------------------ */
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/club-imt-data/${id}`);
      fetchClubImt();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* -----------------------------
        ADD CLUB IMT
  ------------------------------ */
  const handleAddSave = async (formData) => {
    try {
      await api.post(`/api/club-imt-data`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchClubImt();
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
      name: "Tab Title",
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
            alt="Tab"
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
          Add Club IMT Data
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
          title="Club IMT Data List"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search by Tab Title..."
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
