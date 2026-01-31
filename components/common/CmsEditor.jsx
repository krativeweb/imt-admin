"use client";

import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const CmsEditor = ({
  value = "",
  onChange,
  height = 500,
  apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY,
}) => {
  return (
    <Editor
      apiKey={apiKey}
      value={value}
      onEditorChange={(content) => onChange(content)}
      init={{
        height,
        menubar: true,

        /* ===============================
           PLUGINS (UNCHANGED)
        =============================== */
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
          "codesample",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
        ],

        /* ===============================
           TOOLBAR (UNCHANGED)
        =============================== */
        toolbar:
          "undo redo | formatselect | fontselect fontsizeselect | " +
          "bold italic forecolor backcolor | " +
          "alignleft aligncenter alignright alignjustify | " +
          "bullist numlist outdent indent | " +
          "link image media table | " +
          "codesample | code | fullscreen | help",

        /* ===============================
           CODE SAMPLE LANGUAGES
        =============================== */
   

        /* ===============================
           IMAGE UPLOAD (UNCHANGED)
        =============================== */
        automatic_uploads: true,
        image_dimensions: false,
        images_responsive: false,

        images_upload_handler: async (blobInfo) => {
          const formData = new FormData();
          formData.append("file", blobInfo.blob());

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/upload-editor-image`,
            {
              method: "POST",
              body: formData,
            }
          );

          const data = await res.json();

          if (!data?.location) {
            throw new Error("Image upload failed");
          }

          return data.location;
        },

        file_picker_types: "file",

file_picker_callback: (callback, value, meta) => {
  if (meta.filetype === "file") {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "application/pdf");

    input.onchange = async function () {
      const file = this.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/upload-editor-file`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        if (!data?.location) {
          throw new Error("PDF upload failed");
        }

        // Insert link into editor
        callback(data.location, {
          text: file.name,
          title: file.name,
        });
      } catch (err) {
        alert("PDF upload failed");
        console.error(err);
      }
    };

    input.click();
  }
},

        branding: false,
        resize: true,

        /* ===============================
           SOURCE CODE DIALOG SIZE
        =============================== */
        code_dialog_height: 650,
        code_dialog_width: 1100,

        /* ===============================
           ✅ SOURCE CODE SCROLL FIX (KEY)
        =============================== */
    


        /* ===============================
           CMS HTML PRESERVATION
        =============================== */
        verify_html: false,
        cleanup: false,
        cleanup_on_startup: false,
        forced_root_block: false,
        remove_empty: false,

        valid_elements: "*[*]",
        extended_valid_elements: "*[*]",
        valid_children: "+div[div|h2|p|ul|li|span|a|img|pre|code]",
        sandbox_iframes: false,

        /* ===============================
           CONTENT STYLES
        =============================== */
        content_css: [
          "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
        ],

        content_style: `
          body {
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            padding: 10px;
          }

          .tab-pane {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
          }

          .fade {
            opacity: 1 !important;
          }

          .nav-tabs,
          .nav-pills {
            pointer-events: none;
            opacity: 0.7;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th, td {
            border: 1px solid #dee2e6;
            padding: 8px;
            vertical-align: middle;
          }

          .card {
            border: 1px solid #ddd;
            border-radius: 6px;
            padding: 12px;
            margin-bottom: 16px;
          }

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
  );
};

export default CmsEditor;




