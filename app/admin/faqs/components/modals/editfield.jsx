"use client";

import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditFieldModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  // Load existing FAQ data
  useEffect(() => {
    if (field) {
      setFormData({
        question: field.question || "",
        answer: field.answer || "",
      });
    }
  }, [field]);

  const handleSave = () => {
    const newErrors = {};

    if (!formData.question.trim()) {
      newErrors.question = "Question is required";
    }

    if (!formData.answer.trim()) {
      newErrors.answer = "Answer is required";
    }

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
          
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Edit FAQ</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">

            {/* Question Field */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Question</label>
              <input
                type="text"
                className={`form-control ${errors.question ? "is-invalid" : ""}`}
                placeholder="Enter question"
                value={formData.question}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    question: e.target.value,
                  }))
                }
              />
              {errors.question && (
                <small className="text-danger">{errors.question}</small>
              )}
            </div>

            {/* Answer (TinyMCE) */}
            <label className="form-label fw-semibold d-block mb-2">
              Answer
            </label>
            <Editor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
              value={formData.answer}
              init={{
                height: 350,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "media",
                  "table",
                  "code",
                  "fullscreen",
                  "preview"
                ],
                toolbar:
                  "undo redo | bold italic underline | alignleft aligncenter alignright | " +
                  "bullist numlist | link image media table | code fullscreen",
                branding: false,
              }}
              onEditorChange={(answer) =>
                setFormData((prev) => ({ ...prev, answer }))
              }
            />
            {errors.answer && (
              <small className="text-danger">{errors.answer}</small>
            )}
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
