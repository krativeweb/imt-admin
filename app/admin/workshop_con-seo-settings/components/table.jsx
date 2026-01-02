"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil } from "lucide-react";
import EditfieldModal from "./modals/editfield";
import api from "../../lib/api";

const Table = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  /* ---------------------------------
     FETCH WORKSHOPS & CONFERENCES SEO
  --------------------------------- */
  const fetchWorkshopsSeo = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/workshops-conferences-seo");

      // API returns single object → convert to array
      const seoData = res.data?.data ? [res.data.data] : [];
      setData(seoData);
    } catch (error) {
      console.error("Error fetching Workshops & Conferences SEO:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkshopsSeo();
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
     UPDATE SEO
  --------------------------------- */
  const handleEditSave = async (formData) => {
    try {
      const res = await api.put(
        `/api/workshops-conferences-seo/${editRow._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data?.data) {
        await fetchWorkshopsSeo();
        closeEditModal();
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* ---------------------------------
     SEARCH FILTER
  --------------------------------- */
  const filteredData = data.filter((item) =>
    item.page_title?.toLowerCase().includes(search.toLowerCase())
  );

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
      name: "Page Title",
      selector: (row) => row.page_title,
      center: true,
    },
    {
      name: "Banner Image",
      center: true,
      width: "150px",
      cell: (row) => {
        if (!row.banner_image) {
          return <span className="text-muted">No Image</span>;
        }

        const imagePath = row.banner_image
          .replace(/\\/g, "/")
          .replace(/^\/+/g, "");

        return (
          <img
            src={`${baseURL}/${imagePath}`}
            alt={row.page_title}
            width="70"
            height="40"
            style={{ objectFit: "cover", borderRadius: "6px" }}
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
          style={{ minHeight: "250px" }}
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
          title="Workshops & Conferences SEO"
          columns={columns}
          data={filteredData}
          highlightOnHover
          pagination={false}
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
          pageType="workshops_conferences"
        />
      )}
    </div>
  );
};

export default Table;
