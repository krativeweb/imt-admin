"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2, Plus } from "lucide-react";

import AddStudentsOnRollModal from "./modals/addfield";
import EditStudentsOnRollModal from "./modals/editfield";

import api from "../../lib/api";

const StudentsOnRollTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);

  /* -----------------------------
        FETCH STUDENTS
  ------------------------------ */
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/students-on-roll");
      setData(res.data.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /* -----------------------------
        ADD STUDENT
  ------------------------------ */
  const handleAddSave = async (newData) => {
    try {
      const formData = new FormData();

      Object.keys(newData).forEach((key) => {
        if (newData[key]) {
          formData.append(key, newData[key]);
        }
      });

      await api.post("/api/students-on-roll", formData);
      fetchStudents();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  /* -----------------------------
        EDIT STUDENT
  ------------------------------ */
  const handleEditSave = async (updatedData) => {
    try {
      const formData = new FormData();

      Object.keys(updatedData).forEach((key) => {
        if (updatedData[key]) {
          formData.append(key, updatedData[key]);
        }
      });

      await api.put(
        `/api/students-on-roll/${editRow._id}`,
        formData
      );

      fetchStudents();
      setShowEditModal(false);
      setEditRow(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* -----------------------------
        DELETE STUDENT
  ------------------------------ */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      await api.delete(`/api/students-on-roll/${id}`);
      fetchStudents();
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
      width: "90px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Joining Year",
      selector: (row) => row.joining_year,
      width: "120px",
    },
    {
      name: "Specialization",
      selector: (row) => row.specialization,
      wrap: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
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
            onClick={() => {
              setEditRow(row);
              setShowEditModal(true);
            }}
          />
          <Trash2
            size={18}
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(row._id)}
          />
        </>
      ),
      width: "120px",
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
          Add Student
        </button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-warning" />
        </div>
      ) : (
        <DataTable
          title="Students on Roll"
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          responsive
        />
      )}

      {/* ADD MODAL */}
      {showAddModal && (
        <AddStudentsOnRollModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <EditStudentsOnRollModal
          show={showEditModal}
          field={editRow}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default StudentsOnRollTable;
