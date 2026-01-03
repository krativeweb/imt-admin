"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2, Plus } from "lucide-react";

import EditAffiliatedFacultyPractitionerModal from "./modals/editfield";
import AddAffiliatedFacultyPractitionerModal from "./modals/addfield";

import api from "../../lib/api";

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  /* -----------------------------
        FETCH FACULTY / PRACTITIONERS
  ------------------------------ */
  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        "/api/affiliated-faculty-practitioners-innovation"
      );
      setData(res.data.data || []);
    } catch (error) {
      console.error(
        "Error fetching affiliated faculty/practitioners:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
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
      formData.append("name", newData.name);
      formData.append("designation", newData.designation);
      formData.append("role_expertise", newData.role_expertise);
      formData.append("image", newData.image);

      await api.post(
        "/api/affiliated-faculty-practitioners-innovation",
        formData
      );

      fetchFaculty();
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
      formData.append("name", updatedData.name);
      formData.append("designation", updatedData.designation);
      formData.append("role_expertise", updatedData.role_expertise);

      if (updatedData.image) {
        formData.append("image", updatedData.image);
      }

      await api.put(
        `/api/affiliated-faculty-practitioners-innovation/${editRow._id}`,
        formData
      );

      fetchFaculty();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* -----------------------------
        DELETE MEMBER
  ------------------------------ */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;

    try {
      await api.delete(
        `/api/affiliated-faculty-practitioners-innovation/${id}`
      );
      fetchFaculty();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* -----------------------------
        TABLE COLUMNS
  ------------------------------ */
  const columns = [
    {
      name: "SL",
      selector: (_, index) => index + 1,
      width: "70px",
    },
    {
      name: "Image",
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
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Designation / Affiliation",
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
          Add Faculty / Practitioner
        </button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-warning" />
        </div>
      ) : (
        <DataTable
          title="Affiliated Faculty & Practitioners – Innovation"
          columns={columns}
          data={data}
          pagination
          highlightOnHover
        />
      )}

      {/* ADD MODAL */}
      {showAddModal && (
        <AddAffiliatedFacultyPractitionerModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <EditAffiliatedFacultyPractitionerModal
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
