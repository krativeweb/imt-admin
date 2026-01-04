"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2, Plus } from "lucide-react";

import EditResearchBooksModal from "./modals/editfield";
import AddResearchBooksModal from "./modals/addfield";
import api from "../../lib/api";

const Table = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  /* -----------------------------
        FETCH RESEARCH BOOKS
  ------------------------------ */
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/research-books");
      setData(res.data.data || []);
    } catch (error) {
      console.error("Error fetching research books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
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
        ADD BOOK
  ------------------------------ */
  const handleAddSave = async (newData) => {
    try {
      await api.post("/api/research-books", newData);
      fetchBooks();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  /* -----------------------------
        EDIT BOOK
  ------------------------------ */
  const handleEditSave = async (updatedData) => {
    try {
      await api.put(
        `/api/research-books/${editRow._id}`,
        updatedData
      );
      fetchBooks();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* -----------------------------
        DELETE BOOK
  ------------------------------ */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this research book?")) return;

    try {
      await api.delete(`/api/research-books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* -----------------------------
        SEARCH FILTER
  ------------------------------ */
  const filteredData = data.filter((item) =>
    (
      item.author_name +
      item.book_name +
      item.chapter_edited +
      item.published +
      item.year
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
      name: "Author Name",
      selector: (row) => row.author_name,
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "Name of the Book",
      selector: (row) => row.book_name,
      sortable: true,
      wrap: true,
      grow: 2,
    },
    
    {
      name: "Published",
      selector: (row) => row.published,
      sortable: true,
      wrap: true,
      grow: 1,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
      width: "120px",
      center: true,
    },
    {
      name: "Action",
      center: true,
      width: "120px",
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
          Add Research Book
        </button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-warning" />
        </div>
      ) : (
        <DataTable
          title="Research Books"
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
              placeholder="Search by author, book, chapter, publisher or year..."
              style={{ width: "450px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      )}

      {/* ADD MODAL */}
      {showAddModal && (
        <AddResearchBooksModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <EditResearchBooksModal
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
