"use client";

import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditFieldModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    images: null,
    preview: null,
    content: "",
  });

  useEffect(() => {
    if (field) {
      setFormData({
        images: null, // only update if new chosen
        preview: `${process.env.NEXT_PUBLIC_API_URL}/${field.image}`, 
        content: field.content || "",
      });
    }
  }, [field]);

  const handleSave = () => {
    // No mandatory image validation for Edit ✔
    onSave(formData);
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
            <h5 className="modal-title fw-bold">Edit Photo Gallery</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">

            {/* Image Upload */}
            <label className="form-label fw-semibold">Replace Image (Optional)</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => {
                const file = e.target.files[0];
                setFormData((prev) => ({
                  ...prev,
                  images: file,
                  preview: file ? URL.createObjectURL(file) : prev.preview,
                }));
              }}
            />

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

            {/* TinyMCE Editor */}
            <label className="form-label fw-semibold d-block mt-3">
              Content
            </label>
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              value={formData.content}
              init={{
                height: 400,
                menubar: true,
                plugins: [
                  "advlist", "autolink", "lists", "link", "image", "media",
                  "table", "code", "fullscreen", "preview"
                ],
                toolbar:
                  "undo redo | bold italic | alignleft aligncenter alignright | " +
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
