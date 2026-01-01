"use client";

import React, { useEffect, useState } from "react";

const EditFieldModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    preview: null,
  });

  useEffect(() => {
    if (field) {
      setFormData({
        title: field.title || "",
        image: null, // only if replaced
        preview: field.image
          ? `${process.env.NEXT_PUBLIC_API_URL}/${field.image}`
          : null,
      });
    }
  }, [field]);

  const handleSave = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (Object.keys(newErrors).length) {
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
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              Edit IMT Association Gallery
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {/* Title */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
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
              <label className="form-label fw-semibold">
                Replace Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFormData((prev) => ({
                    ...prev,
                    image: file,
                    preview: file
                      ? URL.createObjectURL(file)
                      : prev.preview,
                  }));
                }}
              />
            </div>

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
