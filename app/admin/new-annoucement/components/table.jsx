"use client";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Pencil } from "lucide-react";
import EditfieldModal from "./modals/editfield";
import api from "../../lib/api";

const FacultyDetailsSeoTable = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editRow, setEditRow] = useState(null);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ---------------------------------
     FETCH FACULTY DETAILS SEO SETTINGS
  --------------------------------- */
  const callinactionbar = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/newannoucement");
  
      const result = Array.isArray(res.data?.data)
        ? res.data.data
        : res.data?.data
        ? [res.data.data]
        : [];
  
      setData(result);
    } catch (error) {
      console.error("Error fetching Announcement SEO:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    callinactionbar();
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
     UPDATE FACULTY DETAILS SEO
  --------------------------------- */
const handleEditSave = async (updatedData) => {
  try {
    const res = await api.put(
      `/api/newannoucement/${editRow._id}`,
      {
        cta_content: updatedData.cta_content, // send JSON
      }
    );

    if (res.data?.data) {
      await callinactionbar();
      closeEditModal();
    }
  } catch (err) {
    console.error("Announcement update failed:", err);
  }
};


  /* ---------------------------------
     SEARCH FILTER
  --------------------------------- */
  const filteredData = data.filter(
    (item) =>
      
      item.cta_content?.toLowerCase().includes(search.toLowerCase())
  );

  const stripHtmlAndLimitWords = (html, wordLimit = 50) => {
    if (!html) return "";
  
    // Remove HTML tags
    const text = html.replace(/<[^>]*>/g, "");
  
    // Limit words
    const words = text.split(/\s+/);
  
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

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
      name: "Announcement Content",
      selector: (row) => stripHtmlAndLimitWords(row.cta_content, 50),
      sortable: true,
      wrap: true,
    }
    ,
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
          title="New Announcement Bar Data"
          columns={columns}
          data={filteredData}
          pagination
          highlightOnHover
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
              placeholder="Search New Announcement Bar content..."
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

export default FacultyDetailsSeoTable;
