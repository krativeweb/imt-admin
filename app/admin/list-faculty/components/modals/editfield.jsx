"use client";

import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const EditfieldModal = ({ show, onClose, field, onSave }) => {
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
    faculty_image: null, // string | File
    qr_image: null,      // string | File
    brief: "",
    education: "",
    teaching_research_interests: "",
    publications: "",
    awards_honors: "",
    other_professional_activities: "",
  });

  /* ---------------------------------
     PREFILL DATA FROM TABLE
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
        academic_title: field.academic_title || "",
        name: field.name || "",
        designation: field.designation || "",
        qualification: field.qualification || "",
        functional_area: field.functional_area || "",
        date_of_joining: field.date_of_joining
          ? field.date_of_joining.split("T")[0]
          : "",
        email: field.email || "",
        phone: field.phone || "",
        linkedin_url: field.linkedin_url || "",
        google_scholar_url: field.google_scholar_url || "",
        faculty_image: field.faculty_image || null,
        qr_image: field.qr_image || null,
        brief: field.brief || "",
        education: field.education || "",
        teaching_research_interests:
          field.teaching_research_interests || "",
        publications: field.publications || "",
        awards_honors: field.awards_honors || "",
        other_professional_activities:
          field.other_professional_activities || "",
      });
    }
  }, [field]);

  /* ---------------------------------
     INPUT HANDLERS
  --------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files?.[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  /* ---------------------------------
     SAVE (SEND TO TABLE)
  --------------------------------- */
  const handleSave = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name required";
    if (!formData.designation.trim())
      newErrors.designation = "Designation required";

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== "") {
        payload.append(key, value);
      }
    });

    onSave(payload); // 👉 Table handles API + refresh
  };

  if (!show) return null;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const editorConfig = {
    height: 280,
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
      "bold italic underline forecolor backcolor | " +
      "alignleft aligncenter alignright alignjustify | " +
      "bullist numlist outdent indent | link image media table | " +
      "code fullscreen help",
    branding: false,
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Edit Faculty</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <div className="row">
              {[
                ["academic_title", "Academic Title"],
                ["name", "Name *"],
                ["designation", "Designation *"],
                ["qualification", "Qualification"],
                ["functional_area", "Functional Area"],
                ["email", "Email"],
                ["phone", "Phone"],
                ["linkedin_url", "LinkedIn URL"],
                ["google_scholar_url", "Google Scholar URL"],
              ].map(([key, label]) => (
                <div className="col-md-4 mb-4" key={key}>
                  <label className="form-label fw-semibold">
                    {label}
                  </label>
                  <input
                    type="text"
                    name={key}
                    className="form-control"
                    value={formData[key]}
                    onChange={handleChange}
                  />
                </div>
              ))}

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

              {["faculty_image", "qr_image"].map((key) => (
                <div className="col-md-4 mb-4" key={key}>
                  <label className="form-label fw-semibold">
                    {key === "faculty_image"
                      ? "Faculty Image"
                      : "QR Image"}
                  </label>
                  <input
                    type="file"
                    name={key}
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {formData[key] && (
                    <img
                      src={
                        typeof formData[key] === "string"
                          ? `${API_URL}/${formData[key]}`
                          : URL.createObjectURL(formData[key])
                      }
                      className="img-thumbnail mt-2"
                      style={{ maxHeight: 120 }}
                    />
                  )}
                </div>
              ))}
            </div>

            <hr className="my-4" />

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
              <div className="mb-4" key={key}>
                <label className="form-label fw-semibold">
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

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Update Faculty
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditfieldModal;
