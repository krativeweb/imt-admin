"use client";

import React, { useState, useEffect } from "react";
import CmsEditor from "@/components/common/CmsEditor";

const AddMediaRoomModal = ({ show, onClose, onSave, field = null }) => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    year: "",
    content: "",
  });

  /* ---------------------------------
     PREFILL DATA (EDIT MODE)
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
        title: field.title || "",
        year: field.year || "",
        content: field.content || "",
      });
    }
  }, [field]);

  /* ---------------------------------
     INPUT HANDLER
  --------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  /* ---------------------------------
     SAVE HANDLER
  --------------------------------- */
  const handleSave = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.year.trim()) newErrors.year = "Year is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);

    setFormData({
      title: "",
      year: "",
      content: "",
    });

    setErrors({});
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
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              {field ? "Edit Media Content" : "Add Media Content"}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* TITLE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input
                type="text"
                name="title"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                value={formData.title}
                onChange={handleChange}
                placeholder="Media Coverage Title"
              />
              {errors.title && (
                <small className="text-danger">{errors.title}</small>
              )}
            </div>

            {/* YEAR */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Year</label>
              <input
                type="number"
                name="year"
                className={`form-control ${errors.year ? "is-invalid" : ""}`}
                value={formData.year}
                onChange={handleChange}
                placeholder="2024"
              />
              {errors.year && (
                <small className="text-danger">{errors.year}</small>
              )}
            </div>

            {/* CONTENT */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Content</label>
              <CmsEditor
                value={formData.content}
                onChange={(v) =>
                  setFormData((p) => ({ ...p, content: v }))
                }
              />
              {errors.content && (
                <small className="text-danger">{errors.content}</small>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              {field ? "Update" : "Add"} Media
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMediaRoomModal;
