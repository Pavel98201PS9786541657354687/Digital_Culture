import * as Yup from "yup";

import { literalContent } from "../../constants";

export const getValidationSchema = (language: "ru" | "eng") => {
  const msg = literalContent.fieldShouldNotBeEmpty[language];

  return Yup.object({
    initials: Yup.string().required(msg),
    phone_number: Yup.string().required(msg),
    company: Yup.string().required(msg),
    sphere_activity: Yup.string().required(msg),
    url_links: Yup.string().required(msg),
    comments: Yup.string().required(msg),
  });
};
