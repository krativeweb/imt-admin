"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2, Plus } from "lucide-react";

import EditResearchCasesPublicationModal from "./modals/editfield";
import AddResearchCasesPublicationModal from "./modals/addfield";
import api from "../../lib/api";

const Table = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  /* -----------------------------
        FETCH CASE PUBLICATIONS
  ------------------------------ */
  const fetchCases = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/research-cases-publication");
      setData(res.data.data || []);
    } catch (error) {
      console.error("Error fetching case publications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
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
        ADD CASE
  ------------------------------ */
  const handleAddSave = async (newData) => {
    try {
      const formData = new FormData();
      Object.keys(newData).forEach((key) => {
        if (newData[key]) formData.append(key, newData[key]);
      });

      await api.post("/api/research-cases-publication", formData);
      fetchCases();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  /* -----------------------------
        EDIT CASE
  ------------------------------ */
  const handleEditSave = async (updatedData) => {
    try {
      const formData = new FormData();
      Object.keys(updatedData).forEach((key) => {
        if (updatedData[key]) formData.append(key, updatedData[key]);
      });

      await api.put(
        `/api/research-cases-publication/${editRow._id}`,
        formData
      );

      fetchCases();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* -----------------------------
        DELETE CASE
  ------------------------------ */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this case publication?"))
      return;

    try {
      await api.delete(`/api/research-cases-publication/${id}`);
      fetchCases();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* -----------------------------
        SEARCH FILTER
  ------------------------------ */
  const filteredData = data.filter((item) =>
    (
      item.title +
      item.name +
      item.authors +
      item.publisher +
      item.reference +
      item.academic_year
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
      cell: (row) =>
        row.image ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/${row.image}`}
            alt={row.title}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        ) : (
          <span className="text-muted">No Image</span>
        ),
    },

    {
      name: "Year",
      selector: (row) => row.academic_year,
      sortable: true,
      width: "120px",
    },

    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true,
    },

    {
      name: "Title",
      selector: (row) => row.title,
      wrap: true,
      grow: 2,
    },

     

    {
      name: "URL",
      center: true,
      cell: (row) =>
        row.case_url ? (
          <a
            href={row.case_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            View
          </a>
        ) : (
          "-"
        ),
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
          disabled={loading}
        >
          <Plus size={18} className="me-2" />
          Add Case Publication
        </button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-warning" />
        </div>
      ) : (
        <DataTable
          title="Research Case Publications"
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
              placeholder="Search by name, title, authors, publisher, reference or year..."
              style={{ width: "420px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      )}

      {/* ADD MODAL */}
      {showAddModal && (
        <AddResearchCasesPublicationModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <EditResearchCasesPublicationModal
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
