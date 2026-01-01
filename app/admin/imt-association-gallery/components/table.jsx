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

  /* -----------------------------
        FETCH GALLERY
  ------------------------------ */
  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/imt-association-gallery");
      setData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  /* -----------------------------
        EDIT
  ------------------------------ */
  const handleEditSave = async (updatedData) => {
    try {
      const formData = new FormData();
      formData.append("title", updatedData.title);

      if (updatedData.image) {
        formData.append("image", updatedData.image);
      }

      await api.put(
        `/api/imt-association-gallery/edit/${editRow._id}`,
        formData
      );

      fetchGallery();
      setShowEditModal(false);
      setEditRow(null);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* -----------------------------
        ADD
  ------------------------------ */
  const handleAddSave = async (newData) => {
    try {
      const formData = new FormData();
      formData.append("title", newData.title);
      formData.append("image", newData.image);

      await api.post("/api/imt-association-gallery/add", formData);

      fetchGallery();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  /* -----------------------------
        DELETE
  ------------------------------ */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;

    try {
      await api.delete(`/api/imt-association-gallery/delete/${id}`);
      fetchGallery();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* -----------------------------
        SEARCH (TITLE)
  ------------------------------ */
  const filteredData = data.filter((item) =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  );

  /* -----------------------------
        TABLE COLUMNS
  ------------------------------ */
  const columns = [
    {
      name: "SL",
      selector: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/${row.image}`}
          alt={row.title}
          width="80"
          style={{
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
      ),
    },
    {
      name: "Action",
      width: "120px",
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
          Add Gallery
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
          />
        </div>
      ) : (
        <DataTable
          title="IMT Association Gallery"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search by title..."
              style={{ width: "250px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      )}

      {showEditModal && (
        <EditFieldModal
          show={showEditModal}
          field={editRow}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditSave}
        />
      )}

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
