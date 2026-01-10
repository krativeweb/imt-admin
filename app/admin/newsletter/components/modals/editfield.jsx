"use client";

import React, { useEffect, useState } from "react";

const EditNewsletterModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    month: "",
    year: "",
    pdfUrl: "",
    isActive: true,
  });

  // Load existing newsletter data
  useEffect(() => {
    if (field) {
      setFormData({
        month: field.month || "",
        year: field.year || "",
        pdfUrl: field.pdfUrl || "",
        isActive: field.isActive ?? true,
      });
    }
  }, [field]);

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

    onSave({ ...formData, _id: field._id });
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
            <h5 className="modal-title fw-bold">Edit Newsletter</h5>
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
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNewsletterModal;
