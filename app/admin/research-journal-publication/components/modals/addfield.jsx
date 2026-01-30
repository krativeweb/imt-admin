"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
import CmsEditor from "@/components/common/CmsEditor";

const AddResearchArchiveModal = ({ show, onClose, onSave }) => {
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    academic_year: "",
    author_name: "",
    publication_title: "",
    authors: "",
    journal_name: "",
    volume: "",
    publication_url: "",
    abstract: "",
    image: null,
    sortDate: "",
  });

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
  
    if (!formData.academic_year)
      newErrors.academic_year = "Academic year is required";
  
    if (!formData.author_name.trim())
      newErrors.author_name = "Author name is required";
  
    if (!formData.publication_title.trim())
      newErrors.publication_title = "Publication title is required";
  
    if (!formData.authors.trim())
      newErrors.authors = "Authors are required";
  
    if (!formData.journal_name.trim())
      newErrors.journal_name = "Journal name is required";
  
    if (
      !formData.abstract ||
      formData.abstract.replace(/<[^>]*>/g, "").trim() === ""
    )
      newErrors.abstract = "Abstract is required";
  
    if (!formData.sortDate)
      newErrors.sortDate = "Publication date is required";
  
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
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              Add Research Archive Journal Publication
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
                <option value="2025-26">2025-26</option>
                <option value="2024-25">2024-25</option>
                <option value="2023-24">2023-24</option>
                <option value="2022-23">2022-23</option>
                <option value="2021-22">2021-22</option>
                <option value="2020-21">2020-21</option>
                <option value="2019-20">2019-20</option>
                <option value="2018-19">2018-19</option>
                <option value="2017-18">2017-18</option>
                <option value="2016-17">2016-17</option>
                <option value="2015-16">2015-16</option>
                <option value="2014-15">2014-15</option>
                <option value="2013-14">2013-14</option>
                <option value="2012-13">2012-13</option>
                <option value="2011-12">2011-12</option>
                <option value="2010-11">2010-11</option>
              </select>
              {errors.academic_year && (
                <small className="text-danger">{errors.academic_year}</small>
              )}
            </div>

            {/* SORT / PUBLISH DATE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Publication Short Date</label>
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


            {/* AUTHOR NAME */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Author Name</label>
              <input
                type="text"
                name="author_name"
                className={`form-control ${errors.author_name ? "is-invalid" : ""}`}
                value={formData.author_name}
                onChange={handleChange}
              />
            </div>

            {/* PUBLICATION TITLE */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Publication Title</label>
              <input
                type="text"
                name="publication_title"
                className={`form-control ${errors.publication_title ? "is-invalid" : ""}`}
                value={formData.publication_title}
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

            {/* JOURNAL */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Journal</label>
              <input
                type="text"
                name="journal_name"
                className={`form-control ${errors.journal_name ? "is-invalid" : ""}`}
                value={formData.journal_name}
                onChange={handleChange}
              />
            </div>
            {/* VOLUME */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Volume</label>
              <input
                type="text"
                name="volume"
                className={`form-control ${errors.volume ? "is-invalid" : ""}`}
                value={formData.volume}
                onChange={handleChange}
              />
            </div>

            {/* URL */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Publication URL</label>
              <input
                type="url"
                name="publication_url"
                className="form-control"
                value={formData.publication_url}
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
              <label className="form-label fw-semibold">Author Image</label>
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
            <button className="btn btn-primary" onClick={handleSave}>
              Add Publication
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddResearchArchiveModal;
