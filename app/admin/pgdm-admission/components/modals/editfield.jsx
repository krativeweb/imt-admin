// app/admin/mandatory-disclosure/components/modals/EditfieldModal.jsx
"use client";

import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import CmsEditor from "@/components/common/CmsEditor";

const EditfieldModal = ({ show, onClose, field, onSave }) => {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [previews, setPreviews] = useState([]);

const [existingCampusImages, setExistingCampusImages] = useState([]);
const [newCampusImages, setNewCampusImages] = useState([]);
const [campusPreviews, setCampusPreviews] = useState([]);

  const [formData, setFormData] = useState({
    page_title: "",
    page_slug: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
    meta_canonical: "",
    banner_image: "",
    banner_text: "",
    features_section: "",
    advantage_of_imt_hyderabad: "",
    advantage_of_imt_blocks: "",
    impeccable_placement: "",
    elligibility: "",
    remember_important_dates: "",
    admission_process: "",
    admission_information: "",
    program_highlights:"",
    life_imt_Hyderabad_campus:"",
  });

  useEffect(() => {
    if (!field) return;
  
    /* ---------------- TEXT FIELDS ---------------- */
    setFormData({
      page_title: field.page_title || "",
      page_slug: field.page_slug || "",
      meta_title: field.meta_title || "",
      meta_description: field.meta_description || "",
      meta_keywords: field.meta_keywords || "",
      meta_canonical: field.meta_canonical || "",
      banner_image: field.banner_image || "",
      banner_text: field.banner_text || "",
  
      features_section: field.features_section || "",
      advantage_of_imt_hyderabad: field.advantage_of_imt_hyderabad || "",
      advantage_of_imt_blocks: field.advantage_of_imt_blocks || "",
      impeccable_placement: field.impeccable_placement || "",
      elligibility: field.elligibility || "",
      remember_important_dates: field.remember_important_dates || "",
      admission_process: field.admission_process || "",
      admission_information: field.admission_information || "",
      program_highlights: field.program_highlights || "",
      life_imt_Hyderabad_campus: field.life_imt_Hyderabad_campus || "",
    });
  
    /* ---------------- EXISTING IMAGES (CRITICAL) ---------------- */
    setExistingImages(
      Array.isArray(field.accreditation_images)
        ? field.accreditation_images
        : []
    );
  
    setExistingCampusImages(
      Array.isArray(field.life_imt_Hyderabad_images)
        ? field.life_imt_Hyderabad_images
        : []
    );
  
    /* ---------------- RESET NEW UPLOAD STATES ---------------- */
    setNewImages([]);
    setPreviews([]);
  
    setNewCampusImages([]);
    setCampusPreviews([]);
  }, [field]);
  

  const handleAddPeople = () => {
    router.push("/admin/student-tutorials");
  };
  const handleAddProgram = () => {
    router.push("/admin/program-offered-admission");
  };
  

  const getImageUrl = (path) => {
    if (!path) return "";
    return path.startsWith("/api")
      ? `${process.env.NEXT_PUBLIC_API_URL}${path}`
      : path;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  /* ---------------------------------
   LIFE @ IMT CAMPUS IMAGE HANDLERS
--------------------------------- */
const handleCampusImageChange = (e) => {
  const files = Array.from(e.target.files);

  setNewCampusImages((prev) => [...prev, ...files]);

  const previewUrls = files.map((file) =>
    URL.createObjectURL(file)
  );

  setCampusPreviews((prev) => [...prev, ...previewUrls]);
};

const removeExistingCampusImage = (img) => {
  setExistingCampusImages((prev) => prev.filter((i) => i !== img));
};

const removeNewCampusImage = (index) => {
  setNewCampusImages((prev) => prev.filter((_, i) => i !== index));
  setCampusPreviews((prev) => prev.filter((_, i) => i !== index));
};


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, banner_image: file }));
    }
  };

  const handleSave = () => {
    const form = new FormData();
  
    /* TEXT FIELDS */
    Object.entries(formData).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        form.append(k, v);
      }
    });
  
    /* ✅ SEND EXISTING IMAGES */
    existingImages.forEach((img) => {
      form.append("existing_accreditation_images[]", img);
    });
  
    /* ✅ SEND NEW IMAGES */
    newImages.forEach((file) => {
      form.append("accreditation_images", file);
    });
  
    /* CAMPUS IMAGES */
    existingCampusImages.forEach((img) => {
      form.append("existing_campus_images[]", img);
    });
  
    newCampusImages.forEach((file) => {
      form.append("life_imt_Hyderabad_images", file);
    });
  
    onSave(form);
  };
  

  /* ---------------------------------
   MULTIPLE IMAGE HANDLERS
--------------------------------- */
const handleImageChange = (e) => {
  const files = Array.from(e.target.files);

  setNewImages((prev) => [...prev, ...files]);

  const previewUrls = files.map((file) =>
    URL.createObjectURL(file)
  );
  setPreviews((prev) => [...prev, ...previewUrls]);
};

const removeExistingImage = (img) => {
  setExistingImages((prev) => prev.filter((i) => i !== img));
};

const removeNewImage = (index) => {
  setNewImages((prev) => prev.filter((_, i) => i !== index));
  setPreviews((prev) => prev.filter((_, i) => i !== index));
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
            <h5 className="modal-title fw-bold">
              Edit Page SEO & Banner Content
            </h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            {/* SEO FIELDS */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Page Title</label>
                <input
                  type="text"
                  name="page_title"
                  className="form-control"
                  value={formData.page_title}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Page Slug</label>
                <input
                  type="text"
                  name="page_slug"
                  className="form-control"
                  value={formData.page_slug}
                  readOnly
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Meta Title</label>
                <input
                  type="text"
                  name="meta_title"
                  className="form-control"
                  value={formData.meta_title}
                  onChange={handleChange}
                  maxLength={60}
                />
                <small className="text-muted">
                  {formData.meta_title.length}/60
                </small>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Meta Keywords</label>
                <input
                  type="text"
                  name="meta_keywords"
                  className="form-control"
                  value={formData.meta_keywords}
                  onChange={handleChange}
                  placeholder="keyword1, keyword2"
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Meta Description
                </label>
                <textarea
                  name="meta_description"
                  rows="3"
                  className="form-control"
                  value={formData.meta_description}
                  onChange={handleChange}
                  maxLength={160}
                />
                <small className="text-muted">
                  {formData.meta_description.length}/160
                </small>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">
                  Canonical URL
                </label>
                <input
                  type="url"
                  name="meta_canonical"
                  className="form-control"
                  value={formData.meta_canonical}
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr className="my-4" />

            {/* BANNER IMAGE */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Banner Image</label>
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={handleImageUpload}
              />

              {formData.banner_image && (
                <img
                src={
                  typeof formData.banner_image === "string"
                    ? getImageUrl(formData.banner_image)
                    : URL.createObjectURL(formData.banner_image)
                }
                alt="Banner Preview"
                className="img-fluid rounded mt-3 border"
                style={{ maxHeight: "120px" }}
              />
              )}
            </div>

            {/* BANNER TEXT */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Banner Text</label>

              <Editor
                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                value={formData.banner_text || ""}
                onEditorChange={(content) =>
                  setFormData((prev) => ({ ...prev, banner_text: content }))
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
                  content_style:
                    "body { font-family: Inter, sans-serif; font-size: 14px }",
                }}
              />
            </div>
            {/* PGDM Finance Content TEXT */}
            <div className="mb-4">
              <label className="form-label fw-semibold">  Features Section</label>
              <CmsEditor
                  value={formData.features_section}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, features_section: v }))
                  }
                />

             
            </div>
                  {/* Curriculum TEXT */}
              <div className="mb-4">
              <label className="form-label fw-semibold">Advantage of IMT Hyderabad</label>
              <CmsEditor
                  value={formData.advantage_of_imt_hyderabad}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, advantage_of_imt_hyderabad: v }))
                  }
                />

            
            </div>
                {/* Key Features TEXT */}
                <div className="mb-4">
              <label className="form-label fw-semibold">Advantage Of Imt Blocks</label>
              <CmsEditor
                  value={formData.advantage_of_imt_blocks}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, advantage_of_imt_blocks: v }))
                  }
                />
             
            </div>
              {/* Program Outcome TEXT */}
              <div className="mb-4">
              <label className="form-label fw-semibold">Impeccable Placements</label>
              <CmsEditor
                  value={formData.impeccable_placement}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, impeccable_placement: v }))
                  }
                />
              
            </div>

            {/* ===============================
    ACCREDITATION & APPROVALS
=============================== */}
<div className="mb-4">
  <label className="form-label fw-semibold">
    Accreditation & Approvals (Multiple)
    
  </label>

  {/* EXISTING IMAGES */}
  <div className="d-flex flex-wrap gap-3 mb-3">
    {existingImages.map((img, i) => (
      <div key={i} className="position-relative">
        <img
  src={getImageUrl(img)}
  style={{
    width: 120,
    height: 80,
    objectFit: "cover",
    borderRadius: 6,
    border: "1px solid #ddd",
  }}
/>
        <button
          type="button"
          className="btn btn-danger btn-sm position-absolute top-0 end-0"
          onClick={() => removeExistingImage(img)}
          style={{ transform: "translate(50%, -50%)" }}
        >
          <X size={14} />
        </button>
      </div>
    ))}
  </div>

  {/* ADD NEW IMAGES */}
  <input
    type="file"
    multiple
    accept="image/*"
    className="form-control mb-3"
    onChange={handleImageChange}
  />

  {/* NEW IMAGE PREVIEWS */}
  <div className="d-flex flex-wrap gap-3">
    {previews.map((src, i) => (
      <div key={i} className="position-relative">
        <img
          src={src}
          style={{
            width: 120,
            height: 80,
            objectFit: "cover",
            borderRadius: 6,
            border: "1px solid #ddd",
          }}
        />
        <button
          type="button"
          className="btn btn-danger btn-sm position-absolute top-0 end-0"
          onClick={() => removeNewImage(i)}
          style={{ transform: "translate(50%, -50%)" }}
        >
          <X size={14} />
        </button>
      </div>
    ))}
  </div>
</div>


            
            {/* Pedagogy Structure TEXT */}
            <div className="mb-4">
  <label className="form-label fw-semibold">Elligivility</label>
  <CmsEditor
                  value={formData.elligibility}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, elligibility: v }))
                  }
                />
  
</div>

             {/* Career Opportunities TEXT */}
             <div className="mb-4">
              <label className="form-label fw-semibold">Remember Important Dates</label>
              <CmsEditor
                  value={formData.remember_important_dates}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, remember_important_dates: v }))
                  }
                />
              
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Admission Process</label>
              <CmsEditor
                  value={formData.admission_process}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, admission_process: v }))
                  }
                />
            
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Admission Information</label>
              <CmsEditor
                  value={formData.admission_information}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, admission_information: v }))
                  }
                />
             
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">Program Highlights</label>
              <CmsEditor
                  value={formData.program_highlights}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, program_highlights: v }))
                  }
                />
            
            </div>
            <div className="mb-4">
              <label className="form-label fw-semibold">
              Life @ IMT Hyderabad Campus </label>
              <CmsEditor
                  value={formData.life_imt_Hyderabad_campus}
                  onChange={(v) =>
                    setFormData((p) => ({ ...p, life_imt_Hyderabad_campus: v }))
                  }
                />
            
            </div>
            {/* ===============================
   LIFE @ IMT HYDERABAD CAMPUS IMAGES
================================ */}
<div className="mb-4">
  <label className="form-label fw-semibold">
    Life @ IMT Hyderabad Campus Images (Multiple)
  </label>

  {/* EXISTING IMAGES */}
  <div className="d-flex flex-wrap gap-3 mb-3">
    {existingCampusImages.map((img, i) => (
      <div key={i} className="position-relative">
       <img
          src={getImageUrl(img)}
          style={{
            width: 120,
            height: 80,
            objectFit: "cover",
            borderRadius: 6,
            border: "1px solid #ddd",
          }}
        />
        <button
          type="button"
          className="btn btn-danger btn-sm position-absolute top-0 end-0"
          onClick={() => removeExistingCampusImage(img)}
          style={{ transform: "translate(50%, -50%)" }}
        >
          <X size={14} />
        </button>
      </div>
    ))}
  </div>

  {/* ADD NEW IMAGES */}
  <input
    type="file"
    multiple
    accept="image/*"
    className="form-control mb-3"
    onChange={handleCampusImageChange}
  />

  {/* PREVIEWS */}
  <div className="d-flex flex-wrap gap-3">
    {campusPreviews.map((src, i) => (
      <div key={i} className="position-relative">
        <img
          src={src}
          style={{
            width: 120,
            height: 80,
            objectFit: "cover",
            borderRadius: 6,
            border: "1px solid #ddd",
          }}
        />
        <button
          type="button"
          className="btn btn-danger btn-sm position-absolute top-0 end-0"
          onClick={() => removeNewCampusImage(i)}
          style={{ transform: "translate(50%, -50%)" }}
        >
          <X size={14} />
        </button>
      </div>
    ))}
  </div>
</div>

          </div>
             
          <div className="modal-footer">
          <button className="btn btn-primary" onClick={handleAddProgram}>
                Add Program Offered
              </button>
          <button className="btn btn-primary" onClick={handleAddPeople}>
                Add Student Tutorials
              </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditfieldModal;
