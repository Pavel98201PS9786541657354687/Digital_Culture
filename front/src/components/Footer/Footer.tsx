import "./style.scss";
import liveLogoLetters from "../../assets/live-logo-letters.webm";
import liveLogoEye from "../../assets/live-logo-eye.webm";
import telegramLogo from "../../assets/telegram-logo-fill.svg";
import instagramLogo from "../../assets/instagram-logo-fill.svg";
import liveLogoLettersGif from "../../assets/live-logo-letters.gif";
import { useNavigate } from "react-router";
import { literalContent } from "../../constants";
import { useContext } from "react";
import { LanguageContext } from "../../App";

type Props = {
  handleSwitchLanguage: () => void;
}

export const Footer = (props: Props) => {
  const { handleSwitchLanguage } = props;

  const navigate = useNavigate();
  const language = useContext(LanguageContext);

  return (
    <footer className="footer">
      <div className="gradient"></div>
      <div className="footer-content">
        <div className="footer-content-logo" onClick={() => navigate("/")}>
          {/*<video width="8%" autoPlay loop muted>*/}
          {/*  <source src={liveLogoEye} type="video/webm" />*/}
          {/*  Ваш браузер не поддерживает видео.*/}
          {/*</video>*/}
          <img className="footer-content-logo__letters" width={200} src={liveLogoLettersGif} alt="" />
        </div>
        <a href="tel:+79619650500" className="footer-content-phone">+7 (961) 965-05-00</a>
        <div className="footer-content-socials">
          <a href="https://www.instagram.com/digital.kultura">
            <div>
              <img src={instagramLogo} alt="Digital Kultura Instagram Link" />
            </div>
          </a>
          <a href="">
            <div>
              <img src={telegramLogo} alt="Digital Kultura Telegram Link" />
            </div>
          </a>
        </div>
        <div className="footer-content-language" onClick={handleSwitchLanguage}>RU / ENG</div>
        <div className="footer-content-copyright">© {literalContent.copyright[language]}</div>
        <a className="footer-content-policy" href="">{literalContent.privacyPolicy[language]}</a>
      </div>
    </footer>
  );
};
