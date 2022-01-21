import React, { useRef, useState, useEffect, useCallback } from "react";

// import TAJ_QR from "./taj-super-cafe.svg";
// import { ReactComponent as QrTemp } from "./QR_FRAME.svg";
import { ReactComponent as QrTemp } from "./QR-TEMPLATE_2.svg";
import testSvg from "./QR_FRAME.svg";
// import temp_svg from "./downloaded_svg.svg";

import domtoimage from "dom-to-image";
import QRCode from "qrcode.react";

import axios from "axios";

// const QrCode = () => {
//   return;
// };

const QrCodeFrame = () => {
  const curSvg = useRef();
  const qrRef = useRef();
  const [qrElement, setQrElement] = useState();

  useEffect(() => {
    // getFile();
  }, []);

  const uploadTemplateToServer = useCallback(async () => {
    let mimeType = `image/${testSvg.split(".")[testSvg.split(".").length - 1]}`;
    const imageUrl = await fetch(testSvg);
    const buffer = await imageUrl.arrayBuffer();
    const curFile = new File([buffer], "Image", { type: mimeType });

    const fd = new FormData();
    fd.append("file", curFile);
    fd.append("fileType", "DOCUMENT");

    try {
      const { data: fileData } = await axios.post(
        `http://ec2-3-109-105-151.ap-south-1.compute.amazonaws.com:8072/core/upload-file`,
        fd,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYWRlZW1haG1lZHFAZ21haWwuY29tLUNMSUVOVCIsImV4cCI6MTY0MzUyNTM1OCwiaWF0IjoxNjQwOTMzMzU4fQ.9FEVDIpu496fnrp5NUEbQ7lbg5GS2vB2z-IBdJPfFgA`,
          },
        }
      );

      console.log(fileData);
    } catch (err) {
      console.log("Something went wrong: ", err.message);
    }
  }, []);

  const handleDownload = () => {
    domtoimage
      .toSvg(curSvg.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${qrElement}.svg`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log("Something went wrong: ", err.message);
      });
  };

  const handleDownloadQR = () => {
    domtoimage
      .toSvg(qrRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${qrElement}_QrOnly.svg`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log("Something went wrong: ", err.message);
      });
  };

  return (
    <div>
      <h1>QR Code generator</h1>
      {/* <QR_CODE ref={curSvg} /> */}
      {qrElement && (
        <>
          <div
            style={{
              position: "relative",
              margin: "auto",
              boxShadow: "4px 4px 8px rgba(0,0,0,0.5)",
              marginBottom: "50px",
            }}
            ref={curSvg}
          >
            <h1
              style={{
                position: "absolute",
                color: "white",
                width: "100%",
                top: "15%",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "30px",
                fontWeight: "400",
                lineHeight: "110%",
              }}
            >
              Coffee Paradise
            </h1>
            <QrTemp />
            <QRCode
              value={qrElement}
              renderAs="svg"
              includeMargin={true}
              style={{
                width: "90px",
                height: "90px",
                position: "absolute",
                top: "55%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />

            <a
              href="https://coffee-paradise.everpresent.tech"
              target="_blank"
              rel="noreferrer"
              style={{
                position: "absolute",
                textDecoration: "none",
                width: "100%",
                bottom: "7%",
                left: "0",
                fontSize: "13px",
                color: "#212021",
              }}
            >
              https://coffee-paradise.everpresent.tech
            </a>

            {/* <QR_CODE /> */}
          </div>
          <button onClick={handleDownload}>Download</button>
        </>
      )}
      <button
        onClick={() => setQrElement("https://coffee-paradise.everpresent.tech")}
      >
        Get QR
      </button>
      <br /> <br />
      {qrElement && (
        <>
          <div ref={qrRef}>
            <QRCode
              value={qrElement}
              renderAs="svg"
              size={200}
              includeMargin={true}
            />
          </div>
          <button onClick={handleDownloadQR}>Download QR</button>
        </>
      )}
      <br />
      <br />
      <button onClick={uploadTemplateToServer}>
        Upload template to server
      </button>
      {/* <div style={{ marginTop: "100px", width: "500px", height: "500px" }}>
        <img src={temp_svg} alt="Downloaded svg" width="100%" height="100%" />
      </div> */}
      {/* <img src={QrCodeSvg} alt="qrimage" /> */}
    </div>
  );
};

export default QrCodeFrame;
