"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil, Trash2, Plus } from "lucide-react";
import EditFieldModal from "./modals/editfield";
import AddFieldModal from "./modals/addfield";
import api from "../../lib/api";

/* ---------------------------------
   DATE FORMAT HELPER
--------------------------------- */
const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

/* ---------------------------------
   TIME FORMAT HELPER
--------------------------------- */
const formatTime = (time) => {
  if (!time) return "";
  const [h, m] = time.split(":");
  const hour = Number(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${m} ${suffix}`;
};

const Table = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  /* -----------------------------
        FETCH EVENT CALENDAR
  ------------------------------ */
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/event-calendar");
      setData(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching event calendar:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
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
        SAVE EDIT EVENT
  ------------------------------ */
  const handleEditSave = async (updatedData) => {
    try {
      await api.put(
        `/api/event-calendar/${editRow._id}`,
        updatedData
      );
      fetchEvents();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* -----------------------------
        DELETE EVENT
  ------------------------------ */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      await api.delete(`/api/event-calendar/${id}`);
      fetchEvents();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* -----------------------------
        ADD EVENT
  ------------------------------ */
  const handleAddSave = async (newData) => {
    try {
      await api.post("/api/event-calendar", newData);
      fetchEvents();
      setShowAddModal(false);
    } catch (err) {
      console.error("Add failed:", err);
    }
  };

  /* -----------------------------
        SEARCH FILTER
  ------------------------------ */
  const filteredData = data.filter((item) =>
    [
      item.event_title,
      item.event_place,
      item.start_time,
      item.end_time,
    ]
      .join(" ")
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
    },
    {
      name: "Event Date",
      selector: (row) => formatDate(row.event_date),
      sortable: true,
    },
    {
      name: "Event Time",
      selector: (row) =>
        `${formatTime(row.start_time)} – ${formatTime(row.end_time)}`,
      sortable: true,
      width: "180px",
    },
    {
      name: "Event Title",
      selector: (row) => row.event_title,
      sortable: true,
      wrap: true,
    },
    {
      name: "Event Place",
      selector: (row) => row.event_place,
      sortable: true,
      wrap: true,
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
      {/* ADD BUTTON */}
      <div className="d-flex justify-content-end mb-2">
        <button
          className="btn btn-success"
          onClick={() => setShowAddModal(true)}
          disabled={loading}
        >
          <Plus size={18} className="me-2" /> Add Event
        </button>
      </div>

      {/* TABLE / LOADER */}
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <div className="spinner-border" role="status" />
        </div>
      ) : (
        <DataTable
          title="Event Calendar"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search by title, place, or time..."
              style={{ width: "260px" }}
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
