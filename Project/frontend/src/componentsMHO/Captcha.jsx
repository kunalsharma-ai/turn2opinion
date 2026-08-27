"use client";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useToast } from "@/hooks";

// const ROUTES = [
//   { label: 'Auto (Domain)', path: '/captcha' },
//   { label: 'Text', path: '/captcha/text' },
//   { label: 'Image Selection', path: '/captcha/image_selection' },
//   { label: 'Puzzle', path: '/captcha/puzzle' },
//   { label: 'Slider', path: '/captcha/slider' },
// ]

const addCacheBuster = (url) =>
  `${url}${url.includes("?") ? "&" : "?"}challenge=${Date.now()}`;

const CaptchaLoader = ({ minHeight }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: minHeight || 300,
    }}
  >
    <CircularProgress size={18} thickness={4} />
  </Box>
);

export default function Captcha({
  endpoint = "/captcha/text",
  onVerified: onSuccess,
  onError,
  onChallengeLoad,
}) {
  const [imageURL, setImageURL] = useState("");
  const [type, setType] = useState("text");
  const [answer, setAnswer] = useState("");
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [selectionRows, setSelectionRows] = useState(3);
  const [selectionColumns, setSelectionColumns] = useState(3);
  const [selectionTiles, setSelectionTiles] = useState([]);
  const [selectionPrompt, setSelectionPrompt] = useState("");
  const [selectionPromptText, setSelectionPromptText] = useState("");
  const [puzzleChoices, setPuzzleChoices] = useState(4);
  const [sliderMax, setSliderMax] = useState(300);
  const [sliderPiece, setSliderPiece] = useState(null);
  const [sliderMeta, setSliderMeta] = useState({
    pieceSize: 46,
    gapY: 76,
    boardX: 20,
    width: 420,
    height: 320,
  });

  const [loading, setLoading] = useState(false);
  const imageRef = useRef("");

  async function refresh() {
    setLoading(true);

    setAnswer("");
    setSelectedTiles([]);
    setSelectionTiles([]);
    setSelectionPrompt("");
    setSelectionPromptText("");
    setImageURL("");
    setSliderPiece(null);
    try {
      const response = await fetch(addCacheBuster(endpoint), {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Unable to create CAPTCHA challenge");
      }
      const metadata = getCaptchaMetadata(response);
      setType(metadata.type);
      setSelectionRows(metadata.selectionRows);
      setSelectionColumns(metadata.selectionColumns);
      setSelectionPromptText(metadata.selectionPromptText);
      setPuzzleChoices(metadata.puzzleChoices);
      setSliderMax(metadata.sliderMax);
      setSliderMeta({
        pieceSize: metadata.sliderPieceSize,
        gapY: metadata.sliderGapY,
        boardX: metadata.sliderBoardX,
        width: 420,
        height: 320,
      });
      const blob = await response.blob();
      revokeImageURL();
      imageRef.current = URL.createObjectURL(blob);
      await prepareChallenge(metadata, imageRef.current);
      onChallengeLoad?.(metadata);
    } catch (error) {
      const detail =
        error instanceof Error
          ? error
          : new Error("Unable to create CAPTCHA challenge");
      useToast({ status: "error", message: error });
      onError?.(detail);
    } finally {
      setLoading(false);
    }
  }

  async function prepareChallenge(metadata, url) {
    if (metadata.type === "image_selection") {
      await prepareImageSelection(url, metadata);
      return;
    }
    if (metadata.type === "puzzle") {
      setImageURL(url);
      return;
    }
    if (metadata.type === "slider") {
      await prepareSlider(url, metadata);
      return;
    }
    setImageURL(url);
  }

  async function prepareImageSelection(url, metadata) {
    try {
      const pieces = await splitSelectionImage(
        url,
        metadata.selectionRows,
        metadata.selectionColumns,
      );
      setSelectionPrompt(pieces.prompt || "");
      setSelectionTiles(pieces.tiles);
      setImageURL("");
    } catch {
      setImageURL(url);
    }
  }

  async function prepareSlider(url, metadata) {
    setImageURL(url);
    try {
      const pieceData = await cropSliderPiece(
        url,
        metadata.sliderBoardX,
        metadata.sliderGapY,
        metadata.sliderPieceSize,
      );
      setSliderPiece(pieceData.url);
      setSliderMeta({
        pieceSize: metadata.sliderPieceSize,
        gapY: metadata.sliderGapY,
        boardX: metadata.sliderBoardX,
        width: pieceData.naturalWidth,
        height: pieceData.naturalHeight,
      });
    } catch {
      setSliderPiece(null);
    }
  }

  function revokeImageURL() {
    if (imageRef.current) {
      URL.revokeObjectURL(imageRef.current);
      imageRef.current = "";
    }
  }

  useEffect(() => {
    refresh();
    return () => {
      revokeImageURL();
    };
  }, [endpoint]);

  function toggleTile(tile) {
    setSelectedTiles((current) => {
      const next = current.includes(tile)
        ? current.filter((item) => item !== tile)
        : [...current, tile];
      const normalized = [...next].sort((a, b) => a - b);
      setAnswer(normalized.join(","));
      return normalized;
    });
  }

  async function verify() {
    if (!canVerify) return;
    setLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: String(answer),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        useToast({
          status: "error",
          message: "Verification failed",
        });
        throw new Error(result.message || "Verification failed");
      }

      useToast({
        status: "success",
        message: "Captcha Verified!",
      });
      onSuccess?.(result);
    } catch (error) {
      const detail =
        error instanceof Error ? error : new Error("Verification failed");

      onError?.(detail);
    } finally {
      setLoading(false);
    }
  }

  const imageBoxSx = {
    width: "100%",
    minHeight: 52,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    border: "1px solid #d9e1ed",
    borderRadius: 1,
    bgcolor: "#f8fbff",
    color: "#64748b",
    fontSize: 12,
    "& img": {
      display: "block",
      width: "100%",
      maxHeight: 80,
      objectFit: "cover",
    },
  };

  function renderTextCaptcha() {
    if (loading) {
      return (
        <Box sx={imageBoxSx}>
          <CaptchaLoader minHeight={80} />
        </Box>
      );
    }
    return (
      <Box sx={imageBoxSx}>
        {imageURL ? (
          <Box component="img" src={imageURL} alt="Text CAPTCHA challenge" />
        ) : (
          <Typography variant="caption" color="text.secondary">
            Unable to load challenge
          </Typography>
        )}
      </Box>
    );
  }

  function renderImageSelectionCaptcha() {
    if (loading) {
      return (
        <Box sx={imageBoxSx}>
          <CaptchaLoader />
        </Box>
      );
    }
    if (!selectionTiles.length) {
      return (
        <Box sx={imageBoxSx}>
          <Typography variant="caption" color="text.secondary">
            Unable to load challenge
          </Typography>
        </Box>
      );
    }
    return (
      <Box display="flex" justifyContent="center" flexDirection="column">
        {selectionPromptText ? (
          <Box
            sx={{
              mb: 0.5,
              px: 0.75,
              py: 0.5,
              border: "1px solid #d9e1ed",
              borderRadius: 1,
              bgcolor: "#f0f6ff",
              color: "#1e3a8a",
              fontSize: 10,
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {selectionPromptText}
          </Box>
        ) : (
          selectionPrompt && (
            <Box
              component="img"
              src={selectionPrompt}
              alt="Select tiles matching the prompt"
              sx={{
                display: "block",
                width: "100%",
                height: 20,
                objectFit: "fill",
                border: "1px solid #d9e1ed",
                borderBottom: 0,
                borderRadius: "5px 5px 0 0",
              }}
            />
          )
        )}
        <Box display="flex" justifyContent="center">
          <Box
            sx={{
              maxWidth: 200,
              display: "grid",
              gridTemplateColumns: `repeat(${selectionColumns}, minmax(0, 1fr))`,
              gap: "3px",
              justifyContent: "center",
            }}
          >
            {selectionTiles.map((tile) => {
              const selected = selectedTiles.includes(tile.number);
              return (
                <Box
                  component="button"
                  type="button"
                  key={tile.number}
                  onClick={() => toggleTile(tile.number)}
                  aria-label={`Select tile ${tile.number}`}
                  sx={{
                    minWidth: 0,
                    p: 0,
                    overflow: "hidden",
                    border: selected
                      ? "2px solid #1769c2"
                      : "2px solid transparent",
                    borderRadius: "4px",
                    bgcolor: "#fff",
                    cursor: "pointer",
                    boxShadow: selected
                      ? "0 0 0 1px rgba(23, 105, 194, 0.2)"
                      : "none",
                    "& img": {
                      display: "block",
                      width: "100%",
                      height: "auto",
                    },
                  }}
                >
                  <Box component="img" src={tile.url} alt="" />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    );
  }

  function renderPuzzleCaptcha() {
    return (
      <Box sx={{ width: "100%", overflow: "hidden", borderRadius: 1 }}>
        {loading ? (
          <Box sx={imageBoxSx}>
            <CaptchaLoader />
          </Box>
        ) : imageURL ? (
          <Box
            component="img"
            src={imageURL}
            alt="Puzzle CAPTCHA challenge"
            sx={{
              display: "block",
              width: "100%",
              maxHeight: 300,
              objectFit: "contain",
              border: "1px solid #d9e1ed",
              borderRadius: 1,
            }}
          />
        ) : (
          <Box sx={imageBoxSx}>
            <Typography variant="caption" color="text.secondary">
              Unable to load challenge
            </Typography>
          </Box>
        )}
      </Box>
    );
  }

  function renderSliderCaptcha() {
    return (
      <Box
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          border: "1px solid #d9e1ed",
          borderRadius: 1,
        }}
      >
        {loading ? (
          <Box sx={imageBoxSx}>
            <CaptchaLoader />
          </Box>
        ) : imageURL ? (
          <Box
            component="img"
            src={imageURL}
            alt="Slider CAPTCHA challenge"
            sx={{ display: "block", width: "100%" }}
          />
        ) : (
          <Box sx={imageBoxSx}>
            <Typography variant="caption" color="text.secondary">
              Unable to load challenge
            </Typography>
          </Box>
        )}
        {!loading && sliderPiece && (
          <Box
            sx={{
              position: "absolute",
              overflow: "hidden",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
              borderRadius: "3px",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.25)",
              pointerEvents: "none",
              transition: "left 0.03s linear",
              top: `${(sliderMeta.gapY / sliderMeta.height) * 100}%`,
              left: `${
                ((sliderMeta.boardX + Number(answer || 0)) / sliderMeta.width) *
                100
              }%`,
              width: `${(sliderMeta.pieceSize / sliderMeta.width) * 100}%`,
              height: `${(sliderMeta.pieceSize / sliderMeta.height) * 100}%`,
              backgroundImage: `url(${sliderPiece})`,
            }}
          />
        )}
      </Box>
    );
  }

  function renderChallenge() {
    switch (type) {
      case "image_selection":
        return renderImageSelectionCaptcha();
      case "puzzle":
        return renderPuzzleCaptcha();
      case "slider":
        return renderSliderCaptcha();
      case "text":
      default:
        return renderTextCaptcha();
    }
  }

  function renderTextControl() {
    return (
      <TextField
        size="small"
        fullWidth
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        placeholder="Enter the visible code"
        inputProps={{ "aria-label": "CAPTCHA code", autoComplete: "off" }}
        sx={{
          mb: 1,
          "& .MuiInputBase-root": {
            height: 32,
            fontSize: 12,
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#cbd5e1",
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#1769c2",
            borderWidth: 1,
          },
        }}
      />
    );
  }

  function renderImageSelectionControl() {
    return null;
  }

  function renderPuzzleControl() {
    return (
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
        {Array.from({ length: puzzleChoices }, (_, index) => index + 1).map(
          (choice) => {
            const selected = answer === String(choice);
            return (
              <Button
                key={choice}
                type="button"
                size="small"
                variant={selected ? "contained" : "outlined"}
                onClick={() => setAnswer(String(choice))}
                aria-label={`Select puzzle piece ${choice}`}
                sx={{
                  minWidth: 30,
                  height: 28,
                  px: 1,
                  fontSize: 11,
                  fontWeight: 600,
                  borderColor: selected ? "#1769c2" : "#cbd5e1",
                  bgcolor: selected ? "#1769c2" : "#fff",
                  color: selected ? "#fff" : "#334155",
                  "&:hover": {
                    borderColor: "#1769c2",
                    bgcolor: selected ? "#145a9e" : "#f0f6ff",
                  },
                }}
              >
                Option {choice}
              </Button>
            );
          },
        )}
      </Box>
    );
  }

  function renderSliderControl() {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
        <Box
          component="input"
          type="range"
          min={0}
          max={sliderMax || 300}
          value={answer || 0}
          onChange={(event) => setAnswer(event.target.value)}
          aria-label="Puzzle piece horizontal position"
          sx={{
            flex: 1,
            height: 3,
            accentColor: "#1769c2",
            cursor: "pointer",
          }}
        />
        <Typography
          component="output"
          sx={{
            minWidth: 34,
            color: "#64748b",
            fontSize: 10,
            fontVariantNumeric: "tabular-nums",
            textAlign: "right",
          }}
        >
          {answer || 0}px
        </Typography>
      </Box>
    );
  }

  function renderControl() {
    switch (type) {
      case "image_selection":
        return renderImageSelectionControl();
      case "puzzle":
        return renderPuzzleControl();
      case "slider":
        return renderSliderControl();
      case "text":
      default:
        return renderTextControl();
    }
  }

  function getInstruction() {
    switch (type) {
      case "slider":
        return "Move the slider to align the tile";
      case "image_selection":
        return "Select every matching tile";
      case "puzzle":
        return "Select the missing piece";
      case "text":
      default:
        return "";
    }
  }

  const canVerify = answer !== "" && answer !== null && answer !== undefined;

  return (
    <Box
      component="section"
      aria-busy={loading}
      sx={{
        width: "100%",
        // maxWidth: 280,
        fontSize: 12,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          width: "100%",
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          {renderChallenge()}
        </Box>
        <IconButton
          size="small"
          onClick={refresh}
          disabled={loading}
          aria-label="New challenge"
          title="New challenge"
          sx={{
            width: 28,
            height: 28,
            mt: 0.25,
            border: "1px solid #cbd5e1",
            borderRadius: 1,
            bgcolor: "#f8fbff",
            color: "#245181",
            "&:hover": {
              bgcolor: "#e8f1fb",
              borderColor: "#1769c2",
              color: "#1769c2",
            },
            "&.Mui-disabled": {
              opacity: 0.55,
            },
          }}
        >
          <RefreshIcon sx={{ fontSize: 16 }} />
        </IconButton>
      </Box>

      <Box sx={{ mt: 0.75 }}>
        <Typography
          component="label"
          sx={{
            display: "block",
            color: "#334155",
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {getInstruction()}
        </Typography>
        {renderControl()}
        <Button
          type="button"
          variant="contained"
          fullWidth
          onClick={verify}
          disabled={loading || !canVerify}
          sx={{
            mt: 1,
            height: 38,
            borderRadius: 3,
            fontSize: 12,
            fontWeight: 700,
            textTransform: "none",
            color: "#fff",
            background: "linear-gradient(135deg,#012362,#0b4bb3)",
            boxShadow: "0 12px 30px rgba(1,35,98,.20)",
            transition: ".3s",
            "&:hover": {
              background: "linear-gradient(135deg,#001b55,#063686)",
              boxShadow: "0 18px 40px rgba(1,35,98,.28)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
            "&:disabled": {
              background: "#f7f7f7",
            },
          }}
        >
          Verify
        </Button>
      </Box>
    </Box>
  );
}

function getCaptchaMetadata(response) {
  return {
    type: response.headers.get("X-Captcha-Type") || "text",
    selectionCount: Number(
      response.headers.get("X-Captcha-Selection-Count") || 9,
    ),
    selectionRows: Number(
      response.headers.get("X-Captcha-Selection-Rows") || 3,
    ),
    selectionColumns: Number(
      response.headers.get("X-Captcha-Selection-Columns") || 3,
    ),
    selectionPromptText:
      response.headers.get("X-Captcha-Selection-Prompt") || "",
    targetShape: response.headers.get("X-Captcha-Target-Shape") || "",
    puzzleChoices: Number(
      response.headers.get("X-Captcha-Puzzle-Choices") || 4,
    ),
    sliderMax: Number(response.headers.get("X-Captcha-Slider-Max") || 300),
    sliderPieceSize: Number(
      response.headers.get("X-Captcha-Slider-Piece-Size") || 46,
    ),
    sliderGapY: Number(response.headers.get("X-Captcha-Slider-Gap-Y") || 76),
    sliderBoardX: Number(
      response.headers.get("X-Captcha-Slider-Board-X") || 20,
    ),
  };
}

async function splitSelectionImage(url, rows, columns) {
  const image = await loadImage(url);
  const padding = 12;
  const tileWidth = (image.naturalWidth - padding * (columns + 1)) / columns;
  const tileHeight = (image.naturalHeight - padding * (rows + 1)) / rows;
  const renderCrop = (x, y, width, height) => {
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(width);
    canvas.height = Math.round(height);
    canvas
      .getContext("2d")
      .drawImage(image, x, y, width, height, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  };
  return {
    prompt: "",
    tiles: Array.from({ length: rows * columns }, (_, index) => {
      const row = Math.floor(index / columns);
      const column = index % columns;
      return {
        number: index + 1,
        url: renderCrop(
          padding + column * (tileWidth + padding),
          padding + row * (tileHeight + padding),
          tileWidth,
          tileHeight,
        ),
      };
    }),
  };
}

async function cropSliderPiece(url, x, y, size) {
  const image = await loadImage(url);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(size);
  canvas.height = Math.round(size);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, x, y, size, size, 0, 0, size, size);
  return {
    url: canvas.toDataURL("image/png"),
    naturalWidth: image.naturalWidth || 420,
    naturalHeight: image.naturalHeight || 320,
  };
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}
