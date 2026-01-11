"use client";

import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import CmsEditor from "@/components/common/CmsEditor";

const AddResearchNewsArticleModal = ({ show, onClose, onSave }) => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    year: "",
    content: "",
  });

  /* -----------------------------
     INPUT HANDLER
  ------------------------------ */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  /* -----------------------------
     SAVE HANDLER
  ------------------------------ */
  const handleSave = () => {
    const newErrors = {};

    if (!formData.year)
      newErrors.year = "Year is required";

    if (!formData.content.trim())
      newErrors.content = "Content is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              Add Research News Article
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">

            {/* YEAR DROPDOWN */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Academic Year</label>
              <select
                name="year"
                className={`form-select ${errors.year ? "is-invalid" : ""}`}
                value={formData.year}
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                {[
                  "2025-26",
                  "2024-25",
                  "2023-24",
                  "2022-23",
                  "2021-22",
                  "2020-21",
                  "2019-20",
                  "2018-19",
                  "2017-18",
                ].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              {errors.year && (
                <div className="invalid-feedback d-block">
                  {errors.year}
                </div>
              )}
            </div>

            {/* CONTENT EDITOR */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                News Article Content
              </label>
              <CmsEditor
                  value={formData.content}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, content: v }))
                  }
                />
             
              {errors.content && (
                <div className="invalid-feedback d-block">
                  {errors.content}
                </div>
              )}
            </div>

          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Add Article
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddResearchNewsArticleModal;
