"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil } from "lucide-react";
import EditUspModal from "./modals/Editfield";
import api from "../../lib/api";

const UspTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);

  /* ---------------------------------
     FETCH USP CONTENT
  --------------------------------- */
  const fetchUsp = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/usp");

      if (res.data?.data) {
        setData([res.data.data]); // single record
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching USP:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsp();
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
     SAVE USP CONTENT (EDIT ONLY)
  --------------------------------- */
const handleEditSave = async (formData) => {
  try {
    console.log("USP DATA SENT:", formData);

    await api.put(
      `/api/usp/${editRow._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    fetchUsp();
    closeEditModal();
  } catch (error) {
    console.error("USP update failed:", error);
  }
};




  /* ---------------------------------
     TABLE COLUMNS
  --------------------------------- */
  const columns = [
    {
      name: "SL No",
      selector: (_, index) => index + 1,
      width: "80px",
      center: true,
    },
    {
      name: "USP Content",
      selector: (row) =>
        row.content
          ? row.content.replace(/<[^>]*>?/gm, "").slice(0, 120) + "..."
          : "-",
      grow: 2,
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
          title="USP Section"
          columns={columns}
          data={data}
          highlightOnHover
          pagination={false}
        />
      )}

      {showEditModal && (
        <EditUspModal
          show={showEditModal}
          onClose={closeEditModal}
          field={editRow}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default UspTable;
