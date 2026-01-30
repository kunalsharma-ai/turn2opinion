"use client";
import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/models/dom";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/table";
import "tinymce/plugins/preview";
import "tinymce/skins/ui/oxide/skin.min.css";
// import "tinymce/plugins/image";
import "tinymce/plugins/code";
// import "tinymce/plugins/fullscreen";

const TextEditor = ({
  name,
  control,
  label = "",
  height = 200,
  width,
  statusbar = false,
  resize = false,
  toolbar,
  editorId,
  dialogScoped,
}) => {
  return (
    <div style={{ marginBottom: "1rem", width: "100%", position: "relative" }}>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: 8,
            marginTop: 8,
            color: "grey",
            paddingLeft: "4px",
          }}
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Editor
            id={editorId}
            value={field.value}
            onEditorChange={field.onChange}
            init={{
              body_class: dialogScoped ? "dialog-editor-content" : "",
              license_key: "gpl",
              width: width ?? "100%",
              menubar: false,
              statusbar: statusbar,
              plugins: ["link", "lists", "table", "preview", "code"],
              toolbar:
                toolbar ??
                `undo redo | bold italic underline | 
                alignleft aligncenter alignright alignjustify | 
                bullist numlist outdent indent | link table | preview code`,
              skin: false,
              content_css: false,
              resize: resize,
              branding: false,
              max_height: height || undefined,
              content_style: `
             
            body {
                  font-size: 15px;
                  ${height ? `max-height: ${height}px; overflow-y: auto;` : ""}
                } `,

              setup: (editor) => {
                if (dialogScoped && editorId) {
                  editor.on("init", () => {
                    setTimeout(() => {
                      const parent = document
                        .querySelector(`#${editorId}`)
                        ?.closest(".tox-tinymce");
                      if (parent) {
                        parent.style.zIndex = 9999;
                        if (height) {
                          parent.style.maxHeight = `${height}px`;
                          parent.style.overflowY = "auto";
                          parent.style.padding = "4px";
                        }
                      }

                      const menus = document.querySelectorAll(
                        `.tox-silver-sink,
                        .tox-dialog,
                        .tox-dialog-wrap,
                        .tox-menu,
                        .tox-toolbar__overflow,
                        .tox-pop,
                        .tox-textfield,
                        .tox-textarea,
                        .tox-form__group,
                        .tox-dialog__body,
                        .tox-dialog__content,
                        .tox-dropdown,
                        .tox-collection,
                        .tox-collection__group,
                        .tox-collection__item`
                      );
                      menus.forEach((el) => {
                        el.style.zIndex = 9999;
                      });
                    }, 0);
                  });

                  editor.on("OpenDialog", () => {
                    setTimeout(() => {
                      const dialogElements = document.querySelectorAll(
                        `.tox-silver-sink,
                        .tox-dialog,
                        .tox-dialog-wrap,
                        .tox-menu,
                        .tox-toolbar__overflow,
                        .tox-pop,
                        .tox-textfield,
                        .tox-textarea,
                        .tox-form__group,
                        .tox-dialog__body,
                        .tox-dialog__content,
                        .tox-dropdown,
                        .tox-collection,
                        .tox-collection__group,
                        .tox-collection__item`
                      );
                      dialogElements.forEach((el) => {
                        el.style.zIndex = "10001";
                      });
                    }, 0);
                  });
                }
              },
            }}
          />
        )}
      />
      {dialogScoped && (
        <style jsx global>{`
          .tox-silver-sink,
          .tox-dialog,
          .tox-dialog-wrap,
          .tox-menu,
          .tox-toolbar__overflow,
          .tox-pop,
          .tox-textfield,
          .tox-textarea,
          .tox-form__group,
          .tox-dialog__body,
          .tox-dialog__content,
          .tox-dropdown,
          .tox-collection,
          .tox-collection__group,
          .tox-collection__item {
            z-index: 9999 !important;
            pointer-events: auto !important;
            padding: 4px;
          }
          .MuiBackdrop-root {
            pointer-events: none !important;
          }
        `}</style>
      )}
    </div>
  );
};

export default TextEditor;
