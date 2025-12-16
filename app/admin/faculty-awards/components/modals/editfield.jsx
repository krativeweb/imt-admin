"use client";

import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { X } from "lucide-react";

const EditFieldModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    image: null,
    content: "",
  });

  const [preview, setPreview] = useState(null);

  /* ---------------------------------
     LOAD EXISTING FACULTY AWARD
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
        image: null,
        content: field.content || "",
      });

      if (field.image) {
        setPreview(
          `${process.env.NEXT_PUBLIC_API_URL}/${field.image}`
        );
      }
    }
  }, [field]);

  /* ---------------------------------
     IMAGE HANDLER
  --------------------------------- */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
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

    // image optional on edit
    if (!formData.content.trim())
      newErrors.content = "Content is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Edit Faculty Award</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* Image */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Image <span className="text-muted">(optional)</span>
              </label>

              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}
              />

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
            <button className="btn btn-success" onClick={handleSave}>
              Update Faculty Award
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFieldModal;
