"use client";

import React, { useEffect, useState } from "react";
import CmsEditor from "@/components/common/CmsEditor";

const EditFieldModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    tab_type: "",
    academic_year: "",
    tab_content: "",
  });

  const tabTypes = [
    "Panel Discussion",
    "Leadership Series",
    "Guest Lectures",
  ];

  const years = [
    "2025-26",
    "2024-25",
    "2023-24",
    "2022-23",
    "2021-22",
    "2020-21",
    "2019-20",
    "2018-19",
  ];

  // Load existing record data
  useEffect(() => {
    if (field) {
      setFormData({
        tab_type: field.tab_type || "",
        academic_year: field.academic_year || "",
        tab_content: field.tab_content || "",
      });
    }
  }, [field]);

  const handleSave = () => {
    const newErrors = {};

    if (!formData.tab_type) newErrors.tab_type = "Tab type is required";
    if (!formData.academic_year)
      newErrors.academic_year = "Academic year is required";
    if (!formData.tab_content.trim())
      newErrors.tab_content = "Content is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...field, // preserve id or other fields
      ...formData,
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
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Edit Content</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {/* Parallel Dropdowns */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Tab Type</label>
                <select
                  className={`form-select ${
                    errors.tab_type ? "is-invalid" : ""
                  }`}
                  value={formData.tab_type}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      tab_type: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Tab Type</option>
                  {tabTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.tab_type && (
                  <small className="text-danger">{errors.tab_type}</small>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">
                  Academic Year
                </label>
                <select
                  className={`form-select ${
                    errors.academic_year ? "is-invalid" : ""
                  }`}
                  value={formData.academic_year}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      academic_year: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.academic_year && (
                  <small className="text-danger">
                    {errors.academic_year}
                  </small>
                )}
              </div>
            </div>

            {/* Editor */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Tab Content
              </label>
              <CmsEditor
                value={formData.tab_content}
                onChange={(v) =>
                  setFormData((p) => ({
                    ...p,
                    tab_content: v,
                  }))
                }
              />
              {errors.tab_content && (
                <small className="text-danger">
                  {errors.tab_content}
                </small>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFieldModal;
