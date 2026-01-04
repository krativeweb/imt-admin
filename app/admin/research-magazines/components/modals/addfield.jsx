"use client";

import React, { useState } from "react";

const AddResearchMagazinesModal = ({ show, onClose, onSave }) => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    author_name: "",
    article_title: "",
    publisher: "",
    year: "",
  });

  /* -----------------------------
     INPUT HANDLER
  ------------------------------ */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  /* -----------------------------
     SAVE HANDLER
  ------------------------------ */
  const handleSave = () => {
    const newErrors = {};

    if (!formData.author_name.trim())
      newErrors.author_name = "Author name is required";

    if (!formData.article_title.trim())
      newErrors.article_title = "Article title is required";

    if (!formData.publisher.trim())
      newErrors.publisher = "Publisher is required";

    if (!formData.year.trim())
      newErrors.year = "Year is required";

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
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              Add Research Magazine Article
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">

            {/* AUTHOR NAME */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Author Name</label>
              <input
                type="text"
                name="author_name"
                className={`form-control ${errors.author_name ? "is-invalid" : ""}`}
                value={formData.author_name}
                onChange={handleChange}
              />
              {errors.author_name && (
                <div className="invalid-feedback">{errors.author_name}</div>
              )}
            </div>

            {/* ARTICLE TITLE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Title of the Article
              </label>
              <input
                type="text"
                name="article_title"
                className={`form-control ${errors.article_title ? "is-invalid" : ""}`}
                value={formData.article_title}
                onChange={handleChange}
              />
              {errors.article_title && (
                <div className="invalid-feedback">{errors.article_title}</div>
              )}
            </div>

            {/* PUBLISHER */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Publisher</label>
              <input
                type="text"
                name="publisher"
                placeholder="e.g. Nature, IEEE, Elsevier"
                className={`form-control ${errors.publisher ? "is-invalid" : ""}`}
                value={formData.publisher}
                onChange={handleChange}
              />
              {errors.publisher && (
                <div className="invalid-feedback">{errors.publisher}</div>
              )}
            </div>

            {/* YEAR */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Year</label>
              <input
                type="text"
                name="year"
                placeholder="e.g. 2024-25"
                className={`form-control ${errors.year ? "is-invalid" : ""}`}
                value={formData.year}
                onChange={handleChange}
              />
              {errors.year && (
                <div className="invalid-feedback">{errors.year}</div>
              )}
            </div>

          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Add Magazine Article
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddResearchMagazinesModal;
