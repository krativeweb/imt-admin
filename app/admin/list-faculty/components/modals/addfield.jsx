"use client";

import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const AddFacultyModal = ({ show, onClose, onSave }) => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    academic_title: "",
    name: "",
    designation: "",
    qualification: "",
    functional_area: "",
    date_of_joining: "",
    email: "",
    phone: "",
    linkedin_url: "",
    google_scholar_url: "",
    faculty_image: null,
    qr_image: null,
    brief: "",
    education: "",
    teaching_research_interests: "",
    publications: "",
    awards_honors: "",
    other_professional_activities: "",
  });

  /* ---------------------------------
     COMMON INPUT HANDLER
  --------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  /* ---------------------------------
     FILE HANDLER
  --------------------------------- */
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  /* ---------------------------------
     SAVE HANDLER
  --------------------------------- */
  const handleSave = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.designation.trim())
      newErrors.designation = "Designation is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.faculty_image)
      newErrors.faculty_image = "Faculty image is required";
    if (!formData.qr_image)
      newErrors.qr_image = "QR image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare FormData for API
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    onSave(payload);
    onClose();
  };

  if (!show) return null;

  /* ---------------------------------
     TINYMCE CONFIG
  --------------------------------- */
  const editorConfig = {
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
      "bold italic underline strikethrough forecolor backcolor | " +
      "alignleft aligncenter alignright alignjustify | " +
      "bullist numlist outdent indent | link image media table | " +
      "removeformat | code fullscreen help",
    branding: false,
  };

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
            <h5 className="modal-title fw-bold">Add Faculty</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          {/* BODY */}
          <div className="modal-body">
            {/* BASIC DETAILS */}
            <div className="row">
              <div className="col-md-3 mb-4">
                <label className="form-label fw-semibold">
                  Academic Title
                </label>
                <input
                  type="text"
                  name="academic_title"
                  className="form-control"
                  value={formData.academic_title}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3 mb-4">
                <label className="form-label fw-semibold">Name *</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <small className="text-danger">{errors.name}</small>
                )}
              </div>

              <div className="col-md-3 mb-4">
                <label className="form-label fw-semibold">
                  Designation *
                </label>
                <input
                  type="text"
                  name="designation"
                  className={`form-control ${
                    errors.designation ? "is-invalid" : ""
                  }`}
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3 mb-4">
                <label className="form-label fw-semibold">
                  Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  className="form-control"
                  value={formData.qualification}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-4">
                <label className="form-label fw-semibold">
                  Functional Area
                </label>
                <input
                  type="text"
                  name="functional_area"
                  className="form-control"
                  value={formData.functional_area}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-4">
                <label className="form-label fw-semibold">
                  Date of Joining
                </label>
                <input
                  type="date"
                  name="date_of_joining"
                  className="form-control"
                  value={formData.date_of_joining}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-4">
                <label className="form-label fw-semibold">Email *</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4 mb-4">
                <label className="form-label fw-semibold">
                  Faculty Image *
                </label>
                <input
                  type="file"
                  name="faculty_image"
                  accept="image/*"
                  className={`form-control ${
                    errors.faculty_image ? "is-invalid" : ""
                  }`}
                  onChange={handleFileChange}
                />
                {formData.faculty_image && (
                  <img
                    src={URL.createObjectURL(formData.faculty_image)}
                    alt="Faculty Preview"
                    className="img-thumbnail mt-2"
                    style={{ maxHeight: "120px" }}
                  />
                )}
              </div>

              <div className="col-md-4 mb-4">
                <label className="form-label fw-semibold">
                  QR Image *
                </label>
                <input
                  type="file"
                  name="qr_image"
                  accept="image/*"
                  className={`form-control ${
                    errors.qr_image ? "is-invalid" : ""
                  }`}
                  onChange={handleFileChange}
                />
                {formData.qr_image && (
                  <img
                    src={URL.createObjectURL(formData.qr_image)}
                    alt="QR Preview"
                    className="img-thumbnail mt-2"
                    style={{ maxHeight: "120px" }}
                  />
                )}
              </div>
            </div>

            <hr className="my-5" />

            {/* RICH TEXT SECTIONS */}
            {[
              ["brief", "Brief"],
              ["education", "Education"],
              [
                "teaching_research_interests",
                "Teaching & Research Interests",
              ],
              ["publications", "Publications"],
              ["awards_honors", "Awards & Honors"],
              [
                "other_professional_activities",
                "Other Professional Activities",
              ],
            ].map(([key, label]) => (
              <div className="mb-5" key={key}>
                <label className="form-label fw-semibold mb-2">
                  {label}
                </label>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                  value={formData[key]}
                  init={editorConfig}
                  onEditorChange={(content) =>
                    setFormData((prev) => ({
                      ...prev,
                      [key]: content,
                    }))
                  }
                />
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save Faculty
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFacultyModal;
