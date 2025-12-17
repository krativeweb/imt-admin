// app/admin/research-in-focus/components/modals/AddResearchModal.jsx
"use client";

import React, { useState } from "react";

const AddResearchModal = ({ show, onClose, onSave }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    preview: null,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
      preview: file ? URL.createObjectURL(file) : null,
    }));
    if (errors.image) setErrors((prev) => ({ ...prev, image: null }));
  };

  const handleSave = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.image) newErrors.image = "Image is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);

    setFormData({
      title: "",
      image: null,
      preview: null,
      description: "",
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
            <h5 className="modal-title fw-bold">Add Research in Focus</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {/* Title */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input
                type="text"
                name="title"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <small className="text-danger">{errors.title}</small>
              )}
            </div>

            {/* Image */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Upload Image</label>
              <input
                type="file"
                className={`form-control ${errors.image ? "is-invalid" : ""}`}
                accept="image/*"
                onChange={handleFileChange}
              />
              {errors.image && (
                <small className="text-danger">{errors.image}</small>
              )}

              {formData.preview && (
                <div className="mt-3">
                  <img
                    src={formData.preview}
                    alt="Preview"
                    style={{
                      maxWidth: "150px",
                      maxHeight: "100px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Description</label>
              <textarea
                name="description"
                rows={4}
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <small className="text-danger">{errors.description}</small>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Add Research
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddResearchModal;
