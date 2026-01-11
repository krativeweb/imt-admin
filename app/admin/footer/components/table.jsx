"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil } from "lucide-react";
import EditfieldModal from "./modals/editfield";
import api from "../../lib/api";

const Table = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);

  /* ---------------------------------
     FETCH FOOTER DATA
  --------------------------------- */
  const fetchFooter = async () => {
    try {
      setLoading(true);

      // 🔥 FOOTER API
      const res = await api.get("/api/footer");

      setData(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching footer data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFooter();
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
     UPDATE FOOTER
  --------------------------------- */
  const handleEditSave = async (formData) => {
    if (!editRow?._id) return;

    try {
      await api.put(`/api/footer/${editRow._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchFooter();
      closeEditModal();
    } catch (err) {
      console.error("Footer update failed:", err);
    }
  };

  /* ---------------------------------
     TABLE COLUMNS
  --------------------------------- */
  const columns = [
    {
      name: "SL No",
      width: "80px",
      center: true,
      cell: (_, index) => index + 1,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      wrap: true,
      grow: 2,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      center: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      center: true,
    },
    {
      name: "Action",
      center: true,
      width: "120px",
      cell: (row) => (
        <Pencil
          size={20}
          className="text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => openEditModal(row)}
        />
      ),
    },
  ];

  return (
    <div className="p-2">
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <div
            className="spinner-border"
            role="status"
            style={{ width: "3rem", height: "3rem", color: "#D4AA2D" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <DataTable
          title="Footer CMS"
          columns={columns}
          data={data}
          highlightOnHover
          pagination={false} // Footer usually single entry
          dense
        />
      )}

      {showEditModal && (
        <EditfieldModal
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
