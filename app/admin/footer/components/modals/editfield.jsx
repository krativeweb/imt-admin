"use client";

import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { X } from "lucide-react";
import CmsEditor from "@/components/common/CmsEditor";

/* ===============================
   REUSABLE FIELD GROUP
================================ */
const FieldGroup = ({ label, required = false, children }) => (
  <div className="mb-3">
    <label className="form-label fw-semibold">
      {label}
      {required && <span className="text-danger ms-1">*</span>}
    </label>
    {children}
  </div>
);

const EditfieldModal = ({ show, onClose, field, onSave }) => {
  /* ===============================
     FORM DATA
  =============================== */
  const [formData, setFormData] = useState({
    address: "",
    email: "",
    phone: "",

    facebook_url: "",
    linkedin_url: "",
    instagram_url: "",
    youtube_url: "",

    copyright_text: "",
  });

  /* ===============================
     ACCREDITATIONS STATES
  =============================== */
  const [existingAccreditations, setExistingAccreditations] = useState([]);
  const [newAccreditations, setNewAccreditations] = useState([]);
  const [accreditationPreviews, setAccreditationPreviews] = useState([]);

  /* ===============================
     MEMBERS STATES
  =============================== */
  const [existingMembers, setExistingMembers] = useState([]);
  const [newMembers, setNewMembers] = useState([]);
  const [memberPreviews, setMemberPreviews] = useState([]);

  /* ===============================
     LOAD DATA
  =============================== */
  useEffect(() => {
    if (!field) return;

    setFormData({
      address: field.address || "",
      email: field.email || "",
      phone: field.phone || "",

      facebook_url: field.facebook_url || "",
      linkedin_url: field.linkedin_url || "",
      instagram_url: field.instagram_url || "",
      youtube_url: field.youtube_url || "",

      copyright_text: field.copyright_text || "",
    });

    setExistingAccreditations(
      Array.isArray(field.accreditations) ? field.accreditations : []
    );

    setExistingMembers(
      Array.isArray(field.members) ? field.members : []
    );

    setNewAccreditations([]);
    setAccreditationPreviews([]);

    setNewMembers([]);
    setMemberPreviews([]);
  }, [field]);

  /* ===============================
     HELPERS
  =============================== */
  const getImageUrl = (path) =>
    path?.startsWith("/api")
      ? `${process.env.NEXT_PUBLIC_API_URL}${path}`
      : path;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* ===============================
     ACCREDITATION HANDLERS
  =============================== */
  const handleAccreditationChange = (e) => {
    const files = Array.from(e.target.files);
    setNewAccreditations((p) => [...p, ...files]);

    const previews = files.map((f) => URL.createObjectURL(f));
    setAccreditationPreviews((p) => [...p, ...previews]);
  };

  const removeExistingAccreditation = (img) => {
    setExistingAccreditations((p) => p.filter((i) => i !== img));
  };

  const removeNewAccreditation = (index) => {
    setNewAccreditations((p) => p.filter((_, i) => i !== index));
    setAccreditationPreviews((p) => p.filter((_, i) => i !== index));
  };

  /* ===============================
     MEMBER HANDLERS
  =============================== */
  const handleMemberChange = (e) => {
    const files = Array.from(e.target.files);
    setNewMembers((p) => [...p, ...files]);

    const previews = files.map((f) => URL.createObjectURL(f));
    setMemberPreviews((p) => [...p, ...previews]);
  };

  const removeExistingMember = (img) => {
    setExistingMembers((p) => p.filter((i) => i !== img));
  };

  const removeNewMember = (index) => {
    setNewMembers((p) => p.filter((_, i) => i !== index));
    setMemberPreviews((p) => p.filter((_, i) => i !== index));
  };

  /* ===============================
     SAVE
  =============================== */
  const handleSave = () => {
    const form = new FormData();
  
    // basic fields
    Object.entries(formData).forEach(([k, v]) => {
      form.append(k, v ?? "");
    });
  
    // ✅ SEND AS JSON (IMPORTANT)
    form.append(
      "existing_accreditations",
      JSON.stringify(existingAccreditations || [])
    );
  
    form.append(
      "existing_members",
      JSON.stringify(existingMembers || [])
    );
  
    // new uploads
    newAccreditations.forEach((file) =>
      form.append("accreditations", file)
    );
  
    newMembers.forEach((file) =>
      form.append("members", file)
    );
  
    onSave(form);
  };
  

  if (!show) return null;

  /* ===============================
     RENDER
  =============================== */
  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,.6)" }}>
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">

          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Edit Footer Content</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          {/* BODY */}
          <div className="modal-body">

            {/* CONTACT INFO */}
            <div className="mb-5">
              <h6 className="fw-bold mb-3">Contact Information</h6>

              <FieldGroup label="Address">
                <textarea
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                />
              </FieldGroup>

              <FieldGroup label="Email Address">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </FieldGroup>

              <FieldGroup label="Phone Number">
                <input
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FieldGroup>
            </div>

            {/* SOCIAL LINKS */}
            <div className="mb-5">
              <h6 className="fw-bold mb-3">Social Media Links</h6>

              {[
                { key: "facebook_url", label: "Facebook URL" },
                { key: "linkedin_url", label: "LinkedIn URL" },
                { key: "instagram_url", label: "Instagram URL" },
                { key: "youtube_url", label: "YouTube URL" },
              ].map(({ key, label }) => (
                <FieldGroup key={key} label={label}>
                  <input
                    className="form-control"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                  />
                </FieldGroup>
              ))}
            </div>

            {/* ===============================
                ACCREDITATIONS & APPROVALS
            =============================== */}
            <div className="mb-5">
              <h6 className="fw-bold mb-3">Accreditations & Approvals ( Multiple )</h6>

              <div className="d-flex flex-wrap gap-3 mb-3">
                {existingAccreditations.map((img, i) => (
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
                      className="btn btn-danger btn-sm position-absolute top-0 end-0"
                      onClick={() => removeExistingAccreditation(img)}
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <input
                type="file"
                multiple
                accept="image/*"
                className="form-control mb-3"
                onChange={handleAccreditationChange}
              />

              <div className="d-flex flex-wrap gap-3">
                {accreditationPreviews.map((src, i) => (
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
                      className="btn btn-danger btn-sm position-absolute top-0 end-0"
                      onClick={() => removeNewAccreditation(i)}
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ===============================
                MEMBERS
            =============================== */}
            <div className="mb-5">
              <h6 className="fw-bold mb-3">Members ( Multiple )</h6>

              <div className="d-flex flex-wrap gap-3 mb-3">
                {existingMembers.map((img, i) => (
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
                      className="btn btn-danger btn-sm position-absolute top-0 end-0"
                      onClick={() => removeExistingMember(img)}
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <input
                type="file"
                multiple
                accept="image/*"
                className="form-control mb-3"
                onChange={handleMemberChange}
              />

              <div className="d-flex flex-wrap gap-3">
                {memberPreviews.map((src, i) => (
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
                      className="btn btn-danger btn-sm position-absolute top-0 end-0"
                      onClick={() => removeNewMember(i)}
                      style={{ transform: "translate(50%, -50%)" }}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* COPYRIGHT */}
            {/*<div className="mb-4">
              <h6 className="fw-bold mb-3">Copyright</h6>

              <FieldGroup label="Copyright Text">
                <CmsEditor
                      value={formData.copyright_text}
                      onChange={(v) =>
                        setFormData((p) => ({ ...p, copyright_text: v }))
                      }
                    />
                
              </FieldGroup>
            </div>*/}

          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-success" onClick={handleSave}>Save Changes</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditfieldModal;
