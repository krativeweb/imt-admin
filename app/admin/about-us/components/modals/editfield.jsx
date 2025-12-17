// app/admin/mandatory-disclosure/components/modals/EditfieldModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditfieldModal = ({ show, onClose, field, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  /* ---------------------------------
     LOAD EXISTING DATA
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
        title: field.title || "",
        description: field.description || "",
        image: field.image || "",
      });
    }
  }, [field]);

  /* ---------------------------------
     HANDLERS
  --------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSave = () => {
    const form = new FormData();

    form.append("title", formData.title);
    form.append("description", formData.description);

    if (formData.image instanceof File) {
      form.append("image", formData.image);
    }

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
          {/* ================= HEADER ================= */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Edit Content</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          {/* ================= BODY ================= */}
          <div className="modal-body">
            {/* TITLE */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
              />
            </div>

            {/* IMAGE */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageUpload}
              />

              {formData.image && (
                <img
                  src={
                    typeof formData.image === "string"
                      ? `${process.env.NEXT_PUBLIC_API_URL}${formData.image}`
                      : URL.createObjectURL(formData.image)
                  }
                  alt="Preview"
                  className="img-fluid rounded mt-3 border"
                  style={{ maxHeight: "140px" }}
                />
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Description</label>

              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                value={formData.description}
                onEditorChange={(content) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: content,
                  }))
                }
                init={{
                  height: 320,
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
                    "bullist numlist outdent indent | " +
                    "link image media table | code fullscreen help",
                  branding: false,
                  content_style:
                    "body { font-family: Inter, sans-serif; font-size: 14px }",
                }}
              />
            </div>
          </div>

          {/* ================= FOOTER ================= */}
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

export default EditfieldModal;
