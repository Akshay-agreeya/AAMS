import React, { useEffect, useState } from 'react';
import htmlDocx from 'html-docx-js/dist/html-docx';
import iconMsWord from "../../assets/images/iconMsWord.svg";

const DownloadStyledDocx = () => {

    const [base64Image, setBase64Image] = useState('');

  useEffect(() => {
    const convertImageToBase64 = async (imageUrl) => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = () => {
          setBase64Image(reader.result);
        };

        reader.readAsDataURL(blob);
      } catch (error) {
        console.error('Error converting image to Base64:', error);
      }
    };

    // Provide the relative or absolute URL of the image you want to convert
    convertImageToBase64('/logo192.png');
  }, [])

    const generateDocx = () => {
        // HTML content with inline CSS styles
        const content = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              background-color: #f9f9f9;
            }
            h1 {
              color: #4CAF50;
              text-align: center;
            }
            p {
              font-size: 16px;
              color: #333;
              line-height: 1.5;
            }
            .important {
              font-weight: bold;
              color: #D32F2F;
            }
            .footer {
              font-size: 14px;
              color: #777;
              text-align: center;
              margin-top: 30px;
            }
          </style>
        </head>
        <body>
          <h1>My Styled Document</h1>
          <p>This is a sample document with inline styles.</p>
          <p class="important">This paragraph is important and has a different color.</p>
          <p class="footer">Footer text that is styled at the bottom.</p>
          <img src="${base64Image}">
        </body>
      </html>
    `;

        // Convert HTML to DOCX
        const converted = htmlDocx.asBlob(content);

        // Create a link to download the DOCX file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(converted);
        link.download = 'styled-document.docx';
        link.click();
    };

    return (
        <a href="#" className="me-3" onClick={(e) => {e.preventDefault(); generateDocx()}}>
            <img src={iconMsWord} alt="Download Document in Microsoft Word" />
        </a>
    );
};

export default DownloadStyledDocx;
