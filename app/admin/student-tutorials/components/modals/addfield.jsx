"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
const AddStudentTutorialModal = ({ show, onClose, onSave }) => {
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    image: null,
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
     IMAGE HANDLER
  --------------------------------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));

    if (errors.image) {
      setErrors((prev) => ({ ...prev, image: null }));
    }
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

    if (!formData.name.trim())
      newErrors.name = "Student name is required";

    if (!formData.image)
      newErrors.image = "Image is required";

    if (!formData.description.trim())
      newErrors.description = "Description is required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);

    setFormData({
      name: "",
      image: null,
      description: "",
    });
    setPreview(null);
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              Add Student Tutorial
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* NAME */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Student Name
              </label>
              <input
                type="text"
                name="name"
                className={`form-control ${
                  errors.name ? "is-invalid" : ""
                }`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}
            </div>

            {/* IMAGE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Student Image
              </label>
              <input
                type="file"
                accept="image/*"
                className={`form-control ${
                  errors.image ? "is-invalid" : ""
                }`}
                onChange={handleImageChange}
              />
              {errors.image && (
                <small className="text-danger">{errors.image}</small>
              )}

              {/* PREVIEW */}
              {preview && (
                <div className="mt-3 position-relative d-inline-block">
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "200px",
                      height: "120px",
                      objectFit: "contain",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      background: "#fff",
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                    onClick={removeImage}
                    style={{ transform: "translate(50%, -50%)" }}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Description
              </label>
              <Editor
  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
  value={formData.description || ""}
  onEditorChange={(content) =>
    setFormData((prev) => ({ ...prev, description: content }))
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
      "code fullscreen help",
    branding: false,
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
        vertical-align: middle;
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
/>

              {errors.description && (
                <small className="text-danger">
                  {errors.description}
                </small>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Add Tutorial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudentTutorialModal;
