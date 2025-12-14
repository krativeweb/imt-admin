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
  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchGallery = async () => {
    try {
      const res = await api.get(`/api/photo-gallery`);
      setData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const openEditModal = (row) => {
    setEditRow(row);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditRow(null);
  };

  const handleEditSave = async (updatedData) => {
    try {
      const formData = new FormData();
      if (updatedData.images) formData.append("image", updatedData.images);
      formData.append("content", updatedData.content || "");

      await api.put(`/api/photo-gallery/edit/${editRow._id}`, formData);
      fetchGallery();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/photo-gallery/delete/${id}`);
      fetchGallery();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

const handleAddSave = async (newData) => {
  try {
    const formData = new FormData();
    formData.append("image", newData.images);
    formData.append("content", newData.content || "");

    await api.post(`/api/photo-gallery/add`, formData);
    fetchGallery(); // ⬅ refresh list immediately
    setShowAddModal(false);
  } catch (err) {
    console.error("Add failed:", err);
  }
};


  const filteredData = data.filter((item) =>
    (item.content || "").toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: "SL",
      selector: (row, index) => index + 1,
      width: "70px",
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/${row.image}`}
          alt="Gallery"
          width="80"
          style={{ borderRadius: "6px", border: "1px solid #ccc" }}
        />
      ),
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
        <button className="btn btn-success" onClick={() => setShowAddModal(true)}>
          <Plus size={18} className="me-2" /> Add Photo
        </button>
      </div>

      <DataTable
        title="Photo Gallery"
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        subHeader
        subHeaderComponent={
          <input
            type="text"
            className="form-control"
            placeholder="Search Content..."
            style={{ width: "250px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />

      {showEditModal && (
        <EditFieldModal
          show={showEditModal}
          field={editRow}
          onClose={closeEditModal}
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
