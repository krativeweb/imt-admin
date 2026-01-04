// app/admin/call-to-action-bar/components/modals/EditFieldModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditFieldModal = ({ show, onClose, field, onSave }) => {
  const [formData, setFormData] = useState({
    cta_content: "",
  });

  /* LOAD EXISTING DATA */
  useEffect(() => {
    if (field) {
      setFormData({
        cta_content: field.cta_content || "",
      });
    }
  }, [field]);

  /* SAVE */
  const handleSave = () => {
    onSave({
      cta_content: formData.cta_content,
    });
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
              Edit New Announcement Bar Content
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          {/* BODY */}
          <div className="modal-body">
            <label className="form-label fw-semibold">
            New Announcement Bar Content
            </label>

            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
              value={formData.cta_content || ""}
              onEditorChange={(content) =>
                setFormData((prev) => ({ ...prev, cta_content: content }))
              }
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
                  "undo redo | formatselect | bold italic forecolor | " +
                  "alignleft aligncenter alignright | bullist numlist | " +
                  "link image media table | code fullscreen",
                branding: false,
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
            />
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

export default EditFieldModal;
