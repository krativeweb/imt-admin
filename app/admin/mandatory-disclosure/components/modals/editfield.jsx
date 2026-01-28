// app/admin/mandatory-disclosure/components/modals/EditfieldModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import CmsEditor from "@/components/common/CmsEditor";

const EditfieldModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    page_title: "",
    page_slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_canonical: "",
    banner_image: "",
    banner_text: "",
    page_content: "",
  });

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
        page_content: field.page_content || "",
      });
    }
  }, [field]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // remove error instantly when user corrects input
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, banner_image: file }));
    }
  };

  const handleSave = () => {
    const newErrors = {};

    // if (!formData.page_title?.trim()) {
    //   newErrors.page_title = "Page Title is required";
    // }
    // if (!formData.banner_image) {
    //   newErrors.banner_image = "Banner image is required";
    // }
    // if (!formData.banner_text?.trim()) {
    //   newErrors.banner_text = "Banner Text is required";
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // clear errors when valid
    setErrors({});
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    });

    onSave(form); // send FormData to backend
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
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Edit Page SEO & Content</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            {/* Meta Fields */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Page Title</label>
                <input
                  type="text"
                  name="page_title"
                  className={`form-control ${errors.page_title ? "is-invalid" : ""}`}
                  value={formData.page_title}
                  onChange={handleChange}
                  maxLength={60}
                />
                {errors.page_title && (
                  <small className="text-danger">{errors.page_title}</small>
                )}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Page Slug</label>
                <input
                  type="text"
                  name="page_slug"
                  className={`form-control ${errors.page_slug ? "is-invalid" : ""}`}
                  value={formData.page_slug}
                  onChange={handleChange}
                  maxLength={60}
                />
                {errors.page_title && (
                  <small className="text-danger">{errors.page_slug}</small>
                )}
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
              <div className="col-md-6">
                <label className="form-label fw-semibold">Canonical URL</label>
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

            {/* Banner Section */}
            <div className="row g-3 mb-4">
              <div className="col-md-8">
                <label className="form-label fw-semibold">Banner Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className={`form-control ${errors.banner_image ? "is-invalid" : ""}`}
                  onChange={handleImageUpload}
                />
                {formData.banner_image && (
                  <img
                    src={
                      typeof formData.banner_image === "string"
                        ? `${process.env.NEXT_PUBLIC_API_URL}${formData.banner_image}`
                        : URL.createObjectURL(formData.banner_image)
                    }
                    className="img-fluid rounded mt-3 border"
                    style={{ maxHeight: "100px" }}
                  />
                )}
                {errors.banner_image && (
                  <small className="text-danger d-block mt-1">
                    {errors.banner_image}
                  </small>
                )}
              </div>
              <div className="col-12 mb-4">
                <label htmlFor="banner_text" className="form-label fw-semibold">
                  Banner Text
                </label>

                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                  value={formData.banner_text || ""}
                  onEditorChange={(content) =>
                    setFormData((prev) => ({ ...prev, banner_text: content }))
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
                      "undo redo | formatselect | fontselect fontsizeselect | " +
                      "bold italic forecolor backcolor | " +
                      "alignleft aligncenter alignright alignjustify | " +
                      "bullist numlist outdent indent | link image media table | " +
                      "code | fullscreen | help",
                    branding: false,
                    content_style:
                      "body { font-family: 'Inter', sans-serif; font-size: 14px }",
                    resize: true,
                  }}
                />

                {/* Error message */}
                {errors.banner_text && (
                  <div className="mt-2">
                    <small className="text-danger">{errors.banner_text}</small>
                  </div>
                )}
              </div>
            </div>

            <hr className="my-4" />

            {/* TinyMCE Editor with Source Code Button */}
            <label className="form-label fw-semibold d-block mb-2">
              Page Content
            </label>
            <CmsEditor
                value={formData.page_content}
                onChange={(v) =>
                  setFormData((p) => ({ ...p, page_content: v }))
                }
              />
          </div>

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
