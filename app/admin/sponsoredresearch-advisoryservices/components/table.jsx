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

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ---------------------------------
     FETCH SPONSORED RESEARCH SEO
  --------------------------------- */
  const fetchPages = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/sponsored-research");
      setData(res.data || []);
    } catch (error) {
      console.error(
        "Error fetching Sponsored Research pages:",
        error
      );
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
     UPDATE PAGE
  --------------------------------- */
  const handleEditSave = async (updatedData) => {
    try {
      await api.put(
        `/api/sponsored-research/${editRow._id}`,
        updatedData
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
  const filteredData = data.filter(
    (item) =>
      item.sponsored_research
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item.advisory_services
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

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
      name: "Sponsored Research",
      selector: () => "Content Available",
      center: true,
    },
    {
      name: "Advisory Services",
      selector: () => "Content Available",
      center: true,
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
          title="Sponsored Research & Advisory Services"
          columns={columns}
          data={filteredData}
          highlightOnHover
          pagination
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
              placeholder="Search sponsored research or advisory services..."
              style={{ width: "360px" }}
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
