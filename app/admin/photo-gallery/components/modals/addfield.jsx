"use client";

import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const AddFieldModal = ({ show, onClose, onSave }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    images: null,  preview: null,
    content: "",
  });
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, images: file }));
    if (errors.images) setErrors({});
  };
const handleSave = () => {
  const newErrors = {};
  if (!formData.images) newErrors.images = "Please select an image";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  onSave(formData); // send to parent only
  setFormData({ images: null, content: "", preview: null });
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
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Add Photo Gallery</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            {/* Title */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Upload Image</label>
              <input
                type="file"
                className={`form-control ${errors.images ? "is-invalid" : ""}`}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFormData((prev) => ({
                    ...prev,
                    images: file,
                    preview: file ? URL.createObjectURL(file) : null,
                  }));
                  if (errors.images) setErrors({});
                }}
              />
              {errors.images && (
                <small className="text-danger">{errors.images}</small>
              )}

              {/* Image Preview */}
              {formData.preview && (
                <div className="mt-3">
                  <img
                    src={formData.preview}
                    alt="Preview"
                    style={{
                      maxWidth: "150px",
                      maxHeight: "100px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              )}
            </div>

            {/* TinyMCE Editor */}
            <label className="form-label fw-semibold d-block mb-2">
              Content
            </label>
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              value={formData.content}
              init={{
                height: 400,
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
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Add Photo Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFieldModal;
