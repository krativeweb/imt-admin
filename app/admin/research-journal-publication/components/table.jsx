"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2, Plus } from "lucide-react";

import EditResearchArchiveModal from "./modals/editfield";
import AddResearchArchiveModal from "./modals/addfield";
import api from "../../lib/api";

const Table = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  /* -----------------------------
        FETCH PUBLICATIONS
        SORT BY sortDate DESC
  ------------------------------ */
  const fetchPublications = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/research-journal-publication");

      // 🔥 SORT BY DATE (LATEST FIRST)
      const sortedData = (res.data?.data || []).sort(
        (a, b) => new Date(b.sortDate) - new Date(a.sortDate)
      );

      setData(sortedData);
    } catch (error) {
      console.error("Error fetching publications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublications();
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
        ADD PUBLICATION
  ------------------------------ */
  const handleAddSave = async (newData) => {
    try {
      const formData = new FormData();
      Object.keys(newData).forEach((key) => {
        if (newData[key]) {
          formData.append(key, newData[key]);
        }
      });

      await api.post("/api/research-journal-publication", formData);
      fetchPublications();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  /* -----------------------------
        EDIT PUBLICATION
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
        `/api/research-journal-publication/${editRow._id}`,
        formData
      );

      fetchPublications();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* -----------------------------
        DELETE PUBLICATION
  ------------------------------ */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this publication?")) return;

    try {
      await api.delete(`/api/research-journal-publication/${id}`);
      fetchPublications();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* -----------------------------
        SEARCH FILTER
  ------------------------------ */
  const filteredData = data.filter((item) =>
    (
      item.publication_title +
      item.author_name +
      item.journal_name +
      item.academic_year
    )
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  /* -----------------------------
        TABLE COLUMNS
        ❌ Publication Date HIDDEN
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
            alt={row.author_name}
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
      name: "Academic Year",
      selector: (row) => row.academic_year,
      sortable: true,
      width: "130px",
    },
    {
      name: "Author",
      selector: (row) => row.author_name,
      sortable: true,
      wrap: true,
    },
    {
      name: "Volume",
      selector: (row) => row.volume || "-",
      sortable: true,
      center: true,
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
          Add Journal Publication
        </button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-warning" />
        </div>
      ) : (
        <DataTable
          title="Research Journal Publications"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          striped
          subHeader
          /* 🔒 Sorting already handled in fetch */
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search by title, author, journal or year..."
              style={{ width: "300px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      )}

      {/* ADD MODAL */}
      {showAddModal && (
        <AddResearchArchiveModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <EditResearchArchiveModal
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
