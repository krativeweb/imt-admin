"use client";

import React, { useState } from "react";

const AddFieldModal = ({ show, onClose, onSave }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    preview: null,
  });

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
    if (!formData.image) newErrors.image = "Please select an image";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Send data to parent
    onSave(formData);

    // Reset form
    setFormData({
      title: "",
      image: null,
      preview: null,
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
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              Add IMT Association Gallery
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {/* Title Field */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                placeholder="Enter gallery title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
              {errors.title && (
                <small className="text-danger">{errors.title}</small>
              )}
            </div>

            {/* Image Upload */}
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

              {/* Preview */}
              {formData.preview && (
                <div className="mt-3">
                  <img
                    src={formData.preview}
                    alt="Preview"
                    style={{
                      maxWidth: "200px",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Add Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFieldModal;
