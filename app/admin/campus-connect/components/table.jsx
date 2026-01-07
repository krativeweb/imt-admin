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
     FETCH CAMPUS PLACEMENTS (SINGLE)
  --------------------------------- */
  const fetchPage = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/campus-placements");

      // backend should return ONE document
     if (res.data) {
       setData([res.data]); // backend returns raw document
     }
    } catch (error) {
      console.error("Error fetching campus placements:", error);
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

  const handleEditSave = async (updatedData) => {
    try {
      const res = await api.put(
        `/api/campus-placements/${editRow._id}`,
        updatedData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        await fetchPage();
        closeEditModal();
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* ---------------------------------
     TABLE COLUMNS
  --------------------------------- */
  const columns = [
    {
      name: "SL No",
      selector: (row, index) => index + 1,
      width: "80px",
      center: true,
    },
    {
      name: "Page Title",
      selector: (row) => row.page_title,
      sortable: true,
      center: true,
    },
    {
      name: "Banner Image",
      cell: (row) => {
        if (!row.banner_image)
          return <span className="text-muted">No Image</span>;

        const imagePath = row.banner_image
          .replace(/\\/g, "/")
          .replace(/^\/+/g, "");

        return (
          <img
            src={`${baseURL}/${imagePath}`}
            alt="Banner"
            width="80"
            height="30"
            style={{ objectFit: "cover", borderRadius: "6px" }}
          />
        );
      },
      center: true,
      width: "160px",
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
          title="Campus Placements CMS"
          columns={columns}
          data={data}
          highlightOnHover
          pagination={false} // 🔒 only one record
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
