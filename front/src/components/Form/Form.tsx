import InputMask from "react-input-mask";

import "./style.scss";
import React, { useState } from "react";
import { literalContent } from "../../constants";
import { useFormik } from "formik";
import { getValidationSchema } from "./formik.helpers";
import { usePostApplication } from "../../hooks";

type Props = {
  onSubmit: () => void;
  theme?: "light" | "dark";
  language: "ru" | "eng";
};

export const Form = (props: Props) => {
  const { onSubmit, theme = "light", language } = props;

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { onPostApplication } = usePostApplication();

  const handleSubmit = async (values) => {
    let formattedNumber = values.phone_number;
    // Заменяем код страны (7) на 8
    if (formattedNumber?.startsWith("+7")) {
      formattedNumber = "8" + formattedNumber.slice(2);
    }
    // Убираем все нецифровые символы
    formattedNumber = formattedNumber.replace(/[^0-9]/g, "");

    const data = {
      initials: values.initials,
      phone_number: formattedNumber,
      company: values.company,
      sphere_activity: values.sphere_activity,
      url_links: values.url_links,
      comments: values.comments,
    };

    const res = await onPostApplication(data);
    const responseData = res.data;

    if (responseData?.["Подробнее"]) {
      setIsSuccess(false);
      setError(responseData?.["Подробнее"]);
    } else if (responseData?.status === 200) {
      setIsSuccess(true);
      setError(null);

      formik.resetForm();

      setTimeout(() => {
        onSubmit();
      }, 2000);
    }
  };

  const formik = useFormik({
    initialValues: {
      initials: "",
      phone_number: "",
      company: "",
      sphere_activity: "",
      url_links: "",
      comments: "",
    },
    validationSchema: getValidationSchema(language),
    onSubmit: handleSubmit,
  });

  const getFormStatus = () => {
    if (!isSuccess && !error) {
      return null;
    }
    if (isSuccess) {
      return (
        <div className="success">
          {literalContent.applicationSuccess[language]}
        </div>
      );
    }
    if (error) {
      return <div className="error">{error}</div>;
    }
    return "";
  };

  const getClassNameForField = (name: string) =>
    formik.touched[name] && formik.errors[name] && "empty";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={theme}>
      <input
        required
        type="text"
        placeholder={literalContent.name[language]}
        className={getClassNameForField("initials")}
        {...formik.getFieldProps("initials")}
        onChange={(e) => formik.setFieldValue("initials", e.target.value)}
      />
      <InputMask
        required
        mask="+7 (999) 999-9999"
        placeholder={literalContent.phone[language]}
        type="text"
        className={getClassNameForField("phone_number")}
        {...formik.getFieldProps("phone_number")}
        onChange={(e) => formik.setFieldValue("phone_number", e.target.value)}>
        {(inputProps) => <input {...inputProps} />}
      </InputMask>
      <input
        required
        type="text"
        placeholder={literalContent.company[language]}
        className={getClassNameForField("company")}
        {...formik.getFieldProps("company")}
        onChange={(e) => formik.setFieldValue("company", e.target.value)}
      />
      <input
        required
        type="text"
        placeholder={literalContent.sphereActivity[language]}
        className={getClassNameForField("sphere_activity")}
        {...formik.getFieldProps("sphere_activity")}
        onChange={(e) =>
          formik.setFieldValue("sphere_activity", e.target.value)
        }
      />
      <input
        required
        type="text"
        placeholder={literalContent.socialNetworks[language]}
        className={getClassNameForField("url_links")}
        {...formik.getFieldProps("url_links")}
        onChange={(e) => formik.setFieldValue("url_links", e.target.value)}
      />
      <input
        required
        type="text"
        placeholder={literalContent.comment[language]}
        className={getClassNameForField("comments")}
        {...formik.getFieldProps("comments")}
        onChange={(e) => formik.setFieldValue("comments", e.target.value)}
      />
      <button
        disabled={!formik.isValid || !formik.dirty}
        onClick={formik.submitForm}>
        {literalContent.send[language]?.toUpperCase()}
      </button>
      {getFormStatus()}
    </form>
  );
};
