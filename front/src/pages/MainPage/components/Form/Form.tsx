import InputMask from "react-input-mask";

import "./style.scss";
import { useContext, useState } from "react";
import axios from "axios";
import { LanguageContext } from "../../../../App";
import { literalContent } from "../../../../constants";

type Props = {
  onSubmit: () => void;
  theme?: "light" | "dark";
}

export const Form = (props: Props) => {
  const { onSubmit, theme = "light" } = props;

  const [initials, setInitials] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");
  const [sphereActivity, setSphereActivity] = useState("");
  const [urlLinks, setUrlLinks] = useState("");
  const [comments, setComments] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const language = useContext(LanguageContext);

  const isFormValid =
    initials.length
    && phoneNumber.length
    && company.length
    && sphereActivity.length
    && urlLinks.length
    && comments.length;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formattedNumber = phoneNumber;
    // Заменяем код страны (7) на 8
    if (formattedNumber.startsWith("+7")) {
      formattedNumber = "8" + formattedNumber.slice(2);
    }
    // Убираем все нецифровые символы
    formattedNumber = formattedNumber.replace(/[^0-9]/g, "");

    const data = {
      initials,
      phone_number: formattedNumber,
      company,
      sphere_activity: sphereActivity,
      url_links: urlLinks,
      comments,
    };

    try {
      const response = await axios.post('/api/postApplications', data);

      const result = await response.data;

      if (result.status === 200) {
        setError(null);
        setIsSuccess(true);
        setTimeout(() => {
          onSubmit();
        }, 2000);
      } else {
        setError(result?.["Подробнее"]);
      }
    } catch (error) {
      setError(literalContent.applicationError[language]);
    }
  };

  const getFormStatus = () => {
    if (!isSuccess && !error) {
      return null;
    }
    if (isSuccess) {
      return <div className="success">{literalContent.applicationSuccess[language]}</div>;
    }
    if (error) {
      return <div className="error">{error}</div>;
    }
    return "";
  };

  return (
    <form onSubmit={handleSubmit} className={theme}>
      <input
        required
        type="text"
        placeholder={literalContent.name[language]}
        value={initials}
        onChange={(e) => setInitials(e.target.value)}
        className={!initials.length && "empty"}
      />
      <InputMask
        required
        mask="+7 (999) 999-9999"
        placeholder={literalContent.phone[language]}
        value={phoneNumber}
        type="text"
        onChange={(e) => setPhoneNumber(e.target.value)}
        className={!phoneNumber.length && "empty"}
      >
        {(inputProps) => <input {...inputProps} />}
      </InputMask>
      <input
        required
        type="text"
        placeholder={literalContent.company[language]}
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className={!company.length && "empty"}
      />
      <input
        required
        type="text"
        placeholder={literalContent.sphereActivity[language]}
        value={sphereActivity}
        onChange={(e) => setSphereActivity(e.target.value)}
        className={!sphereActivity.length && "empty"}
      />
      <input
        required
        type="text"
        placeholder={literalContent.socialNetworks[language]}
        value={urlLinks}
        onChange={(e) => setUrlLinks(e.target.value)}
        className={!urlLinks.length && "empty"}
      />
      <input
        required
        type="text"
        placeholder={literalContent.comment[language]}
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        className={!comments.length && "empty"}
      />
      <input type="submit" value={literalContent.send[language]?.toUpperCase()} disabled={!isFormValid} />
      {getFormStatus()}
    </form>
  );
};
