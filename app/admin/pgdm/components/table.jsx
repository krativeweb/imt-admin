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

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ---------------------------------
     FETCH ABOUT PGDM DATA
  --------------------------------- */
  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/about-pgdm");
  
      // 👇 FORCE ARRAY
      if (res.data?.data) {
        setData([res.data.data]);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching PGDM page:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchPages();
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
     UPDATE PGDM PAGE
  --------------------------------- */
  const handleEditSave = async (formData) => {
    try {
      const res = await api.put(
        `/api/about-pgdm/${editRow._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data) {
        await fetchPages();
        closeEditModal();
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* ---------------------------------
     SEARCH FILTER
  --------------------------------- */
  const filteredData = data.filter(
    (item) =>
      item.page_title?.toLowerCase().includes(search.toLowerCase()) ||
      item.banner_text?.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------------------------
     TABLE COLUMNS
  --------------------------------- */
  const columns = [
    {
      name: "SL No",
      selector: (row, index) => index + 1 + currentPage * rowsPerPage,
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
      center: true,
      width: "150px",
      cell: (row) => {
        if (!row.banner_image) {
          return <span className="text-muted">No Image</span>;
        }

        const imagePath = row.banner_image
          .replace(/\\/g, "/")
          .replace(/^\/+/g, "")
          .replace(/^uploads\//, "");

        return (
          <img
            src={`${baseURL}/uploads/${imagePath}`}
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
          title="About PGDM – SEO & Content"
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
        />
      )}
    </div>
  );
};

export default Table;
