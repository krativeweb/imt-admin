"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";

const EditStudentsOnRollModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    joining_year: "",
    specialization: "",
    qualification: "",
    research_interests: "",
    email: "",
    bio: "",
    image: null, // optional new image
  });

  /* ---------------------------------
     LOAD EXISTING DATA
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
        name: field.name || "",
        joining_year: field.joining_year || "",
        specialization: field.specialization || "",
        qualification: field.qualification || "",
        research_interests: field.research_interests || "",
        email: field.email || "",
        bio: field.bio || "",
        image: null,
      });
  
      if (field.image) {
        setPreview(
          field.image.startsWith("http")
            ? field.image
            : `${process.env.NEXT_PUBLIC_API_URL}/${field.image}`
        );
      }
    }
  }, [field]);
  

  /* ---------------------------------
     INPUT HANDLER
  --------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

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

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.joining_year) newErrors.joining_year = "Joining year is required";
    if (!formData.specialization.trim()) newErrors.specialization = "Specialization is required";
    if (!formData.qualification.trim()) newErrors.qualification = "Qualification is required";
    if (!formData.research_interests.trim()) newErrors.research_interests = "Research interests are required";
    if (!formData.email.trim()) newErrors.email = "Email is required";

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
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Edit Student on Roll</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            {[
              ["Name", "name"],
              ["Joining Year", "joining_year"],
              ["Specialization", "specialization"],
              ["Qualification", "qualification"],
              ["Research Interests", "research_interests"],
              ["Email", "email"],
            ].map(([label, key]) => (
              <div className="mb-3" key={key}>
                <label className="form-label fw-semibold">{label}</label>
                <input
                  type={key === "email" ? "email" : "text"}
                  name={key}
                  className={`form-control ${errors[key] ? "is-invalid" : ""}`}
                  value={formData[key]}
                  onChange={handleChange}
                />
                {errors[key] && (
                  <small className="text-danger">{errors[key]}</small>
                )}
              </div>
            ))}

            {/* BIO */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Short Bio</label>

              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY_2}
                value={formData.bio || ""}
                onEditorChange={(content) =>
                  setFormData((prev) => ({ ...prev, bio: content }))
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
                    "undo redo | formatselect | fontselect fontsizeselect | " +
                    "bold italic forecolor backcolor | " +
                    "alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist outdent indent | link image media table | " +
                    "code fullscreen help",
            
                  branding: false,
                  resize: true,
            
                  /* ✅ IMPORTANT FIXES */
                  verify_html: false,
                  cleanup: false,
                  cleanup_on_startup: false,
                  forced_root_block: false,
                  remove_empty: false,
            
                  valid_elements: "*[*]",
                  extended_valid_elements: "*[*]",
                  valid_children: "+div[div|h2|p|ul|li|span|a]",
                  sandbox_iframes: false,
            
                  content_css: [
                    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
                  ],
            
                  content_style: `
                    body {
                      font-family: 'Inter', sans-serif;
                      font-size: 14px;
                      padding: 10px;
                    }
            
                    /* Always show all tab content inside editor */
                    .tab-pane {
                      display: block !important;
                      opacity: 1 !important;
                      visibility: visible !important;
                    }
            
                    .fade {
                      opacity: 1 !important;
                    }
            
                    /* Disable clicking tabs inside editor */
                    .nav-tabs,
                    .nav-pills {
                      pointer-events: none;
                      opacity: 0.7;
                    }
            
                    /* Bootstrap tables */
                    table {
                      width: 100%;
                      border-collapse: collapse;
                    }
            
                    th, td {
                      border: 1px solid #dee2e6;
                      padding: 8px;
                      vertical-align: middle;
                    }
            
                    /* Cards */
                    .card {
                      border: 1px solid #ddd;
                      border-radius: 6px;
                      padding: 12px;
                      margin-bottom: 16px;
                    }
            
                    /* Buttons */
                    .btn {
                      display: inline-block;
                      padding: 4px 10px;
                      font-size: 13px;
                      border-radius: 4px;
                    }
            
                    .btn-warning {
                      background-color: #ffc107;
                      color: #000;
                    }
                  `,
                }}
              />
            </div>

            {/* IMAGE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Profile Image <span className="text-muted">(optional)</span>
              </label>

              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}
              />

              {preview && (
                <div className="mt-3 position-relative d-inline-block">
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: "160px",
                      height: "160px",
                      objectFit: "cover",
                      borderRadius: "8px",
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
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              Update Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStudentsOnRollModal;
