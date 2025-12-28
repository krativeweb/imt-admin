"use client";

import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { X } from "lucide-react";

const EditResearchModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [detailsPreview, setDetailsPreview] = useState(null);

  const [formData, setFormData] = useState({
    /* BASIC */
    name: "",
    home_title: "",
    details_page_title: "",
    sub_title: "",

    /* CONTENT */
    short_description: "",
    main_description: "",
    image: null,
    details_banner_image: null,

    /* SEO */
    page_title: "",
    page_slug: "",
    meta_title: "",
    meta_keywords: "",
    meta_description: "",
    meta_canonical: "",

    /* BANNER */
    banner_text: "",
  });

  /* ---------------------------------
     LOAD EXISTING DATA
  --------------------------------- */
  useEffect(() => {
    if (!field) return;

    setFormData({
      name: field.name || "",
      home_title: field.home_title || "",
      details_page_title: field.details_page_title || "",
      sub_title: field.sub_title || "",

      short_description: field.short_description || "",
      main_description: field.main_description || "",
      image: null,
      details_banner_image: null,

      page_title: field.page_title || "",
      page_slug: field.page_slug || "",
      meta_title: field.meta_title || "",
      meta_keywords: field.meta_keywords || "",
      meta_description: field.meta_description || "",
      meta_canonical: field.meta_canonical || "",

      banner_text: field.banner_text || "",
    });

    if (field.image) {
      setPreview(`${process.env.NEXT_PUBLIC_API_URL}/${field.image}`);
    }

    if (field.details_banner_image) {
      setDetailsPreview(
        `${process.env.NEXT_PUBLIC_API_URL}/${field.details_banner_image}`
      );
    }
  }, [field]);

  /* ---------------------------------
     INPUT HANDLERS
  --------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((p) => ({ ...p, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleDetailsImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((p) => ({ ...p, details_banner_image: file }));
    setDetailsPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setFormData((p) => ({ ...p, image: null }));
    setPreview(null);
  };

  const removeDetailsImage = () => {
    setFormData((p) => ({ ...p, details_banner_image: null }));
    setDetailsPreview(null);
  };

  /* ---------------------------------
     SAVE
  --------------------------------- */
  const handleSave = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.home_title.trim())
      errs.home_title = "Home title is required";
    if (!formData.page_title.trim())
      errs.page_title = "Page title is required";

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        data.append(key, value);
      }
    });

    onSave(data);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,.6)" }}>
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              Edit Research – Content & SEO
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          {/* BODY */}
          <div className="modal-body">

            {/* NAME */}
            <div className="mb-3">
              <label className="fw-semibold">Name</label>
              <input
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* HOME TITLE */}
            <div className="mb-3">
              <label className="fw-semibold">Home Title</label>
              <input
                name="home_title"
                className={`form-control ${errors.home_title ? "is-invalid" : ""}`}
                value={formData.home_title}
                onChange={handleChange}
              />
            </div>

            {/* DETAILS PAGE TITLE (EDITOR) ✅ */}
            <div className="mb-4">
              <label className="fw-semibold">Details Page Title</label>
              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
                value={formData.details_page_title}
                onEditorChange={(v) =>
                  setFormData((p) => ({ ...p, details_page_title: v }))
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
                }}
              />
            </div>

            {/* SUB TITLE */}
            <div className="mb-3">
  <label className="fw-semibold">Sub Title</label>

  <Editor
    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
    value={formData.sub_title || ""}
    onEditorChange={(content) =>
      setFormData((prev) => ({ ...prev, sub_title: content }))
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
    }}
  />
</div>


            <hr />

            {/* SEO SECTION */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="fw-semibold">Page Title</label>
                <input
                  name="page_title"
                  className={`form-control ${errors.page_title ? "is-invalid" : ""}`}
                  value={formData.page_title}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="fw-semibold">Page Slug</label>
                <input className="form-control" value={formData.page_slug} readOnly />
              </div>

              <div className="col-md-6">
                <label className="fw-semibold">Meta Title</label>
                <input
                  name="meta_title"
                  className="form-control"
                  value={formData.meta_title}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="fw-semibold">Meta Keywords</label>
                <input
                  name="meta_keywords"
                  className="form-control"
                  value={formData.meta_keywords}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="fw-semibold">Meta Description</label>
                <textarea
                  name="meta_description"
                  rows={3}
                  className="form-control"
                  value={formData.meta_description}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="fw-semibold">Canonical URL</label>
                <input
                  name="meta_canonical"
                  type="url"
                  className="form-control"
                  value={formData.meta_canonical}
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr />

            {/* IMAGE */}
            <div className="mb-3">
              <label className="fw-semibold">Image</label>
              <input type="file" className="form-control" onChange={handleImageChange} />
              {preview && (
                <div className="mt-3 position-relative d-inline-block">
                  <img src={preview} style={{ width: 200, height: 120, objectFit: "cover" }} />
                  <button
                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                    onClick={removeImage}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* DETAILS PAGE BANNER IMAGE */}
            <div className="mb-3">
              <label className="fw-semibold">Details Page Banner Image</label>
              <input type="file" className="form-control" onChange={handleDetailsImageChange} />
              {detailsPreview && (
                <div className="mt-3 position-relative d-inline-block">
                  <img src={detailsPreview} style={{ width: 200, height: 120, objectFit: "cover" }} />
                  <button
                    className="btn btn-danger btn-sm position-absolute top-0 end-0"
                    onClick={removeDetailsImage}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* BANNER TEXT */}
            <label className="fw-semibold">Banner Text</label>
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
              value={formData.banner_text}
              onEditorChange={(v) =>
                setFormData((p) => ({ ...p, banner_text: v }))
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
              }}
            />

            {/* SHORT DESCRIPTION */}
            <label className="fw-semibold mt-4">Short Description</label>
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
              value={formData.short_description}
              onEditorChange={(v) =>
                setFormData((p) => ({ ...p, short_description: v }))
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
              }}
            />

            {/* MAIN DESCRIPTION */}
            <label className="fw-semibold mt-4">Main Description</label>
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
              value={formData.main_description}
              onEditorChange={(v) =>
                setFormData((p) => ({ ...p, main_description: v }))
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
              }}
            />

          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              Update Research
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditResearchModal;
