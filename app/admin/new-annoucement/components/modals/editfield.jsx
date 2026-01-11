// app/admin/call-to-action-bar/components/modals/EditFieldModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import CmsEditor from "@/components/common/CmsEditor";

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
              Edit New Announcement Bar Content
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          {/* BODY */}
          <div className="modal-body">
            <label className="form-label fw-semibold">
            New Announcement Bar Content
            </label>

            <CmsEditor
                value={formData.cta_content}
                onChange={(v) =>
                  setFormData((p) => ({ ...p, cta_content: v }))
                }
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
