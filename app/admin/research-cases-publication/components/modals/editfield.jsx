"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import CmsEditor from "@/components/common/CmsEditor";

const EditResearchCasesPublicationModal = ({ show, onClose, field, onSave }) => {
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    academic_year: "",
    sortDate: "",              // ✅ NEW
    name: "",
    title: "",
    authors: "",
    publisher: "",
    reference: "",
    case_url: "",
    abstract: "",
    image: null,
  });

  /* ---------------------------------
     LOAD EXISTING DATA
  --------------------------------- */
  useEffect(() => {
    if (field) {
      setFormData({
        academic_year: field.academic_year || "",
        sortDate: field.sortDate
          ? new Date(field.sortDate).toISOString().split("T")[0]
          : "",
        name: field.name || "",
        title: field.title || "",
        authors: field.authors || "",
        publisher: field.publisher || "",
        reference: field.reference || "",
        case_url: field.case_url || "",
        abstract: field.abstract || "",
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
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
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

    if (!formData.academic_year)
      newErrors.academic_year = "Academic year is required";

    if (!formData.sortDate)
      newErrors.sortDate = "Publication date is required";

    if (!formData.name.trim())
      newErrors.name = "Name is required";

    if (!formData.title.trim())
      newErrors.title = "Title is required";

    if (!formData.authors.trim())
      newErrors.authors = "Authors are required";

    if (!formData.publisher.trim())
      newErrors.publisher = "Publisher is required";

    if (!formData.reference.trim())
      newErrors.reference = "Reference is required";

    if (
      !formData.abstract ||
      formData.abstract.replace(/<[^>]*>/g, "").trim() === ""
    )
      newErrors.abstract = "Abstract is required";

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
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              Edit Research Case Publication
            </h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">

            {/* ACADEMIC YEAR */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Academic Year</label>
              <select
                name="academic_year"
                className={`form-select ${errors.academic_year ? "is-invalid" : ""}`}
                value={formData.academic_year}
                onChange={handleChange}
              >
                <option value="">Select Year</option>
                {[
                  "2025-26","2024-25","2023-24","2022-23","2021-22",
                  "2020-21","2019-20","2018-19","2017-18","2016-17",
                  "2015-16","2014-15","2013-14","2012-13"
                ].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              {errors.academic_year && (
                <small className="text-danger">{errors.academic_year}</small>
              )}
            </div>

            {/* 🔥 PUBLICATION SHORT DATE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Publication Short Date
              </label>
              <input
                type="date"
                name="sortDate"
                className={`form-control ${errors.sortDate ? "is-invalid" : ""}`}
                value={formData.sortDate}
                onChange={handleChange}
              />
              {errors.sortDate && (
                <small className="text-danger">{errors.sortDate}</small>
              )}
            </div>

            {/* NAME */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                type="text"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* TITLE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input
                type="text"
                name="title"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* AUTHORS */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Authors</label>
              <input
                type="text"
                name="authors"
                className={`form-control ${errors.authors ? "is-invalid" : ""}`}
                value={formData.authors}
                onChange={handleChange}
              />
            </div>

            {/* PUBLISHER */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Publisher</label>
              <input
                type="text"
                name="publisher"
                className={`form-control ${errors.publisher ? "is-invalid" : ""}`}
                value={formData.publisher}
                onChange={handleChange}
              />
            </div>

            {/* REFERENCE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Reference No</label>
              <input
                type="text"
                name="reference"
                className={`form-control ${errors.reference ? "is-invalid" : ""}`}
                value={formData.reference}
                onChange={handleChange}
              />
            </div>

            {/* URL */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Case URL</label>
              <input
                type="url"
                name="case_url"
                className="form-control"
                value={formData.case_url}
                onChange={handleChange}
              />
            </div>

            {/* ABSTRACT */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Abstract</label>
              <CmsEditor
                value={formData.abstract}
                onChange={(v) =>
                  setFormData((p) => ({ ...p, abstract: v }))
                }
              />
              {errors.abstract && (
                <div className="invalid-feedback d-block">
                  {errors.abstract}
                </div>
              )}
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
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                    onClick={removeImage}
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
              Update Case Publication
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditResearchCasesPublicationModal;
