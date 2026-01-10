"use client";

import React, { useState } from "react";

const AddNewsletterModal = ({ show, onClose, onSave }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    month: "",
    year: "",
    pdfUrl: "",
    isActive: true,
  });

  const handleSave = () => {
    const newErrors = {};

    if (!formData.month) {
      newErrors.month = "Month is required";
    }

    if (!formData.year) {
      newErrors.year = "Year is required";
    }

    if (!formData.pdfUrl.trim()) {
      newErrors.pdfUrl = "PDF URL is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
    setFormData({
      month: "",
      year: "",
      pdfUrl: "",
      isActive: true,
    });
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Add Newsletter</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {/* Month */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Month *</label>
              <select
                className={`form-select ${errors.month ? "is-invalid" : ""}`}
                value={formData.month}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    month: e.target.value,
                  }))
                }
              >
                <option value="">Select Month</option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {errors.month && (
                <small className="text-danger">{errors.month}</small>
              )}
            </div>

            {/* Year */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Year *</label>
              <input
                type="number"
                className={`form-control ${errors.year ? "is-invalid" : ""}`}
                placeholder="2025"
                value={formData.year}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    year: e.target.value,
                  }))
                }
              />
              {errors.year && (
                <small className="text-danger">{errors.year}</small>
              )}
            </div>

            {/* PDF URL */}
            <div className="mb-3">
              <label className="form-label fw-semibold">PDF URL *</label>
              <input
                type="url"
                className={`form-control ${errors.pdfUrl ? "is-invalid" : ""}`}
                placeholder="https://drive.google.com/..."
                value={formData.pdfUrl}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pdfUrl: e.target.value,
                  }))
                }
              />
              {errors.pdfUrl && (
                <small className="text-danger">{errors.pdfUrl}</small>
              )}
            </div>

          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success fw-bold" onClick={handleSave}>
              Add Newsletter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewsletterModal;
