"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil } from "lucide-react";
import EditfieldModal from "./modals/editfield";
import api from "../../lib/api";

const ExecutiveEducationTable = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ---------------------------------
     FETCH DATA
  --------------------------------- */
  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/executive-education");
      setData(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching executive education:", error);
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
    setEditRow(row);     // ✅ full row passed
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditRow(null);
  };

  /* ---------------------------------
     SAVE (FORMDATA)
  --------------------------------- */
  const handleEditSave = async (formData) => {
    try {
      await api.put(
        `/api/executive-education/${editRow._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await fetchPages();
      closeEditModal();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  /* ---------------------------------
     SEARCH FILTER
  --------------------------------- */
  const filteredData = data.filter((item) => {
    const text = search.toLowerCase();

    return (
      item.page_title?.toLowerCase().includes(text) ||
      item.introduction?.toLowerCase().includes(text) ||
      item.edp_calender?.toLowerCase().includes(text)
    );
  });

  /* ---------------------------------
     TABLE COLUMNS
  --------------------------------- */
  const columns = [
    {
      name: "SL No",
      selector: (_, index) => index + 1 + currentPage * rowsPerPage,
      width: "80px",
      center: true,
    },
    {
      name: "Page Title",
      selector: (row) => row.page_title || "—",
      sortable: true,
      wrap: true,
    },
    {
      name: "Banner Image",
      center: true,
      width: "140px",
      cell: (row) =>
        row.banner_image ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${row.banner_image}`}
            alt="Banner"
            style={{
              height: "50px",
              width: "100px",
              objectFit: "cover",
              borderRadius: "6px",
              border: "1px solid #ddd",
            }}
          />
        ) : (
          <span className="text-muted">No Image</span>
        ),
    },
    {
      name: "Action",
      center: true,
      width: "90px",
      cell: (row) => (
        <Pencil
          size={18}
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
          title="Executive Education Page Content"
          columns={columns}
          data={filteredData}
          highlightOnHover
          pagination
          paginationServer={false}
          onChangePage={(page) => setCurrentPage(page - 1)}
          onChangeRowsPerPage={(newPerPage) =>
            setRowsPerPage(newPerPage)
          }
          subHeader
          subHeaderAlign="right"
          subHeaderComponent={
            <input
              type="text"
              className="form-control"
              placeholder="Search content..."
              style={{ width: "300px" }}
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

export default ExecutiveEducationTable;
