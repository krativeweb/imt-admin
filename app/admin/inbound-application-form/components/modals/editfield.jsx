"use client";

import React, { useState, useEffect } from "react";
import CmsEditor from "@/components/common/CmsEditor";

const EditInboundApplicationFormModal = ({
  show,
  onClose,
  field,
  onSave,
}) => {
  const [errors, setErrors] = useState({});
  const [content, setContent] = useState("");

  /* ---------------------------------
     LOAD EXISTING DATA
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setContent(field.content || "");
    }
  }, [field]);

  /* ---------------------------------
     SAVE HANDLER
  --------------------------------- */
  const handleSave = () => {
    const newErrors = {};
  
    if (!content.trim()) {
      newErrors.content = "Content is required";
    }
  
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
  
    onSave({ content }); // ✅ JSON
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
            <h5 className="modal-title fw-bold">
              Edit Inbound Application Form Content
            </h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          {/* BODY */}
          <div className="modal-body">
            <label className="form-label fw-semibold mb-2">
              Content
            </label>

            <CmsEditor
              value={content}
              onChange={(v) => setContent(v)}
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
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInboundApplicationFormModal;
