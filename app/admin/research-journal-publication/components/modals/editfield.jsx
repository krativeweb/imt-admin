"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";

const EditResearchArchiveModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    academic_year: "",
    author_name: "",
    publication_title: "",
    authors: "",
    journal_name: "",
    volume: "",
    publication_url: "",
    abstract: "",
    image: null, // optional new image
  });

  /* ---------------------------------
     LOAD EXISTING DATA
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
        academic_year: field.academic_year || "",
        author_name: field.author_name || "",
        publication_title: field.publication_title || "",
        authors: field.authors || "",
        journal_name: field.journal_name || "",
        volume: field.volume || "",
        publication_url: field.publication_url || "",
        abstract: field.abstract || "",
        image: null,
      });

      if (field.image) {
        setPreview(
          field.image.startsWith("http")
            ? field.image
            : `${process.env.NEXT_PUBLIC_API_URL}/${field.image}`
        );
      }
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
     IMAGE HANDLER
  --------------------------------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreview(null);
  };

  /* ---------------------------------
     SAVE HANDLER
  --------------------------------- */
  const handleSave = () => {
    const newErrors = {};

    if (!formData.academic_year)
      newErrors.academic_year = "Academic year is required";

    if (!formData.author_name.trim())
      newErrors.author_name = "Author name is required";

    if (!formData.publication_title.trim())
      newErrors.publication_title = "Publication title is required";

    if (!formData.authors.trim())
      newErrors.authors = "Authors are required";

    if (!formData.journal_name.trim())
      newErrors.journal_name = "Journal name is required";



    if (!formData.abstract.trim())
      newErrors.abstract = "Abstract is required";

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
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              Edit Research Archive Journal Publication
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* ACADEMIC YEAR */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Academic Year</label>
              <select
                name="academic_year"
                className={`form-select ${
                  errors.academic_year ? "is-invalid" : ""
                }`}
                value={formData.academic_year}
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                {[
                  "2025-26","2024-25","2023-24","2022-23","2021-22",
                  "2020-21","2019-20","2018-19","2017-18","2016-17",
                  "2015-16","2014-15","2013-14","2012-13","2011-12","2010-11"
                ].map((yr) => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
              {errors.academic_year && (
                <small className="text-danger">{errors.academic_year}</small>
              )}
            </div>

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
            </div>

            {/* PUBLICATION TITLE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Publication Title
              </label>
              <input
                type="text"
                name="publication_title"
                className={`form-control ${
                  errors.publication_title ? "is-invalid" : ""
                }`}
                value={formData.publication_title}
                onChange={handleChange}
              />
            </div>

            {/* AUTHORS */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Authors</label>
              <input
                type="text"
                name="authors"
                className={`form-control ${
                  errors.authors ? "is-invalid" : ""
                }`}
                value={formData.authors}
                onChange={handleChange}
              />
            </div>

            {/* JOURNAL */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Journal</label>
              <input
                type="text"
                name="journal_name"
                className={`form-control ${
                  errors.journal_name ? "is-invalid" : ""
                }`}
                value={formData.journal_name}
                onChange={handleChange}
              />
            </div>
             {/* VOLUME */}
             <div className="mb-3">
              <label className="form-label fw-semibold">Volume</label>
              <input
                type="text"
                name="volume"
                className={`form-control ${
                  errors.volume ? "is-invalid" : ""
                }`}
                value={formData.volume}
                onChange={handleChange}
              />
            </div>

            {/* URL */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Publication URL
              </label>
              <input
                type="url"
                name="publication_url"
                className="form-control"
                value={formData.publication_url}
                onChange={handleChange}
              />
            </div>

            {/* ABSTRACT */}
            <div className="mb-3">
  <label className="form-label fw-semibold">Abstract</label>

  <Editor
    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
    value={formData.abstract}
    init={{
      height: 300,
      menubar: true,

      plugins: [
        "advlist",
        "autolink",
        "lists",
        "link",
        "image",
        "charmap",
        "preview",
        "anchor",
        "searchreplace",
        "visualblocks",
        "code",
        "fullscreen",
        "insertdatetime",
        "media",
        "table",
        "help",
        "wordcount",
      ],

      toolbar:
        "undo redo | formatselect | fontselect fontsizeselect | " +
        "bold italic forecolor backcolor | " +
        "alignleft aligncenter alignright alignjustify | " +
        "bullist numlist outdent indent | link image media table | " +
        "code | fullscreen | help",

      branding: false,
      resize: true,

      /* ✅ CRITICAL FIXES */
      verify_html: false,
      cleanup: false,
      cleanup_on_startup: false,
      forced_root_block: false,
      remove_empty: false,

      valid_elements: "*[*]",
      extended_valid_elements: "*[*]",
      valid_children: "+div[div|h2|p|ul|li|span|a]",
      sandbox_iframes: false,

      content_css: [
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
      ],

      /* ✅ MUST be a template string */
      
    content_style: `
    body {
      font-family: Helvetica, Arial, sans-serif;
      font-size: 14px;
    }
  `,
  content_style: `
  body {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    padding: 10px;
  }

  /* Always show all tab content inside editor */
  .tab-pane {
    display: block !important;
    opacity: 1 !important;
    visibility: visible !important;
  }

  .fade {
    opacity: 1 !important;
  }

  /* Disable clicking tabs inside editor */
  .nav-tabs,
  .nav-pills {
    pointer-events: none;
    opacity: 0.7;
  }

  /* Bootstrap tables */
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #dee2e6;
    padding: 8px;
    vertical-align: middle;
  }

  /* Cards */
  .card {
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 16px;
  }

  /* Buttons */
  .btn {
    display: inline-block;
    padding: 4px 10px;
    font-size: 13px;
    border-radius: 4px;
  }

  .btn-warning {
    background-color: #ffc107;
    color: #000;
  }
`,
    }}
    onEditorChange={(content) => {
      setFormData((prev) => ({
        ...prev,
        abstract: content,
      }));
    }}
  />

  {errors.abstract && (
    <div className="invalid-feedback d-block">
      {errors.abstract}
    </div>
  )}
</div>


            {/* IMAGE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Author Image <span className="text-muted">(optional)</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}
              />

              {preview && (
                <div className="mt-3 position-relative d-inline-block">
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #ddd",
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                    onClick={removeImage}
                  >
                    <X size={14} />
                  </button>
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
              Update Publication
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditResearchArchiveModal;
