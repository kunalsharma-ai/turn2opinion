"use client";
import React from "react";
import { Grid, Tooltip, Dialog, Slider, Button } from "@mui/material";
import Cropper from "react-easy-crop";
import { Text } from "./";
import { api, Page } from "@/util";
import { useToast } from "@/hooks";

function getCroppedImg(imageSrc, croppedAreaPixels, outputType = "image/jpeg") {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        img,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      canvas.toBlob(
        (blob) => resolve(blob),
        outputType,
        outputType === "image/jpeg" ? 0.92 : undefined
      );
    };
  });
}

export default function Upload({
  onUpload,
  label = "",
  accept,
  endpoint,
  name,
  editMode = false,
  setup = false,
  hideCaption = false,
  form,
  tooltipTitle = "Logo",
  ...attr
}) {
  const inputRef = React.useRef(null);
  const preview = form.watch(name);

  const outputType = accept.includes("image") ? "image/webp" : "";

  const [openCrop, setOpenCrop] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [tempImgURL, setTempImgURL] = React.useState("");
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState(null);

  function onSelectFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    if (outputType === "image/webp") {
      setTempImgURL(url);
      setOpenCrop(true);
    } else {
      uploadFile(file);
    }

    e.target.value = "";
  }

  function handleKeyActivate(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      document.getElementById("file-upload")?.click();
    }
  }

  async function handleCropSave() {
    if (!croppedAreaPixels || !selectedFile) return;

    const croppedBlob = await getCroppedImg(
      tempImgURL,
      croppedAreaPixels,
      outputType
    );

    const ext = outputType.split("/")[1]; // e.g., png
    const fileName = selectedFile.name.replace(/\.[^/.]+$/, `.${ext}`);

    const croppedFile = new File([croppedBlob], fileName, {
      type: outputType,
    });
    await uploadFile(croppedFile);

    setOpenCrop(false);
  }
  async function uploadFile(fileToUpload) {
    const formData = new FormData();
    formData.append("file", fileToUpload);

    const temp = await api.post(endpoint, formData);

    if (temp.status === "success") {
      form.setValue(name, temp.file.url);
      if (onUpload) onUpload();
    }
  }

  return (
    <>
      <Dialog
        open={openCrop}
        onClose={() => setOpenCrop(false)}
        fullWidth
        maxWidth="sm"
        sx={{ zIndex: 99999 }}
      >
        <div style={{ position: "relative", height: 400 }}>
          <Cropper
            image={tempImgURL}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(area, areaPx) => setCroppedAreaPixels(areaPx)}
          />
        </div>

        <div style={{ padding: 16 }}>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e, z) => setZoom(z)}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ color: "white", fontWeight: 600, mt: 1 }}
            onClick={handleCropSave}
          >
            Save Crop
          </Button>
        </div>
      </Dialog>

      {outputType === "image/webp" ? (
        <Grid
          container
          flexDirection="column"
          gap={0.5}
          sx={{
            mt: editMode ? 1 : 0,
            boxShadow: editMode ? 1 : 0,
            borderRadius: editMode ? 2 : 0,
            alignItems: editMode ? "flex-start" : "center",
          }}
        >
          {editMode ? (
            <Page.Text sx={{ px: 2, pt: 2, color: "grey" }}>{label}</Page.Text>
          ) : (
            ""
          )}

          <Grid
            component="label"
            htmlFor="file-upload"
            sx={{
              ml: editMode ? 3 : 0,
              my: 0.5,
              width: setup ? 100 : editMode ? 80 : 65,
              height: setup ? 100 : editMode ? 80 : 65,
              boxShadow: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              overflow: "hidden",
              position: "relative",
              "&:hover": { borderColor: "#555" },
              ...attr.sx,
            }}
          >
            <Grid
              container
              flexDirection="column"
              sx={{ width: "100%", height: "100%" }}
            >
              <Tooltip
                title={`${!preview ? "Add" : "Edit"} ${tooltipTitle}`}
                placement="top"
              >
                <Page.Text
                  sx={{
                    py: 0.2,
                    fontSize: 13,
                    textAlign: "center",
                    bgcolor: "hsla(144, 93%, 21%, 0.7)",
                    color: "white",
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                  }}
                >
                  {!preview ? "Add" : "Edit"}
                </Page.Text>
              </Tooltip>
              <img
                src={preview ?? "/images/logo/user.png"}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                onError={(e) => {
                  e.target.src = "/images/logo/user.png";
                }}
              />
            </Grid>

            <input
              id="file-upload"
              type="file"
              ref={inputRef}
              hidden
              accept={accept ?? "image/*"}
              onChange={onSelectFile}
            />
          </Grid>

          {!hideCaption && (
            <Text
              sx={{
                color: "grey",
                fontSize: "12px !important",
                ml: editMode ? 2 : 0,
                py: 1,
                textAlign: "center",
              }}
            >
              Max 100KB, JPEG/PNG/SVG only.
            </Text>
          )}
        </Grid>
      ) : (
        <Page.Box mt={1}>
          <Page.MuiButton
            variant="contained"
            color="secondary"
            component="label"
            htmlFor="file-upload"
          >
            Upload File
          </Page.MuiButton>
          <Page.Text mt={1} color="secondary" fontSize={13}>
            {preview}
          </Page.Text>
          <input
            id="file-upload"
            type="file"
            ref={inputRef}
            hidden
            accept={accept ?? "image/*"}
            onChange={onSelectFile}
          />
        </Page.Box>
      )}
    </>
  );
}
