"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2, Plus } from "lucide-react";
import EditFieldModal from "./modals/editfield";
import AddFieldModal from "./modals/addfield";
import api from "../../lib/api";

const CorporateConnectTable = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  /* =====================================
        FETCH ALL CORPORATE CONNECT
  ===================================== */
  const fetchCorporateConnect = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/corporate-connect");
      setData(res.data || []);
    } catch (error) {
      console.error("Error fetching Corporate Connect:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCorporateConnect();
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
        UPDATE
  ===================================== */
  const handleEditSave = async (updatedData) => {
    try {
      await api.put(`/api/corporate-connect/${editRow._id}`, updatedData);
      fetchCorporateConnect();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* =====================================
        SOFT DELETE
  ===================================== */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
      await api.delete(`/api/corporate-connect/${id}`);
      fetchCorporateConnect();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* =====================================
        ADD
  ===================================== */
  const handleAddSave = async (newData) => {
    try {
      await api.post("/api/corporate-connect", newData);
      fetchCorporateConnect();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  /* =====================================
        SEARCH FILTER
  ===================================== */
  const filteredData = data.filter(
    (item) =>
      item.tab_type?.toLowerCase().includes(search.toLowerCase()) ||
      item.academic_year?.toLowerCase().includes(search.toLowerCase())
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
      name: "Tab Type",
      selector: (row) => row.tab_type,
      sortable: true,
       width: "140px",
 
    },
    {
      name: "Academic Year",
      selector: (row) => row.academic_year,
      sortable: true,
   
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
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="fw-bold mb-0">Corporate Connect</h5>
        <button
          className="btn btn-success"
          onClick={() => setShowAddModal(true)}
          disabled={loading}
        >
          <Plus size={18} className="me-2" />
          Add Content
        </button>
      </div>

      {/* Loader */}
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
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          responsive
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search Tab / Year..."
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

export default CorporateConnectTable;
