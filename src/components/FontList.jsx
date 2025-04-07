import React from "react";

const FontList = ({ fontFile, handleRemoveFile }) => {
  return (
    fontFile?.length > 0 && (
      <div className="mt-16">
        <div>
          <h3 className="text-2xl font-medium">Our Fonts</h3>
          <p>Brouse a list of Zepto fonts to build your font group:</p>
        </div>

        <div className="overflow-x-auto mt-2">
          <table className="table">
            <thead>
              <tr>
                <th>Sl</th>
                <th>Font Name</th>
                <th>Preview</th>
                <th>Action</th>
              </tr>
            </thead>
            {fontFile &&
              fontFile.map((font, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{font.name}</td>
                  <td>
                    <div
                      style={{
                        fontFamily: "CustomFont" + index,
                        fontSize: "20px",
                      }}
                    >
                      This is a preview of the font!
                    </div>
                  </td>
                  <td>
                    <button
                      className="text-red-500 font-medium"
                      onClick={() => handleRemoveFile(font.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </table>
          {fontFile?.map((font, index) => (
            <style key={index}>
              {`
              @font-face {
                font-family: 'CustomFont${index}';
                src: url('${URL.createObjectURL(
                  font.file
                )}') format('truetype');
              }
            `}
            </style>
          ))}
        </div>
      </div>
    )
  );
};

export default FontList;
