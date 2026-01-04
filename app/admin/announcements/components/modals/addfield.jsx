"use client";

import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const AddAnnouncementModal = ({ show, onClose, onSave }) => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  /* ---------------------------------
     INPUT HANDLERS
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

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);

    setFormData({
      title: "",
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
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Add Announcement</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
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
              {errors.title && (
                <small className="text-danger">{errors.title}</small>
              )}
            </div>

            {/* DESCRIPTION */}
            <label className="form-label fw-semibold d-block mb-2">
              Description
            </label>

            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
              value={formData.description}
              init={{
                height: 300,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
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
                  "undo redo | formatselect | bold italic forecolor backcolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist | link | code fullscreen",
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
            
                  /* ✅ FIXED TEMPLATE STRING */
                  
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
              onEditorChange={(description) =>
                setFormData((prev) => ({ ...prev, description }))
              }
            />

            {errors.description && (
              <small className="text-danger">{errors.description}</small>
            )}
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Add Announcement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAnnouncementModal;
