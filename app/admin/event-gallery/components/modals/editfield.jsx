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

  const [initialState, setInitialState] = useState(null);

  /* ===============================
     LOAD INITIAL DATA
  ================================ */
  useEffect(() => {
    if (show && field) {
      const imageUrl = field.image
        ? field.image.startsWith("http")
          ? field.image
          : `${process.env.NEXT_PUBLIC_API_URL}/${field.image}`
        : null;
  
      const init = {
        images: null,
        preview: imageUrl,
        content: field.content || "",
      };
  
      setFormData(init);
      setInitialState(init);
      setErrors({});
    }
  }, [show, field]);
  

  /* ===============================
     IMAGE CHANGE
  ================================ */
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      images: file,
      preview: file ? URL.createObjectURL(file) : prev.preview,
    }));

    if (errors.images) setErrors({});
  };

  /* ===============================
     SAVE HANDLER
  ================================ */
  const handleSave = () => {
    const newErrors = {};

    // 🔴 NO CHANGE DETECTION
    const noImageChange = !formData.images;
    const noContentChange =
      initialState &&
      formData.content.trim() === initialState.content.trim();

    if (noImageChange && noContentChange) {
      onClose(); // nothing changed
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(formData);

    setFormData({ images: null, preview: null, content: "" });
    setInitialState(null);
    onClose();
  };

  if (!show) return null;

  const isUnchanged =
    !formData.images &&
    initialState &&
    formData.content.trim() === initialState.content.trim();

  /* ===============================
     UI
  ================================ */
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
            <h5 className="modal-title fw-bold">Edit Event Gallery</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* IMAGE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Replace Image (Optional)
              </label>

              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
              />

              {/* PREVIEW */}
              {formData.preview && (
                <div className="mt-3">
                  <img
                    src={formData.preview}
                    alt="Preview"
                    style={{
                      maxWidth: "160px",
                      maxHeight: "110px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              )}
            </div>

            {/* CONTENT */}
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

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>

            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={isUnchanged}
            >
              Update Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFieldModal;
