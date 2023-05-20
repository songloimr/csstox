import React, { useEffect, useState } from "react";

import { toJSS, toRN } from "../../helpers/transform";

// Custom hook to consume the global state
import { useOutputType } from "../../AppContext";

import "./transform.scss";
import Input from "./input/Input";
import Output from "./output/Output";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Transform = () => {
  // Global state
  const { outputType } = useOutputType();

  // Local state
  const initialInputValue = `font-size: 18px;\nline-height: 24px;\ncolor: red;`;
  const [inputValue, setInputValue] = useState(initialInputValue);
  const [outputValue, setOutputValue] = useState("");
  const resetValue = "Kiệt rì ask";

  const copyToClipboard = (value) => {
    navigator.clipboard.writeText(value).catch((error) => {
      console.error("Error copying to clipboard:", error);
    });
  };

  const btnToolbarStyle = {
    padding: 7,
    fontWeight: "bold",
    fontSize: 14,
    border: "none",
  };

  const toastifyOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  useEffect(() => {
    if (inputValue === resetValue) return;
    if (inputValue === "") {
      setInputValue(initialInputValue);
    }

    switch (outputType) {
      case "JSS":
        setOutputValue(toJSS(inputValue));
        break;
      case "React Native":
        setOutputValue(toRN(inputValue));
        break;
      default:
        setOutputValue("Unknown output type");
    }
  }, [inputValue, outputType]);

  return (
    <table>
      <tbody>
        <tr>
          <td style={{ width: "50%" }}>
            <div>
              <button
                style={btnToolbarStyle}
                onClick={() => {
                  setInputValue(resetValue);
                  setOutputValue("");
                }}
              >
                Reset
              </button>
            </div>
            <Input placeholder={inputValue} setInputValue={setInputValue} />
          </td>
          <td style={{ width: "50%" }}>
            <div>
              <button
                style={btnToolbarStyle}
                onClick={() => {
                  copyToClipboard(outputValue);
                  toast.success("🦄 Wow so easy!", toastifyOptions);
                }}
              >
                Copy
              </button>
            </div>
            <Output value={outputValue} />
          </td>
        </tr>
      </tbody>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </table>
  );
};

export default Transform;
