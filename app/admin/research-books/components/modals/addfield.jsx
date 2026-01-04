"use client";

import React, { useEffect, useState } from "react";

const EditResearchBooksModal = ({
  show,
  onClose,
  field,
  onSave,
}) => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    author_name: "",
    book_name: "",
    chapter_edited: "",
    published: "",
    year: "",
  });

  /* ---------------------------------
     LOAD EXISTING DATA (EDIT MODE)
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
        author_name: field.author_name || "",
        book_name: field.book_name || "",
        chapter_edited: field.chapter_edited || "",
        published: field.published || "",
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

    if (!formData.book_name.trim())
      newErrors.book_name = "Book name is required";

    if (!formData.chapter_edited.trim())
      newErrors.chapter_edited = "Chapter name is required";

    if (!formData.published.trim())
      newErrors.published = "Publisher is required";

    if (!formData.year.trim())
      newErrors.year = "Year is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...field,     // keep _id and backend fields
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
              Add Research Book
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

            {/* BOOK NAME */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Name of the Book</label>
              <input
                type="text"
                name="book_name"
                className={`form-control ${errors.book_name ? "is-invalid" : ""}`}
                value={formData.book_name}
                onChange={handleChange}
              />
              {errors.book_name && (
                <div className="invalid-feedback">{errors.book_name}</div>
              )}
            </div>

            {/* CHAPTER EDITED */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Chapter Edited in the Book
              </label>
              <textarea
                rows="3"
                name="chapter_edited"
                className={`form-control ${errors.chapter_edited ? "is-invalid" : ""}`}
                value={formData.chapter_edited}
                onChange={handleChange}
              />
              {errors.chapter_edited && (
                <div className="invalid-feedback">{errors.chapter_edited}</div>
              )}
            </div>

            {/* PUBLISHED */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Published</label>
              <input
                type="text"
                name="published"
                placeholder="e.g. CRC Press, Springer, Routledge"
                className={`form-control ${errors.published ? "is-invalid" : ""}`}
                value={formData.published}
                onChange={handleChange}
              />
              {errors.published && (
                <div className="invalid-feedback">{errors.published}</div>
              )}
            </div>

            {/* YEAR */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Year</label>
              <input
                type="text"
                name="year"
                placeholder="e.g. 2025-26"
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
              Add Books
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditResearchBooksModal;
