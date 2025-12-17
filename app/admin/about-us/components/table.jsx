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

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  /* ---------------------------------
     FETCH ABOUT US (HOME)
  --------------------------------- */
  const fetchAbout = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/home-about");

      // single object → convert to array for DataTable
      if (res.data && Object.keys(res.data).length) {
        setData([res.data]);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching About Us:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
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
     UPDATE ABOUT US
  --------------------------------- */
  const handleEditSave = async (updatedData) => {
    try {
      const res = await api.put("/api/home-about", updatedData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        await fetchAbout();
        closeEditModal();
      }
    } catch (error) {
      console.error("Update failed:", error);
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
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      center: true,
    },
    {
      name: "Image",
      center: true,
      width: "150px",
      cell: (row) => {
        if (!row.image) {
          return <span className="text-muted">No Image</span>;
        }

        return (
          <img
            src={`${baseURL}${row.image}`}
            alt={row.title}
            width="80"
            height="45"
            style={{
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        );
      },
    },
    {
      name: "Action",
      center: true,
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
        /* 🔄 Loader */
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
          title="About Us (Home)"
          columns={columns}
          data={data}
          highlightOnHover
          pagination={false} // single row
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
