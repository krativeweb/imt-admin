"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Plus, Trash2 } from "lucide-react";
import EditFacultyModal from "./modals/editfield";
import AddFacultyModal from "./modals/addfield";
import api from "../../lib/api";

const Table = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // ✅ loader

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ---------------------------------
     FETCH ALL FACULTY
  --------------------------------- */
  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/faculty");
      setData(res.data || []);
    } catch (error) {
      console.error("Error fetching faculty:", error);
    } finally {
      setLoading(false); // ✅ stop loader
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  /* ---------------------------------
     MODAL HANDLERS
  --------------------------------- */
  const openEditModal = (row) => {
    setEditRow(row);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditRow(null);
  };

  /* ---------------------------------
     ADD FACULTY
  --------------------------------- */
  const handleAddSave = async (formData) => {
    try {
      await api.post("/api/faculty", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchFaculty();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add faculty failed:", err);
    }
  };

  /* ---------------------------------
     UPDATE FACULTY
  --------------------------------- */
  const handleEditSave = async (formData) => {
    try {
      await api.put(`/api/faculty/${editRow._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchFaculty();
      closeEditModal();
    } catch (err) {
      console.error("Update faculty failed:", err);
    }
  };

  /* ---------------------------------
     DELETE FACULTY
  --------------------------------- */
  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete faculty "${row.name}"?`
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/faculty/${row._id}`);
      await fetchFaculty();
    } catch (err) {
      console.error("Delete faculty failed:", err);
    }
  };

  /* ---------------------------------
     SEARCH FILTER
  --------------------------------- */
  const filteredData = data.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.designation?.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------------------------
     FACULTY IMAGE CELL
  --------------------------------- */
  const renderFacultyImage = (row) => {
    if (!row.faculty_image) {
      return (
        <div
          style={{
            width: 45,
            height: 45,
            borderRadius: "50%",
            background: "#e9ecef",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: "bold",
            color: "#6c757d",
          }}
        >
          {row.name?.charAt(0)}
        </div>
      );
    }

    const imagePath = row.faculty_image
      .replace(/\\/g, "/")
      .replace(/^\/+/g, "");

    return (
      <img
        src={`${baseURL}/${imagePath}`}
        alt={row.name}
        width="45"
        height="45"
        style={{
          objectFit: "cover",
          borderRadius: "50%",
          border: "1px solid #dee2e6",
        }}
      />
    );
  };

  /* ---------------------------------
     TABLE COLUMNS
  --------------------------------- */
  const columns = [
    {
      name: "SL No",
      selector: (row, index) => index + 1 + currentPage * rowsPerPage,
      width: "80px",
      center: true,
    },
    {
      name: "Faculty Image",
      center: true,
      width: "120px",
      cell: (row) => renderFacultyImage(row),
    },
    {
      name: "Faculty Name",
      selector: (row) => row.name,
      sortable: true,
      center: true,
    },
    {
      name: "Designation",
      selector: (row) => row.designation || "-",
      center: true,
    },
    {
      name: "Action",
      center: true,
      width: "140px",
      cell: (row) => (
        <div className="d-flex gap-3 justify-content-center">
          <Pencil
            size={18}
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => openEditModal(row)}
          />
          <Trash2
            size={18}
            className="text-danger"
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(row)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-2">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold mb-0">Faculty List</h4>

        <button
          className="btn btn-primary d-flex align-items-center gap-2"
          onClick={() => setShowAddModal(true)}
          disabled={loading}
        >
          <Plus size={16} />
          Add Faculty
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
          columns={columns}
          data={filteredData}
          highlightOnHover
          pagination
          onChangePage={(page) => setCurrentPage(page - 1)}
          onChangeRowsPerPage={(newPerPage) => setRowsPerPage(newPerPage)}
          subHeader
          subHeaderAlign="right"
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search faculty..."
              style={{ width: "250px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      )}

      {/* ADD MODAL */}
      {showAddModal && (
        <AddFacultyModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}

      {/* EDIT MODAL */}
      {showEditModal && editRow && (
        <EditFacultyModal
          show={showEditModal}
          onClose={closeEditModal}
          field={editRow}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default Table;
