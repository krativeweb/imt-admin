"use client";

import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { X } from "lucide-react";

const AddFieldModal = ({ show, onClose, onSave }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    type: "",
    content: "",
  });

  const [preview, setPreview] = useState(null);

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

  const handleSave = () => {
    const newErrors = {};

    if (!formData.image) newErrors.image = "Image is required";
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.content.trim()) newErrors.content = "Content is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);

    setFormData({
      image: null,
      title: "",
      type: "",
      content: "",
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
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Awards for Institute</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* Image Field */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Image</label>
              <input
                type="file"
                accept="image/*"
                className={`form-control ${errors.image ? "is-invalid" : ""}`}
                onChange={handleImageChange}
              />
              {errors.image && (
                <small className="text-danger">{errors.image}</small>
              )}

              {/* IMAGE PREVIEW */}
              {preview && (
                <div className="mt-3 position-relative d-inline-block">
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "200px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
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

            {/* Title + Type */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Title</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.title ? "is-invalid" : ""
                  }`}
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                />
                {errors.title && (
                  <small className="text-danger">{errors.title}</small>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Type</label>
                <select
                  className={`form-select ${
                    errors.type ? "is-invalid" : ""
                  }`}
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      type: e.target.value,
                    }))
                  }
                >
                  <option value="" disabled>
                    Select Award Type
                  </option>
                  <option value="Awards for Institute">
                    Awards for Institute
                  </option>
                  <option value="Awards for Director">
                    Awards for Director
                  </option>
                </select>
                {errors.type && (
                  <small className="text-danger">{errors.type}</small>
                )}
              </div>
            </div>

            {/* Content */}
            <label className="form-label fw-semibold d-block mb-2">
              Content
            </label>
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              value={formData.content}
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
                  "undo redo | formatselect | bold italic forecolor backcolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist | link image media table | code fullscreen",
                branding: false,
              }}
              onEditorChange={(content) =>
                setFormData((prev) => ({ ...prev, content }))
              }
            />
            {errors.content && (
              <small className="text-danger">{errors.content}</small>
            )}
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save Award
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFieldModal;
