"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil } from "lucide-react";
import EditfieldModal from "./modals/editfield"; // student-exchange modal
import api from "../../lib/api";

const StudentExchangeSeoTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  /* ---------------------------------
     FETCH STUDENT EXCHANGE SEO
  --------------------------------- */
  const fetchPage = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/student-exchange-seo");

      if (Array.isArray(res.data)) {
        setData(res.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching Student Exchange SEO:", error);
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
      await api.put(
        `/api/student-exchange-seo/${editRow._id}`,
        updatedData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      await fetchPage();
      closeEditModal();
    } catch (err) {
      console.error("Student Exchange SEO update failed:", err);
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
      name: "Page Title",
      selector: (row) => row.page_title,
      sortable: true,
      wrap: true,
    },
    {
      name: "Banner Image",
      cell: (row) =>
        row.banner_image ? (
          <img
            src={`${baseURL}${row.banner_image}`}
            alt="Banner"
            width="90"
            height="40"
            style={{
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        ) : (
          <span className="text-muted">No Image</span>
        ),
      center: true,
      width: "170px",
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
          title="Student Exchange SEO CMS"
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

export default StudentExchangeSeoTable;
