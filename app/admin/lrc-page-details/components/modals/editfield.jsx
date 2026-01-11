// app/admin/mandatory-disclosure/components/modals/EditfieldModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import CmsEditor from "@/components/common/CmsEditor";

const EditfieldModal = ({ show, onClose, field, onSave }) => {
  const [formData, setFormData] = useState({
    page_title: "",
    page_slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_canonical: "",
    banner_image: "",
    banner_text: "",
    about_lrc: "",
    resources: "",
  });

  /* ---------------------------------
     PREFILL DATA
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
        page_title: field.page_title || "",
        page_slug: field.page_slug || "",
        meta_title: field.meta_title || "",
        meta_description: field.meta_description || "",
        meta_keywords: field.meta_keywords || "",
        meta_canonical: field.meta_canonical || "",
        banner_image: field.banner_image || "",
        banner_text: field.banner_text || "",
        about_lrc: field.about_lrc || "",
        resources: field.resources || "",
      });
    }
  }, [field]);

  /* ---------------------------------
     INPUT HANDLER
  --------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------------------------
     IMAGE HANDLER
  --------------------------------- */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, banner_image: file }));
    }
  };

  /* ---------------------------------
     SAVE HANDLER
  --------------------------------- */
  const handleSave = () => {
    const form = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "" && value !== null) {
        form.append(key, value);
      }
    });

    onSave(form);
  };

  if (!show) return null;

  /* ---------------------------------
     TINYMCE CONFIG
  --------------------------------- */
const editorConfig = {
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
    "code fullscreen help",
  branding: false,
  content_css: [
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
  ],
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
  `
};


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
              Edit LRC Page SEO & Content
            </h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* SEO FIELDS */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Page Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.page_title}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Page Slug</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.page_slug}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Meta Title</label>
                <input
                  type="text"
                  name="meta_title"
                  className="form-control"
                  value={formData.meta_title}
                  onChange={handleChange}
                  maxLength={60}
                />
                <small className="text-muted">
                  {formData.meta_title.length}/60
                </small>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Meta Keywords</label>
                <input
                  type="text"
                  name="meta_keywords"
                  className="form-control"
                  value={formData.meta_keywords}
                  onChange={handleChange}
                  placeholder="keyword1, keyword2"
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Meta Description
                </label>
                <textarea
                  name="meta_description"
                  rows="3"
                  className="form-control"
                  value={formData.meta_description}
                  onChange={handleChange}
                  maxLength={160}
                />
                <small className="text-muted">
                  {formData.meta_description.length}/160
                </small>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Canonical URL
                </label>
                <input
                  type="url"
                  name="meta_canonical"
                  className="form-control"
                  value={formData.meta_canonical}
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr className="my-4" />

            {/* BANNER IMAGE */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageUpload}
              />

              {formData.banner_image && (
                <img
                  src={
                    typeof formData.banner_image === "string"
                      ? `${process.env.NEXT_PUBLIC_API_URL}/${formData.banner_image}`
                      : URL.createObjectURL(formData.banner_image)
                  }
                  alt="Banner Preview"
                  className="img-fluid rounded mt-3 border"
                  style={{ maxHeight: "120px" }}
                />
              )}
            </div>

            <hr className="my-4" />

            {/* BANNER TEXT */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Banner Text</label>
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                value={formData.banner_text}
                onEditorChange={(content) =>
                  setFormData((prev) => ({ ...prev, banner_text: content }))
                }
                init={editorConfig}
              />
            </div>

            <hr className="my-4" />

            {/* ABOUT LRC */}
            <div className="mb-4">
              <label className="form-label fw-semibold">About LRC</label>
              <CmsEditor
                value={formData.about_lrc}
                onChange={(v) =>
                  setFormData((p) => ({ ...p, about_lrc: v }))
                }
              />
            </div>

            {/* RESOURCES */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Resources</label>
              <CmsEditor
                value={formData.resources}
                onChange={(v) =>
                  setFormData((p) => ({ ...p, resources: v }))
                }
              />
             
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditfieldModal;
