"use client";
import Map from "@/components/Map";
import React from "react";

export default function page() {
  const videoRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const overlayRef = React.useRef(null);
  const drawRef = React.useRef(null);

  const mediaRecorderRef = React.useRef(null);
  const wsRef = React.useRef(null);
  const canvasStreamRef = React.useRef(null);
  const chunksCounterRef = React.useRef(0);

  const [cameraError, setCameraError] = React.useState(null);
  const [isRecording, setIsRecording] = React.useState(false);
  const [modelsLoaded, setModelsLoaded] = React.useState(false);

  // --- Camera init ---
  React.useEffect(() => {
    let stream;
    const requestCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      } catch (err) {
        setCameraError(err?.message || String(err));
      }
    };

    if (navigator?.mediaDevices?.getUserMedia) {
      requestCamera();
    } else {
      setCameraError("Camera API not supported");
    }

    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // --- Draw duplicated frames to canvas ---
  React.useEffect(() => {
    let rafId = null;

    const draw = () => {
      const v = videoRef.current;
      const c = canvasRef.current;
      if (v && c && v.readyState >= 2) {
        const ctx = c.getContext("2d");
        const vidW = v.videoWidth || 0;
        const vidH = v.videoHeight || 0;
        if (vidW && vidH) {
          if (c.width !== vidW * 2 || c.height !== vidH) {
            c.width = vidW * 2;
            c.height = vidH;
          }
          ctx.clearRect(0, 0, c.width, c.height);
          ctx.drawImage(v, 0, 0, vidW, vidH);
          ctx.drawImage(v, vidW, 0, vidW, vidH);
        }
      }
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    drawRef.current = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    };

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // --- face-api model loading & detection (same as your code) ---
  React.useEffect(() => {
    let mounted = true;
    let faceapi;
    const loadModelsAndRun = async () => {
      try {
        faceapi = await import("face-api.js");
        const MODEL_URL = "/models";
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        ]);
        if (!mounted) return;
        setModelsLoaded(true);

        const options = new faceapi.TinyFaceDetectorOptions({
          inputSize: 224,
          scoreThreshold: 0.5,
        });

        const detectLoop = async () => {
          if (!mounted) return;
          const videoCanvas = canvasRef.current;
          const overlay = overlayRef.current;
          if (videoCanvas && overlay && videoRef.current.readyState >= 2) {
            if (
              overlay.width !== videoCanvas.width ||
              overlay.height !== videoCanvas.height
            ) {
              overlay.width = videoCanvas.width;
              overlay.height = videoCanvas.height;
            }
            try {
              const detections = await faceapi.detectAllFaces(
                videoCanvas,
                options
              );
              const ctx = overlay.getContext("2d");
              ctx.clearRect(0, 0, overlay.width, overlay.height);
              ctx.strokeStyle = "lime";
              ctx.lineWidth = Math.max(2, Math.floor(overlay.width / 200));
              detections.forEach((d) => {
                const { x, y, width, height } = d.box;
                ctx.strokeRect(x, y, width, height);
              });
            } catch (e) {
              // ignore transient errors
            }
          }
          requestAnimationFrame(detectLoop);
        };

        requestAnimationFrame(detectLoop);
      } catch (err) {
        setCameraError((err && err.message) || String(err));
      }
    };

    loadModelsAndRun();
    return () => {
      mounted = false;
    };
  }, []);

  // --- Helpers: build same-origin ws url (wss if https) ---
  function makeWSUrl(path = "/stream/video") {
    //   const proto = window.location.protocol === "https:" ? "wss:" : "ws:";
    //   return `${proto}//${window.location.host}${path}`;
  }

  // --- Start recording: capture canvas stream, open ws, create mediaRecorder ---
  const startRecording = async () => {
    setCameraError(null);

    const canvas = canvasRef.current;
    if (!canvas) {
      setCameraError("Canvas not ready");
      return;
    }

    // capture audio: prefer original mic audio from the hidden video element's stream
    let audioStream = null;
    try {
      const vid = videoRef.current;
      if (vid && vid.srcObject instanceof MediaStream) {
        // get audio track(s) from original getUserMedia (if present)
        const srcStream = vid.srcObject;
        const audioTracks = srcStream.getAudioTracks();
        if (audioTracks && audioTracks.length) {
          audioStream = new MediaStream(audioTracks);
        } else {
          // fallback: try to get userMedia for audio only
          try {
            const a = await navigator.mediaDevices.getUserMedia({
              audio: true,
            });
            audioStream = a;
          } catch (e) {
            // no audio; proceed with video-only
            audioStream = null;
          }
        }
      }
    } catch (e) {
      audioStream = null;
    }

    // capture canvas video
    const canvasStream = canvas.captureStream(30); // 30 FPS capture
    canvasStreamRef.current = canvasStream;

    // if audio present, add audio tracks into the canvas stream so MediaRecorder records both
    if (audioStream) {
      audioStream.getAudioTracks().forEach((t) => canvasStream.addTrack(t));
    }

    // open websocket
    const wsUrl = makeWSUrl("/stream/video");
    let ws;
    try {
      ws = new WebSocket(wsUrl);
    } catch (err) {
      setCameraError("WebSocket error: " + String(err));
      return;
    }
    wsRef.current = ws;
    ws.binaryType = "arraybuffer";

    ws.onopen = () => {
      // create MediaRecorder on open so it doesn't produce data until ws ready
      const mime = (() => {
        const m1 = "video/webm;codecs=vp9,opus";
        const m2 = "video/webm;codecs=vp8,opus";
        if (MediaRecorder.isTypeSupported(m1)) return m1;
        if (MediaRecorder.isTypeSupported(m2)) return m2;
        return "video/webm";
      })();

      try {
        const mr = new MediaRecorder(canvasStream, { mimeType: mime });
        mediaRecorderRef.current = mr;

        mr.ondataavailable = async (ev) => {
          if (!ev.data || ev.data.size === 0) return;
          // prefer sending ArrayBuffer for binary
          try {
            const ab = await ev.data.arrayBuffer();
            if (ws && ws.readyState === WebSocket.OPEN) {
              ws.send(ab);
              chunksCounterRef.current += 1;
            }
          } catch (e) {
            // send failure
            console.error("send chunk failed:", e);
          }
        };

        mr.onstart = () => {
          setIsRecording(true);
          chunksCounterRef.current = 0;
        };

        mr.onstop = () => {
          setIsRecording(false);
          // close websocket gracefully
          if (ws && ws.readyState === WebSocket.OPEN) {
            try {
              ws.close();
            } catch (e) {}
          }
          // stop canvas tracks we created
          try {
            if (canvasStreamRef.current) {
              canvasStreamRef.current.getTracks().forEach((t) => t.stop());
              canvasStreamRef.current = null;
            }
          } catch (e) {}
          mediaRecorderRef.current = null;
        };

        mr.onerror = (ev) => {
          console.error("MediaRecorder error", ev);
          setCameraError("MediaRecorder error");
        };

        // Start and ask for a chunk every 1s (1000ms). Adjust timeslice as needed.
        mr.start(1000);
      } catch (err) {
        setCameraError("MediaRecorder initialization failed: " + String(err));
        // close ws if mr fails
        if (ws && ws.readyState === WebSocket.OPEN) ws.close();
      }
    };

    ws.onclose = (ev) => {
      // if closed while recording, stop recorder to flush and cleanup
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        try {
          mediaRecorderRef.current.stop();
        } catch (e) {}
      }
      wsRef.current = null;
    };

    ws.onerror = (e) => {
      console.error("WS error", e);
      setCameraError("WebSocket error");
    };
  };

  // --- Stop recording ---
  const stopRecording = () => {
    try {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsRecording(false);
      // websocket will be closed in onstop/onclose handlers
    }
  };

  // --- cleanup on unmount ---
  React.useEffect(() => {
    return () => {
      try {
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state !== "inactive"
        ) {
          mediaRecorderRef.current.stop();
        }
      } catch (_) {}
      try {
        if (
          wsRef.current &&
          (wsRef.current.readyState === WebSocket.OPEN ||
            wsRef.current.readyState === WebSocket.CONNECTING)
        ) {
          wsRef.current.close();
        }
      } catch (_) {}
      // stop any local canvas stream tracks
      try {
        if (canvasStreamRef.current) {
          canvasStreamRef.current.getTracks().forEach((t) => t.stop());
        }
      } catch (_) {}
    };
  }, []);

  return (
    <React.Suspense fallback={<>Loading...</>}>
      <>
      <Map/>
        {cameraError && <div style={{ color: "red" }}>{cameraError}</div>}

        <div style={{ marginBottom: 8 }}>
          <button onClick={startRecording} disabled={isRecording}>
            Start Recording & Send
          </button>
          <button onClick={stopRecording} disabled={!isRecording}>
            Stop Recording
          </button>
          <span style={{ marginLeft: 12 }}>
            {isRecording ? "Recording..." : "Idle"}{" "}
            {isRecording ? ` (chunks: ${chunksCounterRef.current})` : ""}
          </span>
        </div>

        <video ref={videoRef} style={{ display: "none" }} muted playsInline />

        <div style={{ position: "relative", width: "100%" }}>
          <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
          <canvas
            ref={overlayRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          />
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
          Models loaded: {modelsLoaded ? "yes" : "loading..."} — server WS:{" "}
          <code>{makeWSUrl("/stream/video")}</code>
        </div>
      </>
    </React.Suspense>
  );
}
