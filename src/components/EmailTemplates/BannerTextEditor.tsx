import React from "react";
import { ChangeEvent, useState, useEffect, useRef } from "react";

const BannerTextEditor = ({ base64ImageDefault, text, isEditable, setUpdatedBanner }: any) => {
  const bannerCanvasRef: any = useRef(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [texts, setTexts] = useState([{ text: "", x: 44, fontSize: 44, color: "white" }]);

  const img = new Image();

  useEffect(() => {
    handleTextChange(0, text);
  }, [text]);

  // Update the image when base64ImageDefault changes
  useEffect(() => {
    if (base64ImageDefault) {
      img.src = `data:image/png;base64,${base64ImageDefault}`;
      img.onload = () => {
        setImage(img);
        drawCanvas(img, texts);
      };
    }
  }, [base64ImageDefault]);

  // Function to wrap the text if it exceeds 70% of the canvas width
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number) => {
    const words = text.split(" ");
    let line = "";
    const lines: string[] = [];

    words.forEach((word: string) => {
      const testLine = line + word + " ";
      const testWidth = ctx.measureText(testLine).width;

      if (testWidth > maxWidth && line !== "") {
        lines.push(line);
        line = word + " ";
      } else {
        line = testLine;
      }
    });

    lines.push(line); // Push the last line
    return lines;
  };

  // Function to handle drawing the image and text on the canvas
  const drawCanvas = (img: HTMLImageElement, texts: any) => {
    const canvas = bannerCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // Clear previous content
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set canvas size to the image size
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image on canvas
        ctx.drawImage(img, 0, 0);

        // Draw each text with auto-wrapping and centering
        texts.forEach(({ text, x, fontSize, color }: any) => {
          ctx.font = `${fontSize}px Arial`;
          ctx.fillStyle = color;

          const maxWidth = canvas.width * 0.7;
          const lines = wrapText(ctx, text, maxWidth);
          const realTextHeight = ctx.measureText(text).actualBoundingBoxAscent;

          if (lines.length === 1) {
            ctx.fillText(lines[0], x, canvas.height / 2 + realTextHeight * 0.51);
          } else {
            const dif = canvas.height / 3;
            ctx.fillText(lines[0], x, dif + realTextHeight * 0.51);
            ctx.fillText(lines[1], x, dif * 2 + realTextHeight * 0.51);
          }

          if(isEditable && text.length> 0){
            const dataURL = canvas.toDataURL("image/png")
            var base64Data = dataURL.replace(/^data:image\/png;base64,/, '');
            setUpdatedBanner(base64Data);
          } 

        });
      }
    }
  };

  // Function to return the base64 image after canvas drawing
  const getBase64Image = (): string | null => {
    const canvas = bannerCanvasRef.current;
    if (canvas) {
      return canvas.toDataURL("image/png");
    }
    return null;
  };


  // Handle text input change
  const handleTextChange = (index: number, value: string) => {
    const newTexts = [...texts];
    newTexts[index].text = value;
    setTexts(newTexts);
    if (image) {
      drawCanvas(image, newTexts);
    }
  };

  // This useEffect ensures the function `getBase64Image` is called when the canvas content changes
  useEffect(() => {
    if (image && texts) {
      drawCanvas(image, texts);
    }
  }, [image, texts]);

  return (
    <div>
      <canvas ref={bannerCanvasRef} style={{ display: 'none' }} />
      {/* Render the base64 image (you can use it or send it wherever you need) */}
      {
        !isEditable && <img src={getBase64Image() || ""}  style={{ maxWidth: "100%"}} alt="Generated Banner" /> 
      }
    </div>
  );
};

export default BannerTextEditor;
