"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
const pageActions = {
  "centre-digital-transformation": {
    label: "Add Advisory Council",
    url: "/admin/advisory-council",
  },
};

const EditfieldModal = ({ show, onClose, field, onSave }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    page_title: "",
    page_slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_canonical: "",
    banner_image: "",
    banner_text: "",

    // ✅ NEW FIELD
    about_details: "",

    // ✅ KEPT
    cases: "",
  });

  const handleAddPeople = () => {
    router.push("/admin/advisory-council");
  };

  /* ---------------------------------
     LOAD EXISTING DATA
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

        about_details: field.about_details || "",
        cases: field.cases || "",
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
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== undefined && formData[key] !== null) {
        form.append(key, formData[key]);
      }
    });
    onSave(form);
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
              Edit Page Details
            </h5>
            <button className="btn-close" onClick={onClose} />
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
                  onChange={handleChange}
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
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Meta Keywords</label>
                <input
                  type="text"
                  name="meta_keywords"
                  className="form-control"
                  value={formData.meta_keywords}
                  onChange={handleChange}
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
                />
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

            <hr />

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
                      ? `${process.env.NEXT_PUBLIC_API_URL}${formData.banner_image}`
                      : URL.createObjectURL(formData.banner_image)
                  }
                  alt="Banner Preview"
                  className="img-fluid rounded mt-3 border"
                  style={{ maxHeight: "120px" }}
                />
              )}
            </div>

            {/* BANNER TEXT */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Banner Text</label>
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
                value={formData.banner_text}
                init={{ height: 250, menubar: true }}
                onEditorChange={(content) =>
                  setFormData((prev) => ({
                    ...prev,
                    banner_text: content,
                  }))
                }
              />
            </div>

            <hr />

            {/* ✅ ABOUT DETAILS */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                About Details
              </label>
              <Editor
  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
  value={formData.about_details}
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
      about_details: content,
    }));
  }}
/>

            </div>


          </div>

          {/* FOOTER */}
          <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddPeople}
              >
                Add Advisory Council & Affilated Faculty 
              </button>

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
