"use client";

import React, { useEffect, useState } from "react";

const EditResearchModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    preview: null,
    description: "",
  });

  /* ---------------------------------
     LOAD EXISTING DATA
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
        title: field.title || "",
        image: null, // only replace if new selected
        preview: field.image
          ? `${process.env.NEXT_PUBLIC_API_URL}/${field.image}`
          : null,
        description: field.description || "",
      });
    }
  }, [field]);

  /* ---------------------------------
     INPUT HANDLERS
  --------------------------------- */
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
      preview: file ? URL.createObjectURL(file) : prev.preview,
    }));
    if (errors.image) setErrors((prev) => ({ ...prev, image: null }));
  };

  /* ---------------------------------
     SAVE HANDLER
  --------------------------------- */
  const handleSave = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    onSave(formData); // send to parent
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
            <h5 className="modal-title fw-bold">Edit Research in Focus</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
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
              <label className="form-label fw-semibold">
                Replace Image (Optional)
              </label>
              <input
                type="file"
                className={`form-control ${errors.image ? "is-invalid" : ""}`}
                accept="image/*"
                onChange={handleFileChange}
              />

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

          {/* FOOTER */}
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

export default EditResearchModal;
