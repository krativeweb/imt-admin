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
        FETCH DATA (DESC DATE)
  ------------------------------ */
const fetchNews = async () => {
  try {
    setLoading(true);
    const res = await api.get("/api/happenings");

    setData(res.data?.data || []);
  } catch (error) {
    console.error("Error fetching Happenings:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchNews();
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
        EDIT SAVE
  ------------------------------ */
  const handleEditSave = async (updatedData) => {
    try {
      const formData = new FormData();

      formData.append("title", updatedData.title);
      formData.append("description", updatedData.description || "");
      formData.append("sortDate", updatedData.sortDate);

      updatedData.new_images?.forEach((file) => {
        formData.append("images", file);
      });

      updatedData.remove_images?.forEach((img) => {
        formData.append("remove_images", img);
      });

      await api.put(`/api/happenings/${editRow._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchNews();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* -----------------------------
        DELETE
  ------------------------------ */
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/happenings/${id}`);
      fetchNews();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* -----------------------------
        ADD SAVE
  ------------------------------ */
  const handleAddSave = async (formData) => {
    try {
      await api.post(`/api/happenings`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchNews();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  /* -----------------------------
        SEARCH FILTER
  ------------------------------ */
  const filteredData = data.filter((item) =>
    (item.title || "").toLowerCase().includes(search.toLowerCase())
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
  id: "sortDate",
  name: "Event Date",
  selector: (row) => row.sortDate ? new Date(row.sortDate) : null, // ✅ raw date
  sortable: true,
  width: "130px",
  cell: (row) => {
    if (!row.sortDate) return "-";
    const d = new Date(row.sortDate);
    return `${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()}`;
  },
}
,
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
    },
    {
      name: "Image",
      cell: (row) => {
        const firstImage = row.images?.[0];
        return firstImage ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/${firstImage}`}
            alt={row.title}
            style={{
              width: "80px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "4px",
            }}
          />
        ) : (
          <span className="text-muted">No Image</span>
        );
      },
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
          disabled={loading}
        >
          <Plus size={18} className="me-2" /> Add Happening
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
            style={{ width: "3rem", height: "3rem" }}
          />
        </div>
      ) : (
        <DataTable
          title="Happenings List"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          subHeader
          defaultSortFieldId="sortDate" 
          defaultSortAsc={false} // DESC
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
