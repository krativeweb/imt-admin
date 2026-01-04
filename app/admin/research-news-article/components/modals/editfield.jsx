"use client";

import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditResearchNewsArticleModal = ({
  show,
  onClose,
  field,
  onSave,
}) => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    year: "",
    content: "",
  });

  /* ---------------------------------
     LOAD EXISTING DATA (EDIT MODE)
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
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

    if (!formData.year)
      newErrors.year = "Year is required";

    if (!formData.content.trim())
      newErrors.content = "Content is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...field, // keep _id and backend fields
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
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              Edit Research News Article
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">

            {/* YEAR DROPDOWN */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Academic Year</label>
              <select
                name="year"
                className={`form-select ${errors.year ? "is-invalid" : ""}`}
                value={formData.year}
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                {[
                  "2025-26",
                  "2024-25",
                  "2023-24",
                  "2022-23",
                  "2021-22",
                  "2020-21",
                  "2019-20",
                  "2018-19",
                  "2017-18",
                ].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>

              {errors.year && (
                <div className="invalid-feedback d-block">
                  {errors.year}
                </div>
              )}
            </div>

            {/* CONTENT EDITOR */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                News Article Content
              </label>

              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
                value={formData.content}
                init={{
                  height: 500,
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
                      font-family: 'Inter', sans-serif;
                      font-size: 14px;
                      padding: 10px;
                    }

                    .tab-pane {
                      display: block !important;
                      opacity: 1 !important;
                      visibility: visible !important;
                    }

                    .fade {
                      opacity: 1 !important;
                    }

                    .nav-tabs,
                    .nav-pills {
                      pointer-events: none;
                      opacity: 0.7;
                    }

                    table {
                      width: 100%;
                      border-collapse: collapse;
                    }

                    th, td {
                      border: 1px solid #dee2e6;
                      padding: 8px;
                    }

                    .card {
                      border: 1px solid #ddd;
                      border-radius: 6px;
                      padding: 12px;
                      margin-bottom: 16px;
                    }

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
                    content,
                  }));
                }}
              />

              {errors.content && (
                <div className="invalid-feedback d-block">
                  {errors.content}
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
              Update Article
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditResearchNewsArticleModal;
