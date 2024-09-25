import React from "react";
import { ChangeEvent, useState, useEffect, useRef } from "react";

const BannerTextEditor = ({base64ImageDefault, text, bannerCanvasRef }: any) => {
    const [image, setImage] = useState(null);
    const [texts, setTexts] = useState([{ text: "", x: 44, fontSize: 44, color: "white" }]);
    
    useEffect(()=>{
      handleTextChange(0, text);
    }, [text])
    const img: any = new Image();

    console.log('test-01')

    useEffect(()=>{
      img.src = base64ImageDefault;
      img.onload = () => {
        setImage(img);
        drawCanvas(img, texts);
      };
    }, [base64ImageDefault])

    // Function to handle base64 input
    const handleBase64Input = (e: any) => {
      const base64String = e.target.value;
      const img: any = new Image();
      img.src = base64String;
      img.onload = () => {
        setImage(img);
        drawCanvas(img, texts);
      };
    };
  
    // Function to wrap the text if it exceeds 70% of the canvas width
    const wrapText = (ctx: any, text: any, maxWidth: any) => {
      const words = text.split(" ");
      let line = "";
      const lines = [];
  
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
    const drawCanvas = (img: any, texts: any) => {
      const canvas: any = bannerCanvasRef.current;
      if(canvas){
        const ctx = canvas.getContext("2d");
  
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
        }); 
      }
    };
  
    // Handle text input change
    const handleTextChange = (index: any, value: any) => {
      const newTexts = [...texts];
      newTexts[index].text = value;
      setTexts(newTexts);
      if (image) {
        drawCanvas(image, newTexts);
      }
    };
    
    return (
        <canvas ref={bannerCanvasRef} style={{ display: 'none' }} />
    );
  };

export default BannerTextEditor;

