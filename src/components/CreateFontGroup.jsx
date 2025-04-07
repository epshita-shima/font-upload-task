import React, { useRef } from "react";
import { Formik, Field, FieldArray, Form } from "formik";
import * as Yup from "yup";

const CreateFontGroup = ({fontFile}) => {
  const ArrayHelperRef = useRef();
  const initialValues = {
    fontGroupName: "", // Initially one font field
    fontGroup: [{ fontName: "", font: "", fontSize: "", price: "" }], // Initially one font field
  };

  const handleSubmit = (e, values, resetForm) => {
    e.preventDefault();

    // Check if at least two fonts are selected
    if (values.fontGroup.length < 2) {
      alert("You must select at least two fonts before submitting!");
      return; // Prevent submission if less than two fonts
    }

    // Handle form submission (e.g., send to API or update state)
    console.log("Form submitted with values:", values);
    resetForm({ values: initialValues });
  };
  const fontOptions  = fontFile.map((font) => ({
    value: font.name,
    label: font.name,
  }));
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        fontGroupName: Yup.string().required('Font group name is required'),
        fontGroup: Yup.array().of(
          Yup.object().shape({
            fontName: Yup.string().required('Font name is required'),
            font: Yup.string().required('Font file is required'),
            fontSize: Yup.string().required('Font size is required'),
            price: Yup.string().required('Price is required'),
          })
        ),
      })}
      onSubmit={({ setSubmitting, resetForm, values }) => {
        // Validate if there are at least two fonts before submitting
        if (values.fontGroup.length < 2) {
          alert('You must select at least two fonts to create a font group.');
        } else {
          setSubmitting(false);
          resetForm({ values: initialValues });
          console.log('Form submitted with values:', values);
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
          className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md"
        >
          {/* Font Group Name */}
          <div className="mb-4">
            <Field
              name="fontGroupName"
              placeholder="Font Group Name"
              style={{
                border: "1px solid #2DDC1B",
                padding: "5px",
                width: "100%",
                borderRadius: "5px",
                height: "38px",
                marginBottom: "5px",
                textAlign: "center",
              }}
              // className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fontGroupName && touched.fontGroupName && (
              <div className="text-red-500 text-sm mt-1">{errors.fontGroupName}</div>
            )}
          </div>

          {/* Font Group (Dynamic Fields) */}
          <FieldArray
            name="fontGroup"
            render={(arrayHelpers) => {
              ArrayHelperRef.current = arrayHelpers;
              const fontGroup = values.fontGroup;

              return (
                <div className="space-y-6">
                  <div className="flex flex-col space-y-4">
                    {fontGroup.map((font, index) => (
                      <div
                        key={index}
                        className="flex border-b border-gray-300 pb-4"
                      >
                        {/* Font Name */}
                        <div className="flex-1 px-4">
                          <Field
                            name={`fontGroup[${index}].fontName`}
                            placeholder="Font Name"
                            style={{
                              border: "1px solid #2DDC1B",
                              padding: "5px",
                              width: "100%",
                              borderRadius: "5px",
                              height: "38px",
                              marginBottom: "5px",
                              textAlign: "center",
                            }}
                            // className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {errors.fontGroup?.[index]?.fontName &&
                            touched.fontGroup?.[index]?.fontName && (
                              <div className="text-red-500 text-sm mt-1">
                                {errors.fontGroup[index].fontName}
                              </div>
                            )}
                        </div>

                        {/* Font File */}
                        <div className="flex-1 px-4">
                        <Field
                          as="select"
                          name={`fontGroup[${index}].font`}
                          className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Font</option>
                          {fontOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Field>
                        {errors.fontGroup?.[index]?.font &&
                          touched.fontGroup?.[index]?.font && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors.fontGroup[index].font}
                            </div>
                          )}
                      </div>


                        {/* Font Size */}
                        <div className="flex-1 px-4">
                          <Field
                            name={`fontGroup[${index}].fontSize`}
                            placeholder="Font Size"
                            className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {errors.fontGroup?.[index]?.fontSize &&
                            touched.fontGroup?.[index]?.fontSize && (
                              <div className="text-red-500 text-sm mt-1">
                                {errors.fontGroup[index].fontSize}
                              </div>
                            )}
                        </div>

                        {/* Price */}
                        <div className="flex-1 px-4">
                          <Field
                            name={`fontGroup[${index}].price`}
                            placeholder="Price"
                            className="w-full mt-2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          {errors.fontGroup?.[index]?.price &&
                            touched.fontGroup?.[index]?.price && (
                              <div className="text-red-500 text-sm mt-1">
                                {errors.fontGroup[index].price}
                              </div>
                            )}
                        </div>

                        {/* Remove Field */}
                        {fontGroup.length > 1 && (
                          <div className="flex items-center px-4">
                            <button
                              type="button"
                              onClick={() => arrayHelpers.remove(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove Font
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add Row Button */}
                  <div className="flex justify-start">
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({
                          fontName: '',
                          font: '',
                          fontSize: '',
                          price: '',
                        })
                      }
                      className="px-4 py-2 mt-4 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                    >
                      Add Font
                    </button>
                  </div>
                </div>
              );
            }}
          />

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={!isValid || !dirty}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateFontGroup;
