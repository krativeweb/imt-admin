"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2, Plus } from "lucide-react";

import EditResearchMagazinesModal from "./modals/editfield";
import AddResearchMagazinesModal from "./modals/addfield";
import api from "../../lib/api";

const Table = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  /* -----------------------------
        FETCH RESEARCH MAGAZINES
  ------------------------------ */
  const fetchMagazines = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/research-magazines");
      setData(res.data.data || []);
    } catch (error) {
      console.error("Error fetching research magazines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMagazines();
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
        ADD MAGAZINE ARTICLE
  ------------------------------ */
  const handleAddSave = async (newData) => {
    try {
      await api.post("/api/research-magazines", newData);
      fetchMagazines();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  /* -----------------------------
        EDIT MAGAZINE ARTICLE
  ------------------------------ */
  const handleEditSave = async (updatedData) => {
    try {
      await api.put(
        `/api/research-magazines/${editRow._id}`,
        updatedData
      );
      fetchMagazines();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* -----------------------------
        DELETE MAGAZINE ARTICLE
  ------------------------------ */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this magazine article?"))
      return;

    try {
      await api.delete(`/api/research-magazines/${id}`);
      fetchMagazines();
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
      item.article_title +
      item.publisher +
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
      name: "Title of the Article",
      selector: (row) => row.article_title,
      sortable: true,
      wrap: true,
      grow: 2,
    },
    {
      name: "Publisher",
      selector: (row) => row.publisher,
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
          Add Magazine Article
        </button>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-warning" />
        </div>
      ) : (
        <DataTable
          title="Research Magazines"
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
              placeholder="Search by author, title, publisher or year..."
              style={{ width: "450px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      )}

      {/* ADD MODAL */}
      {showAddModal && (
        <AddResearchMagazinesModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddSave}
        />
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <EditResearchMagazinesModal
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
