"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil } from "lucide-react";
import EditfieldModal from "./modals/editfield"; // inbound-application-form modal
import api from "../../lib/api";

const InboundApplicationFormTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);

  /* ---------------------------------
     FETCH INBOUND APPLICATION FORM
  --------------------------------- */
  const fetchPage = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/inbound-application-form");
  
      if (res.data) {
        setData([res.data]); // ✅ wrap object into array
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching Inbound Application Form:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchPage();
  }, []);

  const openEditModal = (row) => {
    setEditRow(row);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditRow(null);
  };

  const handleEditSave = async (data) => {
    try {
      await api.put(
        `/api/inbound-application-form/${editRow._id}`,
        data // ✅ JSON
      );
  
      await fetchPage();
      closeEditModal();
    } catch (err) {
      console.error("Inbound Application Form update failed:", err);
    }
  };

  const columns = [
    {
      name: "SL No",
      selector: (row, index) => index + 1,
      width: "80px",
      center: true,
    },
    {
      name: "Content Preview",
      selector: (row) =>
        row.content
          ? row.content.replace(/<[^>]*>/g, "").slice(0, 120) + "..."
          : "—",
      wrap: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <Pencil
          size={20}
          className="text-primary"
          style={{ cursor: "pointer" }}
          onClick={() => openEditModal(row)}
        />
      ),
      center: true,
      width: "120px",
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
          title="Inbound Application Form CMS"
          columns={columns}
          data={data}
          highlightOnHover
          pagination={false}
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

export default InboundApplicationFormTable;
