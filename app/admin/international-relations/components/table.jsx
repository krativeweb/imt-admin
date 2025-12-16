"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil } from "lucide-react";
import EditfieldModal from "./modals/editfield";
import api from "../../lib/api";

const Table = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // ✅ loader

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ---------------------------------
     FETCH INTERNATIONAL RELATIONS PAGES
  --------------------------------- */
  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/api/mandatory?page_parent=International-Relations`
      );
      setData(res.data.pages || []);
    } catch (error) {
      console.error("Error fetching pages:", error);
    } finally {
      setLoading(false); // ✅ stop loader
    }
  };

  useEffect(() => {
    fetchPages();
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
      const res = await api.put(`/api/mandatory/${editRow._id}`, updatedData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        await fetchPages();
        closeEditModal();
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.page_title?.toLowerCase().includes(search.toLowerCase()) ||
      item.banner_text?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: "SL No",
      selector: (row, index) => index + 1 + currentPage * rowsPerPage,
      width: "80px",
      style: { textAlign: "center" },
    },
    {
      name: "Page Title",
      selector: (row) => row.page_title,
      sortable: true,
      style: { textAlign: "center" },
    },
    {
      name: "Banner Image",
      cell: (row) => {
        if (!row.banner_image)
          return <span className="text-muted">No Image</span>;

        const imagePath = row.banner_image
          .replace(/\\/g, "/")
          .replace(/^\/+/g, "")
          .replace(/^uploads\//, "");

        const finalUrl = `${baseURL}/uploads/${imagePath}`;

        return (
          <img
            src={finalUrl}
            alt={row.page_title}
            width="60"
            height="20"
            style={{ objectFit: "cover", borderRadius: "5px" }}
          />
        );
      },
      style: { textAlign: "center" },
      width: "140px",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="d-flex gap-3 justify-content-center">
          <Pencil
            size={20}
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => openEditModal(row)}
          />
        </div>
      ),
      style: { textAlign: "center" },
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
          title="International Relations Pages"
          columns={columns}
          data={filteredData}
          highlightOnHover
          pagination
          onChangePage={(page) => setCurrentPage(page - 1)}
          onChangeRowsPerPage={(newPerPage) => setRowsPerPage(newPerPage)}
          subHeader
          subHeaderAlign="right"
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              style={{ width: "250px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      )}

      {showEditModal && (
        <EditfieldModal
          show={showEditModal}
          onClose={closeEditModal}
          field={editRow}
          onSave={handleEditSave}
          pageSlug={editRow?.page_slug}
        />
      )}
    </div>
  );
};

export default Table;
