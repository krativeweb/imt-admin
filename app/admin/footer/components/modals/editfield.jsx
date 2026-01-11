"use client";

import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { X } from "lucide-react";

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
     IMAGE STATES
  =============================== */
  const [existingAccreditations, setExistingAccreditations] = useState([]);
  const [newAccreditations, setNewAccreditations] = useState([]);
  const [accreditationPreviews, setAccreditationPreviews] = useState([]);

  const [existingMembers, setExistingMembers] = useState([]);
  const [newMembers, setNewMembers] = useState([]);
  const [memberPreviews, setMemberPreviews] = useState([]);

  /* ===============================
     LOAD DATA
  =============================== */
  useEffect(() => {
    if (field) {
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

      setExistingAccreditations(field.accreditations || []);
      setExistingMembers(field.members || []);

      setNewAccreditations([]);
      setNewMembers([]);
      setAccreditationPreviews([]);
      setMemberPreviews([]);
    }
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
     ACCREDITATIONS HANDLERS
  =============================== */
  const handleAccreditationChange = (e) => {
    const files = Array.from(e.target.files);
    setNewAccreditations((p) => [...p, ...files]);
    setAccreditationPreviews((p) => [
      ...p,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeExistingAccreditation = (img) => {
    setExistingAccreditations((p) => p.filter((i) => i !== img));
  };

  const removeNewAccreditation = (i) => {
    setNewAccreditations((p) => p.filter((_, idx) => idx !== i));
    setAccreditationPreviews((p) => p.filter((_, idx) => idx !== i));
  };

  /* ===============================
     MEMBERS HANDLERS
  =============================== */
  const handleMemberChange = (e) => {
    const files = Array.from(e.target.files);
    setNewMembers((p) => [...p, ...files]);
    setMemberPreviews((p) => [
      ...p,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeExistingMember = (img) => {
    setExistingMembers((p) => p.filter((i) => i !== img));
  };

  const removeNewMember = (i) => {
    setNewMembers((p) => p.filter((_, idx) => idx !== i));
    setMemberPreviews((p) => p.filter((_, idx) => idx !== i));
  };

  /* ===============================
     SAVE
  =============================== */
  const handleSave = () => {
    const form = new FormData();

    Object.entries(formData).forEach(([k, v]) => {
      if (v) form.append(k, v);
    });

    existingAccreditations.forEach((img) =>
      form.append("existing_accreditations[]", img)
    );
    newAccreditations.forEach((file) =>
      form.append("accreditations", file)
    );

    existingMembers.forEach((img) =>
      form.append("existing_members[]", img)
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

          <div className="modal-header">
            <h5 className="modal-title fw-bold">Edit Footer Content</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">

            {/* CONTACT INFO */}
            <div className="mb-5">
              <h6 className="fw-bold mb-3">Contact Information</h6>

              <textarea
                className="form-control mb-3"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Full Address"
              />

              <input
                className="form-control mb-3"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />

              <input
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
            </div>

            <hr />

            {/* SOCIAL LINKS */}
            <div className="mb-5">
              <h6 className="fw-bold mb-3">Social Media</h6>
              {["facebook_url","linkedin_url","instagram_url","youtube_url"].map((f) => (
                <input
                  key={f}
                  className="form-control mb-3"
                  name={f}
                  value={formData[f]}
                  onChange={handleChange}
                  placeholder={f.replace("_url","").toUpperCase() + " URL"}
                />
              ))}
            </div>

            <hr />

            {/* ACCREDITATIONS */}
            <div className="mb-5">
              <h6 className="fw-bold mb-3">Accreditations & Approvals</h6>

              <div className="d-flex flex-wrap gap-3 mb-3">
                {existingAccreditations.map((img, i) => (
                  <div key={i} className="position-relative">
                    <img src={getImageUrl(img)} className="img-thumbnail" style={{ width: 120 }} />
                    <button
                      className="btn btn-danger btn-sm position-absolute top-0 end-0"
                      onClick={() => removeExistingAccreditation(img)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <input type="file" multiple className="form-control mb-3" onChange={handleAccreditationChange} />

              <div className="d-flex flex-wrap gap-3">
                {accreditationPreviews.map((src, i) => (
                  <div key={i} className="position-relative">
                    <img src={src} className="img-thumbnail" style={{ width: 120 }} />
                    <button
                      className="btn btn-danger btn-sm position-absolute top-0 end-0"
                      onClick={() => removeNewAccreditation(i)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <hr />

            {/* MEMBERS */}
            <div className="mb-5">
              <h6 className="fw-bold mb-3">Members</h6>

              <div className="d-flex flex-wrap gap-3 mb-3">
                {existingMembers.map((img, i) => (
                  <div key={i} className="position-relative">
                    <img src={getImageUrl(img)} className="img-thumbnail" style={{ width: 120 }} />
                    <button
                      className="btn btn-danger btn-sm position-absolute top-0 end-0"
                      onClick={() => removeExistingMember(img)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <input type="file" multiple className="form-control mb-3" onChange={handleMemberChange} />

              <div className="d-flex flex-wrap gap-3">
                {memberPreviews.map((src, i) => (
                  <div key={i} className="position-relative">
                    <img src={src} className="img-thumbnail" style={{ width: 120 }} />
                    <button
                      className="btn btn-danger btn-sm position-absolute top-0 end-0"
                      onClick={() => removeNewMember(i)}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <hr />

            {/* COPYRIGHT */}
            <div className="mb-4">
              <h6 className="fw-bold mb-3">Copyright</h6>
              <Editor
  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
  value={formData.copyright_text || ""}
  onEditorChange={(content) =>
    setFormData((prev) => ({ ...prev, copyright_text: content }))
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

          </div>

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
