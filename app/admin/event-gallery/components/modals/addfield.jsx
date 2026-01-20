"use client";

import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const AddFieldModal = ({ show, onClose, onSave, initialData = null }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    images: null,
    preview: null,
    content: "",
  });

  const [initialState, setInitialState] = useState(null);

  /* ===============================
     LOAD INITIAL DATA (EDIT MODE)
  ================================ */
  useEffect(() => {
    if (show) {
      const init = {
        images: null, // no image change initially
        preview: initialData?.image || null,
        content: initialData?.content || "",
      };

      setFormData(init);
      setInitialState(init);
      setErrors({});
    }
  }, [show, initialData]);

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
      onClose(); // nothing changed → just close modal
      return;
    }

    // 🔴 Image required only if none exists
    if (!formData.images && !initialState?.preview) {
      newErrors.images = "Please select an image";
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
            <h5 className="modal-title fw-bold">
              {initialData ? "Edit Event Gallery" : "Add Event Gallery"}
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* IMAGE UPLOAD */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Upload Image</label>

              <input
                type="file"
                className={`form-control ${errors.images ? "is-invalid" : ""}`}
                accept="image/*"
                onChange={handleFileChange}
              />

              {errors.images && (
                <small className="text-danger">{errors.images}</small>
              )}

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
           {/*} <label className="form-label fw-semibold d-block mb-2">
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
            />*/}
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
              {initialData ? "Update Gallery" : "Add Gallery"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFieldModal;
