// app/admin/call-to-action-bar/components/modals/EditFieldModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditFieldModal = ({ show, onClose, field, onSave }) => {
  const [formData, setFormData] = useState({
    cta_content: "",
  });

  /* LOAD EXISTING DATA */
  useEffect(() => {
    if (field) {
      setFormData({
        cta_content: field.cta_content || "",
      });
    }
  }, [field]);

  /* SAVE */
  const handleSave = () => {
    onSave({
      cta_content: formData.cta_content,
    });
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              Edit Announcement Content
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          {/* BODY */}
          <div className="modal-body">
            <label className="form-label fw-semibold">
            Announcement Content
            </label>

            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
              value={formData.cta_content || ""}
              onEditorChange={(content) =>
                setFormData((prev) => ({ ...prev, cta_content: content }))
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
                  "undo redo | formatselect | bold italic forecolor | " +
                  "alignleft aligncenter alignright | bullist numlist | " +
                  "link image media table | code fullscreen",
                branding: false,
              }}
            />
          </div>

          {/* FOOTER */}
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
