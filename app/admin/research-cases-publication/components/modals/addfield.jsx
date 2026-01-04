"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";

const AddResearchCasesPublicationModal = ({ show, onClose, onSave }) => {
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    academic_year: "",
    name: "",
    title: "",
    authors: "",
    publisher: "",
    reference: "",
    case_url: "",
    abstract: "",
    image: null,
  });

  /* -----------------------------
     INPUT HANDLER
  ------------------------------ */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  /* -----------------------------
     IMAGE HANDLER
  ------------------------------ */
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

  /* -----------------------------
     SAVE HANDLER
  ------------------------------ */
  const handleSave = () => {
    const newErrors = {};

    if (!formData.academic_year) newErrors.academic_year = "Academic year is required";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.authors.trim()) newErrors.authors = "Authors are required";
    if (!formData.publisher.trim()) newErrors.publisher = "Publisher is required";
    if (!formData.reference.trim()) newErrors.reference = "Reference is required";
    if (!formData.abstract.trim()) newErrors.abstract = "Abstract is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Add Research Case Publication</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">

            {/* ACADEMIC YEAR */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Academic Year</label>
              <select
                name="academic_year"
                className={`form-select ${errors.academic_year ? "is-invalid" : ""}`}
                value={formData.academic_year}
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                {[
                  "2025-26","2024-25","2023-24","2022-23","2021-22",
                  "2020-21","2019-20","2018-19","2017-18","2016-17",
                  "2015-16","2014-15","2013-14","2012-13"
                ].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              {errors.academic_year && <small className="text-danger">{errors.academic_year}</small>}
            </div>

            {/* NAME */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* TITLE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input
                type="text"
                name="title"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* AUTHORS */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Authors</label>
              <input
                type="text"
                name="authors"
                className={`form-control ${errors.authors ? "is-invalid" : ""}`}
                value={formData.authors}
                onChange={handleChange}
              />
            </div>

            {/* PUBLISHER */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Publisher</label>
              <input
                type="text"
                name="publisher"
                className={`form-control ${errors.publisher ? "is-invalid" : ""}`}
                value={formData.publisher}
                onChange={handleChange}
              />
            </div>

            {/* REFERENCE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Reference No</label>
              <input
                type="text"
                name="reference"
                className={`form-control ${errors.reference ? "is-invalid" : ""}`}
                value={formData.reference}
                onChange={handleChange}
              />
            </div>

            {/* URL */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Case URL</label>
              <input
                type="url"
                name="case_url"
                className="form-control"
                value={formData.case_url}
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
              <label className="form-label fw-semibold">Profile Image</label>
              <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} />

              {preview && (
                <div className="mt-3 position-relative d-inline-block">
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
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
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSave}>Add Case</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddResearchCasesPublicationModal;
