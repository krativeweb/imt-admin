"use client";

import React, { useEffect, useState } from "react";

const EditResearchConferenceProceedingModal = ({
  show,
  onClose,
  field,
  onSave,
}) => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    author_name: "",
    article_title: "",
    published_presented: "",
    year: "",
  });

  /* ---------------------------------
     LOAD EXISTING DATA (EDIT MODE)
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
        author_name: field.author_name || "",
        article_title: field.article_title || "",
        published_presented: field.published_presented || "",
        year: field.year || "",
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

    if (!formData.author_name.trim())
      newErrors.author_name = "Author name is required";

    if (!formData.article_title.trim())
      newErrors.article_title = "Title of the article is required";

    if (!formData.published_presented.trim())
      newErrors.published_presented = "Published / Presented is required";

    if (!formData.year.trim())
      newErrors.year = "Year is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...field,       // keep id or other backend fields
      ...formData,
    });

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
              Edit Research Conference Proceeding
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
                className={`form-control ${
                  errors.author_name ? "is-invalid" : ""
                }`}
                value={formData.author_name}
                onChange={handleChange}
              />
              {errors.author_name && (
                <div className="invalid-feedback">
                  {errors.author_name}
                </div>
              )}
            </div>

            {/* TITLE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Title of the Article
              </label>
              <input
                type="text"
                name="article_title"
                className={`form-control ${
                  errors.article_title ? "is-invalid" : ""
                }`}
                value={formData.article_title}
                onChange={handleChange}
              />
              {errors.article_title && (
                <div className="invalid-feedback">
                  {errors.article_title}
                </div>
              )}
            </div>

            {/* PUBLISHED / PRESENTED */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Published / Presented
              </label>
              <textarea
                rows="3"
                name="published_presented"
                className={`form-control ${
                  errors.published_presented ? "is-invalid" : ""
                }`}
                value={formData.published_presented}
                onChange={handleChange}
              />
              {errors.published_presented && (
                <div className="invalid-feedback">
                  {errors.published_presented}
                </div>
              )}
            </div>

            {/* YEAR */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Year</label>
              <input
                type="text"
                name="year"
                placeholder="e.g. 2025 or 26–28 Feb 2025"
                className={`form-control ${
                  errors.year ? "is-invalid" : ""
                }`}
                value={formData.year}
                onChange={handleChange}
              />
              {errors.year && (
                <div className="invalid-feedback">
                  {errors.year}
                </div>
              )}
            </div>

          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              Update Proceeding
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
export default EditResearchConferenceProceedingModal;
