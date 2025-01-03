import InputMask from 'react-input-mask';

import "./style.scss";
import { useState } from "react";
import axios from "axios";

export const Form = ({ onSubmit }) => {
  const [initials, setInitials] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");
  const [sphereActivity, setSphereActivity] = useState("");
  const [urlLinks, setUrlLinks] = useState("");
  const [comments, setComments] = useState("");

  const [error, setError] = useState(null);

  const isFormValid = initials.length && phoneNumber.length && company.length && sphereActivity.length && urlLinks.length && comments.length;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      initials,
      phone_number: phoneNumber,
      company,
      sphere_activity: sphereActivity,
      url_links: urlLinks,
      comments,
    };

    try {
      const response = await axios.post('/api/postApplications', data);

      const result = await response.data();
      console.log(result);
      onSubmit();
      setError(null);
    } catch (error) {
      setError("Произошла ошибка при отправке заявки");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        required
        type="text"
        placeholder="Имя"
        value={initials}
        onChange={(e) => setInitials(e.target.value)}
        className={!initials.length && "empty"}
      />
      <InputMask
        required
        mask="+7 (999) 999-9999"
        placeholder="Номер телефона"
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
        placeholder="Организация"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className={!company.length && "empty"}
      />
      <input
        required
        type="text"
        placeholder="Сфера деятельности"
        value={sphereActivity}
        onChange={(e) => setSphereActivity(e.target.value)}
        className={!sphereActivity.length && "empty"}
      />
      <input
        required
        type="text"
        placeholder="Соцсети организации"
        value={urlLinks}
        onChange={(e) => setUrlLinks(e.target.value)}
        className={!urlLinks.length && "empty"}
      />
      <input
        required
        type="text"
        placeholder="Комментарий"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        className={!comments.length && "empty"}
      />
      <input type="submit" value="Отправить" disabled={!isFormValid} />
      <div className="error">{error}</div>
    </form>
  );
};
