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
        FETCH WORKSHOPS
  ------------------------------ */
  const fetchWorkshops = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/workshops");
      setData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching workshops:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshops();
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
        UPDATE WORKSHOP
  ------------------------------ */
  const handleEditSave = async (updatedData) => {
    try {
      const formData = new FormData();

      if (updatedData.image) {
        formData.append("image", updatedData.image);
      }

      formData.append("title", updatedData.title);
      formData.append("company", updatedData.company);
      formData.append("program_director", updatedData.program_director);

      await api.put(`/api/workshops/${editRow._id}`, formData);

      fetchWorkshops();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* -----------------------------
        DELETE WORKSHOP
  ------------------------------ */
  const handleDelete = async (id) => {
    if (
      !confirm(
        "Are you sure you want to delete this workshop/conference?"
      )
    )
      return;

    try {
      await api.delete(`/api/workshops/${id}`);
      fetchWorkshops();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* -----------------------------
        ADD WORKSHOP
  ------------------------------ */
  const handleAddSave = async (newData) => {
    try {
      const formData = new FormData();

      formData.append("title", newData.title);
      formData.append("company", newData.company);
      formData.append("program_director", newData.program_director);
      formData.append("image", newData.image);

      await api.post("/api/workshops", formData);

      fetchWorkshops();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  /* -----------------------------
        SEARCH FILTER
  ------------------------------ */
  const filteredData = data.filter(
    (item) =>
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.company?.toLowerCase().includes(search.toLowerCase()) ||
      item.program_director
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  /* -----------------------------
        TABLE COLUMNS
  ------------------------------ */
  const columns = [
    {
      name: "SL",
      selector: (_, index) => index + 1,
      width: "60px",
      center: true,
    },
    {
      name: "Program Title",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
    },
    {
      name: "Company",
      selector: (row) => row.company,
      wrap: true,
    },
    {
      name: "Program Director",
      selector: (row) => row.program_director,
      wrap: true,
    },
    {
      name: "Image",
      center: true,
      cell: (row) => (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/${row.image}`}
          alt={row.title}
          style={{
            width: "80px",
            height: "45px",
            objectFit: "cover",
            borderRadius: "6px",
          }}
        />
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
          Add Workshop  Details
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
          title="Workshops Management"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search workshop by title, company, or director..."
              style={{ width: "320px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <EditFieldModal
          show={showEditModal}
          field={editRow}
          onClose={closeEditModal}
          onSave={handleEditSave}
        />
      )}

      {/* ADD MODAL */}
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
