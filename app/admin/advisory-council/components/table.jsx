"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2, Plus } from "lucide-react";

import EditMemberModal from "./modals/editfield";
import AddMemberModal from "./modals/addfield";
import api from "../../lib/api";

const Table = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(""); // ✅ SEARCH STATE
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  /* -----------------------------
        FETCH MEMBERS
  ------------------------------ */
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/advisory-council");
      setData(res.data.data || []);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  /* -----------------------------
        MODAL HANDLERS
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
        ADD MEMBER
  ------------------------------ */
  const handleAddSave = async (newData) => {
    try {
      const formData = new FormData();
      formData.append("type", newData.type);
      formData.append("name", newData.name);
      formData.append("designation", newData.designation);
      formData.append("role_expertise", newData.role_expertise);
      formData.append("image", newData.image);

      await api.post("/api/advisory-council", formData);
      fetchMembers();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  /* -----------------------------
        EDIT MEMBER
  ------------------------------ */
  const handleEditSave = async (updatedData) => {
    try {
      const formData = new FormData();
      formData.append("type", updatedData.type);
      formData.append("name", updatedData.name);
      formData.append("designation", updatedData.designation);
      formData.append("role_expertise", updatedData.role_expertise);

      if (updatedData.image) {
        formData.append("image", updatedData.image);
      }

      await api.put(
        `/api/advisory-council/${editRow._id}`,
        formData
      );

      fetchMembers();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* -----------------------------
        DELETE MEMBER
  ------------------------------ */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this member?")) return;

    try {
      await api.delete(`/api/advisory-council/${id}`);
      fetchMembers();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* -----------------------------
        SEARCH FILTER
  ------------------------------ */
  const filteredData = data.filter((item) =>
    (
      item.name +
      item.designation +
      item.role_expertise +
      item.type
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* -----------------------------
        TABLE COLUMNS
  ------------------------------ */
  const columns = [
    {
      name: "SL",
      selector: (_, index) => index + 1,
      width: "70px",
      center: true,
    },
    {
      name: "Image",
      center: true,
      width: "100px",
      cell: (row) => (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/${row.image}`}
          alt={row.name}
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            borderRadius: "6px",
          }}
        />
      ),
    },
    {
      name: "Type",
      selector: (row) =>
        row.type === "ADVISORY_COUNCIL"
          ? "Advisory Council"
          : "Affiliated Faculty & Practitioners (Innovation)",
      wrap: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
      wrap: true,
    },
    {
      name: "Role / Expertise",
      selector: (row) => row.role_expertise,
      wrap: true,
    },
    {
      name: "Action",
      center: true,
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
        >
          <Plus size={18} className="me-2" />
          Add Member
        </button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-warning" />
        </div>
      ) : (
        <DataTable
          title="Members List"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, designation, role or type..."
              style={{ width: "300px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      )}

      {/* ADD MODAL */}
      {showAddModal && (
        <AddMemberModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <EditMemberModal
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
