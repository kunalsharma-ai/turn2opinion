export default async function loadPDF({ onLoading, onLoad,onFileLoad, config }) {
  if (onLoading) onLoading(true);
  if (onLoad) onLoad(null);
  try {
    
    
    const response = await fetch("/generate-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config = {
        pageSize: "A4",
        orientation: "portrait",
        printBackground: true,
        margin: {
          top: "1cm",
          bottom: "1cm",
          left: "1cm",
          right: "1cm",
        },
        ...config
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch PDF");
    }

    const blob = await response.blob();
    if(onFileLoad)onFileLoad(blob)
    const url = URL.createObjectURL(blob);
    if (onLoad) onLoad(url);
  } catch (error) {
    console.error(error);
    alert("Error fetching PDF");
  } finally {
    if (onLoading) onLoading(false);
  }
};
