import React from 'react'

const FontGroupList = ({fontGroupList,setFrontGroupList}) => {
  const handleRemoveFont = (fontName) => {
    setFrontGroupList(fontGroupList.filter((file) => file.fontGroupName !== fontName));
  };
  return (
    fontGroupList?.length > 0 && (
      <div className="mt-4">

        <div className="overflow-x-auto mt-2">
          <table className="table">
            <thead>
              <tr>
                <th className='uppercase'>Sl</th>
                <th className='uppercase'>Name</th>
                <th className='uppercase'>Fonts</th>
                <th className='uppercase'>Count</th>
                <th className='uppercase'>Action</th>
              </tr>
            </thead>
            {fontGroupList &&
              fontGroupList.map((font, index) => {
                const allFont=font?.fontGroup?.map((group)=>group.fontName).join(",")
               
                return (
                  <tr key={index}>
                  <td>{index + 1}</td>
                  <td className='font-medium'>{font.fontGroupName}</td>
                  <td>
                    {allFont}
                  </td>
                  <td className='font-medium'>
                    {font?.fontGroup.length}
                  </td>
                  <td>
                    <button
                      className="text-blue-500 font-medium"
                      // onClick={() => handleRemoveFont(font.fontGroupName)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 font-medium ms-4"
                      onClick={() => handleRemoveFont(font.fontGroupName)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                )
              }
               
              )}
          </table>
     
        </div>
      </div>
    )
  );
}

export default FontGroupList
