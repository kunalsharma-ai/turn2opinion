"use client";

import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  TextField,
  Typography,
  Collapse,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckIcon from "@mui/icons-material/Check";
import { useToast } from "@/hooks";

const CAPTCHA_ROUTES = [
  { label: "Text", path: "/captcha/text" },
  { label: "Image Selection", path: "/captcha/image_selection" },
  { label: "Puzzle", path: "/captcha/puzzle" },
];

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
    <CircularProgress size={20} thickness={4} />
  </Box>
);

export default function Captcha({
  endpoint = "/captcha/",
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
  const [verified, setVerified] = useState(false);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [currentEndpoint, setCurrentEndpoint] = useState(endpoint);

  const imageRef = useRef("");

  function switchCaptchaType() {
    const currentIndex = CAPTCHA_ROUTES.findIndex(
      (route) => route.path === currentEndpoint,
    );

    const nextIndex =
      currentIndex === -1 ? 0 : (currentIndex + 1) % CAPTCHA_ROUTES.length;

    const nextEndpoint = CAPTCHA_ROUTES[nextIndex].path;

    setCurrentEndpoint(nextEndpoint);
    refresh(nextEndpoint);
  }

  async function refresh(nextEndpoint = currentEndpoint) {
    setLoading(true);
    setVerified(false);

    setAnswer("");
    setSelectedTiles([]);
    setSelectionTiles([]);
    setSelectionPrompt("");
    setSelectionPromptText("");
    setImageURL("");
    setSliderPiece(null);

    try {
      const response = await fetch(addCacheBuster(nextEndpoint), {
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

      useToast({
        status: "error",
        message: detail.message,
      });

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
    setCurrentEndpoint(endpoint);

    return () => {
      revokeImageURL();
    };
  }, [endpoint]);

  function startCaptcha() {
    if (loading || verified || challengeStarted) return;

    setChallengeStarted(true);
    refresh(endpoint);
  }

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
    if (!canVerify || verified) return;

    setLoading(true);

    try {
      const response = await fetch(currentEndpoint, {
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

      setVerified(true);

      useToast({
        status: "success",
        message: "Captcha Verified!",
      });

      onSuccess?.(result);
    } catch (error) {
      const detail =
        error instanceof Error ? error : new Error("Verification failed");

      refresh();
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
      width: "90%",
      maxHeight: 50,
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
      <Box sx={imageBoxSx} mb={0.5}>
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
          <CaptchaLoader minHeight={220} />
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: 1.5,
            py: 1,
            mb: 1.5,
            border: "1px solid #cfe0f5",
            borderRadius: 1.5,
            bgcolor: "#f1f7ff",
            color: "#063686",
            fontSize: 13,
            fontWeight: 600,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          {selectionPromptText ||
            "Select all tiles matching the requested shape"}
        </Box>

        {selectionPrompt && !selectionPromptText && (
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
              mb: 0.5,
            }}
          />
        )}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            width: "100%",
            paddingLeft: "48px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${selectionColumns}, 54px)`,
              gap: "7px",
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
                    width: 54,
                    height: 62,
                    minWidth: 0,
                    p: 0,
                    overflow: "hidden",
                    border: selected
                      ? "3px solid #1769c2"
                      : "2px solid transparent",
                    borderRadius: 1,
                    bgcolor: "#fff",
                    cursor: "pointer",
                    boxShadow: selected
                      ? "0 0 0 2px rgba(23,105,194,.12)"
                      : "0 1px 3px rgba(15,23,42,.04)",
                    transition: ".15s ease",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      boxShadow: "0 3px 8px rgba(15,23,42,.14)",
                    },
                    "& img": {
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    },
                  }}
                >
                  <Box component="img" src={tile.url} alt="" />
                </Box>
              );
            })}
          </Box>

          <IconButton
            size="small"
            onClick={switchCaptchaType}
            disabled={loading}
            aria-label="Change CAPTCHA type"
            title="Change CAPTCHA type"
            sx={{
              width: 36,
              height: 36,
              flexShrink: 0,
              border: "1px solid #bfd1e8",
              borderRadius: 1.5,
              bgcolor: "#f8fbff",
              color: "#063686",
              transition: ".2s",
              "&:hover": {
                bgcolor: "#eaf3ff",
                borderColor: "#1769c2",
                color: "#0c5adb",
              },
              "&.Mui-disabled": {
                opacity: 0.55,
              },
            }}
          >
            <RefreshIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>
    );
  }

  function renderPuzzleCaptcha() {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <Box sx={{ ...imageBoxSx, maxWidth: 420 }}>
            <CaptchaLoader />
          </Box>
        ) : imageURL ? (
          <Box
            sx={{
              position: "relative",
              width: "fit-content",
              maxWidth: "100%",
            }}
          >
            <Box
              sx={{
                display: "block",
                width: "100%",
                maxWidth: 420,
                maxHeight: 200,
                overflow: "hidden",
              }}
            >
              <Box
                component="img"
                src={imageURL}
                alt="Puzzle CAPTCHA challenge"
                sx={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  maxWidth: 420,
                  maxHeight: 230,
                  objectFit: "contain",
                  transform: "translateY(-15px) translateX(10px) scale(1.1)",
                }}
              />
            </Box>

            <IconButton
              size="small"
              onClick={switchCaptchaType}
              disabled={loading}
              aria-label="Change CAPTCHA type"
              title="Change CAPTCHA type"
              sx={{
                position: "absolute",
                top: "50%",
                right: -48,
                transform: "translateY(-50%)",
                width: 32,
                height: 32,
                border: "1px solid #bfd1e8",
                borderRadius: 1.5,
                bgcolor: "#f8fbff",
                color: "#063686",
                transition: ".2s",
                "&:hover": {
                  bgcolor: "#eaf3ff",
                  borderColor: "#1769c2",
                  color: "#0c5adb",
                },
                "&.Mui-disabled": {
                  opacity: 0.55,
                },
              }}
            >
              <RefreshIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
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
            sx={{
              display: "block",
              width: "100%",
            }}
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

  function getInstruction() {
    switch (type) {
      case "slider":
        return "Move the slider to align the tile";
      case "puzzle":
        return "Select the missing piece";
      case "text":
        return "";
      case "image_selection":
      default:
        return "";
    }
  }

  function renderVerificationStatus() {
    if (verified) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            px: 1.5,
            py: 1.35,
            my: 0.5,
            border: "1px solid #86efac",
            borderRadius: 2,
            bgcolor: "#f0fdf4",
            boxShadow: "0 3px 10px rgba(22,163,74,.08)",
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              bgcolor: "#dcfce7",
            }}
          >
            <CheckIcon
              sx={{
                fontSize: 24,
                color: "#16a34a",
              }}
            />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 15,
                lineHeight: 1.25,
                fontWeight: 700,
                color: "#15803d",
              }}
            >
              Verified you are human
            </Typography>

            <Typography
              sx={{
                mt: 0.25,
                fontSize: 10.5,
                color: "#64748b",
              }}
            >
              Verification completed successfully
            </Typography>
          </Box>
        </Box>
      );
    }

    if (challengeStarted) {
      return null;
    }

    return (
      <Box
        component="button"
        type="button"
        onClick={startCaptcha}
        disabled={loading}
        aria-label="Verify you are human"
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          px: 1.5,
          py: 1.35,
          my: 1.5,
          border: "1px solid #bfd7f4",
          borderRadius: 2,
          bgcolor: "#f2f7ff",
          boxShadow: "0 3px 12px rgba(12,90,219,.06)",
          cursor: "pointer",
          textAlign: "left",
          transition: ".2s ease",
          "&:hover": {
            borderColor: "#8db8e8",
            bgcolor: "#eaf3ff",
            boxShadow: "0 5px 16px rgba(12,90,219,.1)",
          },
          "&:disabled": {
            cursor: "default",
            opacity: 0.7,
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: 38,
            height: 38,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 1.5,
            bgcolor: "#dcecff",
          }}
        >
          <Box
            sx={{
              width: 22,
              height: 22,
              border: "2px solid #0c5adb",
              borderRadius: 0.75,
              bgcolor: "#fff",
              animation: "captchaPulse 1.6s ease-in-out infinite",
              "@keyframes captchaPulse": {
                "0%, 100%": {
                  transform: "scale(1)",
                  boxShadow: "0 0 0 0 rgba(12,90,219,0)",
                },
                "50%": {
                  transform: "scale(1.08)",
                  boxShadow: "0 0 0 5px rgba(12,90,219,.12)",
                },
              },
            }}
          />
        </Box>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            sx={{
              fontSize: 15,
              lineHeight: 1.25,
              fontWeight: 700,
              color: "#063686",
            }}
          >
            Verify you are human
          </Typography>

          <Typography
            sx={{
              mt: 0.25,
              fontSize: 10.5,
              color: "#64748b",
            }}
          >
            Click here to start verification
          </Typography>
        </Box>
      </Box>
    );
  }

  function renderTextControl() {
    return (
      <TextField
        size="small"
        fullWidth
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        placeholder="Enter the visible code"
        inputProps={{
          "aria-label": "CAPTCHA code",
          autoComplete: "off",
        }}
        sx={{
          mb: 1,
          "& .MuiInputBase-root": {
            height: 36,
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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
        }}
      >
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
        }}
      >
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

  const canVerify = answer !== "" && answer !== null && answer !== undefined;

  return (
    <Box
      component="section"
      aria-busy={loading}
      sx={{
        width: "100%",
        fontSize: 12,
      }}
    >
      {renderVerificationStatus()}

      <Collapse
        in={challengeStarted && !verified}
        sx={{
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
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

          {type === "text" && (
            <IconButton
              size="small"
              onClick={switchCaptchaType}
              disabled={loading}
              aria-label="Change CAPTCHA type"
              title="Change CAPTCHA type"
              sx={{
                width: 32,
                height: 32,
                mt: 1,
                flexShrink: 0,
                border: "1px solid #bfd1e8",
                borderRadius: 1.5,
                bgcolor: "#f8fbff",
                color: "#063686",
                transition: ".2s",
                "&:hover": {
                  bgcolor: "#eaf3ff",
                  borderColor: "#1769c2",
                  color: "#0c5adb",
                },
              }}
            >
              <RefreshIcon sx={{ fontSize: 18 }} />
            </IconButton>
          )}
        </Box>

        {getInstruction() && (
          <Typography
            sx={{
              mt: 0.75,
              mb: 0.5,
              color: "#334155",
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {getInstruction()}
          </Typography>
        )}

        {renderControl()}

        <Button
          type="button"
          variant="contained"
          fullWidth
          onClick={verify}
          disabled={loading || !canVerify || verified}
          sx={{
            mt: 1.25,
            height: 40,
            borderRadius: 2,
            fontSize: 13,
            fontWeight: 800,
            textTransform: "none",
            color: "#fff",
            background: "linear-gradient(135deg,#012362,#0b4bb3)",
            boxShadow: "0 8px 22px rgba(1,35,98,.18)",
            transition: ".2s",
            "&:hover": {
              background: "linear-gradient(135deg,#001b55,#063686)",
            },
            "&:disabled": {
              background: "#f1f5f9",
              color: "#94a3b8",
            },
          }}
        >
          Verify
        </Button>
      </Collapse>
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
