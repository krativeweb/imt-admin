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
        FETCH ALL AWARDS
  ===================================== */
  const fetchAwards = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/awards");
      setData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching awards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAwards();
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
        UPDATE AWARD
  ===================================== */
  const handleEditSave = async (updatedData) => {
    try {
      const formData = new FormData();
      formData.append("title", updatedData.title);
      formData.append("type", updatedData.type);
      formData.append("content", updatedData.content);

      if (updatedData.image) {
        formData.append("image", updatedData.image);
      }

      await api.put(`/api/awards/${editRow._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchAwards();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* =====================================
        DELETE AWARD
  ===================================== */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this award?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/awards/${id}`);
      fetchAwards();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* =====================================
        ADD AWARD
  ===================================== */
  const handleAddSave = async (newData) => {
    try {
      const formData = new FormData();
      formData.append("image", newData.image);
      formData.append("title", newData.title);
      formData.append("type", newData.type);
      formData.append("content", newData.content);

      await api.post("/api/awards", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchAwards();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  /* =====================================
        SEARCH FILTER
  ===================================== */
  const filteredData = data.filter((item) =>
    (item.title || "").toLowerCase().includes(search.toLowerCase())
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
      width: "100px",
      cell: (row) =>
        row.image ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/${row.image}`}
            alt="Award"
            style={{
              width: "60px",
              height: "40px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        ) : (
          "-"
        ),
    },
    {
      name: "Title",
      selector: (row) => row.title,
      wrap: true,
    },
    {
      name: "Type",
      selector: (row) => row.type,
      width: "180px",
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
          <Plus size={18} className="me-2" /> Add Award
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
          title="Awards List"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search Title..."
              style={{ width: "250px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      )}

      {/* Edit Award Modal */}
      {showEditModal && (
        <EditFieldModal
          show={showEditModal}
          field={editRow}
          onClose={closeEditModal}
          onSave={handleEditSave}
        />
      )}

      {/* Add Award Modal */}
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
