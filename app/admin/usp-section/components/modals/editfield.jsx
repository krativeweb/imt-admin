// app/admin/mandatory-disclosure/components/modals/EditUspModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditUspModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    content: "",
  });

  /* ---------------------------------
     LOAD EXISTING CONTENT
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
        content: field.content || "",
      });
    }
  }, [field]);

  /* ---------------------------------
     SAVE HANDLER
  --------------------------------- */
  const handleSave = () => {
    // ❗ No cleaning, no trimming — store raw HTML
    if (formData.content === undefined || formData.content === null) {
      setErrors({ content: "Content is required" });
      return;
    }

    console.log("USP CONTENT (HTML):", formData.content);

    onSave({
      content: formData.content, // JSON
    });
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
            <h5 className="modal-title fw-bold">Edit USP Section</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* ================= BODY ================= */}
          <div className="modal-body">
            <label className="form-label fw-semibold d-block mb-2">
              Content
            </label>

            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              value={formData.content}
              onEditorChange={(content) =>
                setFormData((prev) => ({ ...prev, content }))
              }
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
                  "bullist numlist | link table | code fullscreen",
                branding: false,
              }}
            />

            {errors.content && (
              <small className="text-danger">{errors.content}</small>
            )}
          </div>

          {/* ================= FOOTER ================= */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              Save Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUspModal;
 