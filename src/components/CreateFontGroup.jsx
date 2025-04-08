import React, { useRef } from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

const CreateFontGroup = ({ fontFile,setFrontGroupList }) => {
  const ArrayHelperRef = useRef();
  const initialValues = {
    fontGroupName: "",
    fontGroup: [{ fontName: "", font: "", fontSize: "", price: "" }],
  };

  const handleSubmit = (e, values, resetForm) => {
    e.preventDefault();
console.log(values)
    if (values.fontGroup.length < 2) {
      alert("You must select at least two fonts before submitting!");
      return; // Prevent submission if less than two fonts
    }

    // Handle form submission (e.g., send to API or update state)
    console.log("Form submitted with values:", values);
    setFrontGroupList((prev)=>[...prev,values])
    resetForm({ values: initialValues });
  };


  const fontOptions = fontFile.map((font) => ({
    value: font.name,
    label: font.name,
  }));


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        fontGroupName: Yup.string().required("Font group name is required"),
        fontGroup: Yup.array().of(
          Yup.object().shape({
            fontName: Yup.string().required("Font name is required"),
            font: Yup.string().required("Font file is required"),
            fontSize: Yup.string().required("Font size is required"),
            price: Yup.string().required("Price is required"),
          })
        ),
      })}
      onSubmit={({ setSubmitting, resetForm, values }) => {
        if (values.fontGroup.length < 2) {
          alert("You must select at least two fonts to create a font group.");
        } else {
          setSubmitting(false);
          resetForm({ values: initialValues });
          console.log("Form submitted with values:", values);
        }
      }}
    >
      {({
        values,
        resetForm,
        setFieldValue,
        errors,
        touched,
        isValid,
        dirty,
      }) => (
        <Form
          id="font-group-form"
          onSubmit={(e) => {
            handleSubmit(e, values, resetForm);
          }}
          className="w-full mx-auto p-6 bg-white rounded-lg shadow-md"
        >
          
          <div className="mb-4">
            <Field
              name="fontGroupName"
              placeholder="Font Group Name"
         
              className="w-full  p-2 border border-green-500 rounded-md focus:outline-none"
            />
            {errors.fontGroupName && touched.fontGroupName && (
              <div className="text-red-500 text-sm mt-1">
                {errors.fontGroupName}
              </div>
            )}
          </div>
          <FieldArray
            name="fontGroup"
            render={(arrayHelpers) => {
              ArrayHelperRef.current = arrayHelpers;
              const fontGroup = values.fontGroup;
          
              return (
                <div className="space-y-6 w-full">

                  <table className="table border border-gray-300 w-full border-collapse">
                    <thead></thead>
                    <tbody>
                      {fontGroup.map((fonts, index) => {
                        console.log();
                        return (
                          <tr key={index} className="border border-gray-300">
                            <td className="px-4 py-2 text-center">
                              <Field
                                name={`fontGroup[${index}].fontName`}
                                placeholder="Font Name"
                                type="text"
                                className="w-full  p-2 border border-green-500 rounded-md focus:outline-none"
                                onChange={(e) => {
                                  setFieldValue(
                                    `fontGroup.${index}.fontName`,
                                    e.target.value
                                  );
                                }}
                              />
                              {errors.fontGroup?.[index]?.fontName &&
                                touched.fontGroup?.[index]?.fontName && (
                                  <div className="text-red-500 text-sm mt-1">
                                    {errors.fontGroup[index].fontName}
                                  </div>
                                )}
                            </td>
                            <td className="px-4 py-2 text-center">
                              <div className="">
                                <Select
                                  class="form-select"
                                  className=" "
                                  aria-label="Default select example"
                                  name={`fontGroup[${index}].font`}
                                  placeholder="Select Font"
                                  options={fontOptions}
                                  defaultValue={{
                                    label: "Select Font",
                                    value: 0,
                                  }}
                                  value={
                                    fontOptions.find(
                                      (option) => option.label === fonts.font
                                    ) || {
                                      label: "Select Font",
                                      value: 0,
                                    }
                                  }
                                  styles={{
                                    control: (baseStyles) => ({
                                      ...baseStyles,
                                      width: "100%",
                                      borderColor: "#2DDC1B",
                                      minHeight: "38px",
                                      textAlign: "center",
                                    }),
                                    menu: (provided) => ({
                                      ...provided,
                                      zIndex: 9999,
                                    }),
                                    menuPortal: (base) => ({
                                      ...base,
                                      zIndex: 9999,
                                    }),
                                  }}
                                  theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                      ...theme.colors,
                                      primary25: "#B8FEB3",
                                      primary: "#2DDC1B",
                                    },
                                  })}
                                  menuPosition="fixed"
                                  menuPortalTarget={document.body}
                                  onChange={(e) => {
                                    setFieldValue(
                                      `fontGroup.${index}.font`,
                                      e.value
                                    );
                                  }}
                                ></Select>
                              </div>
                              {errors.fontGroup?.[index]?.font &&
                                touched.fontGroup?.[index]?.font && (
                                  <div className="text-red-500 text-sm mt-1">
                                    {errors.fontGroup[index].font}
                                  </div>
                                )}
                            </td>
                            <td className="px-4 py-2 text-center">
                              <Field
                              
                                name={`fontGroup[${index}].fontSize`}
                                placeholder="Font Size"
                                type="number"
                                className="w-full  p-2 border border-green-500 rounded-md focus:outline-none"
                                onChange={(e)=>{
                                  setFieldValue(`fontGroup.${index}.fontSize`,e.target.value)
                                }}
                              />
                              {errors.fontGroup?.[index]?.fontSize &&
                                touched.fontGroup?.[index]?.fontSize && (
                                  <div className="text-red-500 text-sm mt-1">
                                    {errors.fontGroup[index].fontSize}
                                  </div>
                                )}
                            </td>
                            <td className="px-4 py-2 text-center">
                              <Field
                                name={`fontGroup[${index}].price`}
                                placeholder="Price"
                                type="number"
                                className="w-full  p-2 border border-green-500 rounded-md focus:outline-none"
                                onChange={(e)=>{
                                  setFieldValue(`fontGroup.${index}.price`,e.target.value)
                                }}
                              />
                              {errors.fontGroup?.[index]?.price &&
                                touched.fontGroup?.[index]?.price && (
                                  <div className="text-red-500 text-sm mt-1">
                                    {errors.fontGroup[index].price}
                                  </div>
                                )}
                            </td>
                            <td className="px-4 py-2 text-center">
                              <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <FontAwesomeIcon
                                  className="text-3xl"
                                  icon={faXmarkCircle}
                                ></FontAwesomeIcon>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {/* Add Row Button */}
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          fontName: "",
                          font: "",
                          fontSize: "",
                          price: "",
                        })
                      }
                      className="px-4 py-2 mt-4 border border-gray-300 text-black bg-transparent hover:bg-blue-700 rounded-md"
                    >
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>  Add Font
                    </button>

                    <div className="ms-4 ">
                      <button
                        type="submit"
                        id="font-group-form"
                        disabled={!isValid || !dirty}
                        className="px-4 py-2 mt-4 text-white bg-green-500 hover:bg-green-600 rounded-md"
                      >
                       Craete
                      </button>
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default CreateFontGroup;
