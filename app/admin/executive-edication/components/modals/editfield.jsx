"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";

const EditfieldModal = ({ show, onClose, field, onSave }) => {
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    page_title: "",
    page_slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_canonical: "",
    email: "",
    contact: "",
    banner_image: "",
    banner_text: "",

    // ✅ NEW FIELDS
    introduction: "",
    edp_calender: "",
    short_during_program: "",
    long_during_program: "",
    first_time_manager_program: "",
    certificate_program: "",
  });

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
        email: field.email || "",
        contact: field.contact || "",
        banner_image: field.banner_image || "",
        banner_text: field.banner_text || "",

        // ✅ NEW FIELDS
        introduction: field.introduction || "",
        edp_calender: field.edp_calender || "",
        short_during_program: field.short_during_program || "",
        long_during_program: field.long_during_program || "",
        first_time_manager_program: field.first_time_manager_program || "",
        certificate_program: field.certificate_program || "",
      });
    }
  }, [field]);

  const handleAddPeople = () => {
    router.push("/admin/distinguished-clients");
  };

  /* ---------------------------------
     INPUT HANDLER
  --------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
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
              Edit Executive Education Page
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
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Meta Keywords
                </label>
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
                  maxLength={160}
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
              <div className="col-12">
                <label className="form-label fw-semibold">
                  Email ID
                </label>
                <input
                  type="url"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">
                  Contact
                </label>
                <input
                  type="url"
                  name="contact"
                  className="form-control"
                  value={formData.contact}
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
              <Editor apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2} value={formData.banner_text} onEditorChange={(content) => setFormData((prev) => ({ ...prev, banner_text: content })) } init={{ height: 250, menubar: true }} />

            </div>

            <hr className="my-4" />

            {/* ✅ RESEARCH PUBLICATIONS */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
              Introduction
              </label>
              <Editor
  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
  value={formData.introduction}
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
  onEditorChange={(content) =>
    setFormData((prev) => ({
      ...prev,
      introduction: content,
    }))
  }
/>

            </div>

            {/* ✅ JOURNAL PUBLICATIONS */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
              EDP Calender
              </label>
              <Editor
  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
  value={formData.edp_calender}
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
  onEditorChange={(content) =>
    setFormData((prev) => ({
      ...prev,
      edp_calender: content,
    }))
  }
/>

            </div>

            {/* ✅ CASES */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Short During Program</label>
              <Editor
  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
  value={formData.short_during_program}
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
  onEditorChange={(content) =>
    setFormData((prev) => ({
      ...prev,
      short_during_program: content,
    }))
  }
/>

            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Long During Program</label>
              <Editor
  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
  value={formData.long_during_program}
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
  onEditorChange={(content) =>
    setFormData((prev) => ({
      ...prev,
      long_during_program: content,
    }))
  }
/>

            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">First Time Manager Program</label>
              <Editor
  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
  value={formData.first_time_manager_program}
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
  onEditorChange={(content) =>
    setFormData((prev) => ({
      ...prev,
      first_time_manager_program: content,
    }))
  }
/>

            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Certificate Program</label>
              <Editor
  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
  value={formData.certificate_program}
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
  onEditorChange={(content) =>
    setFormData((prev) => ({
      ...prev,
      certificate_program: content,
    }))
  }
/>

            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
          <button className="btn btn-primary" onClick={handleAddPeople}>
                Add Distinguished Clients
              </button>
    
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

export default EditfieldModal;
