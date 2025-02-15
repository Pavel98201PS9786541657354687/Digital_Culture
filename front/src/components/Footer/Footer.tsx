import "./style.scss";
import telegramLogo from "../../assets/telegram-logo-fill.svg";
import instagramLogo from "../../assets/instagram-logo-fill.svg";
import liveLogoEyeGif from "../../assets/live-logo-eye-2.gif";
import liveLogoLettersGif from "../../assets/live-logo-letters-2.gif";
import { useNavigate } from "react-router";
import { literalContent } from "../../constants";

type Props = {
  handleSwitchLanguage: () => void;
  language: "ru" | "eng";
}

export const Footer = (props: Props) => {
  const { language, handleSwitchLanguage } = props;

  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="gradient"></div>
      <div className="footer-content">
        <div className="footer-content-logo" onClick={() => navigate("/")}>
          <img className="footer-content-logo__eye" src={liveLogoEyeGif} alt="" />
          <img className="footer-content-logo__letters" src={liveLogoLettersGif} alt="" />
        </div>
        <a href="tel:+79619650500" className="footer-content-phone">+7 (961) 965-05-00</a>
        <div className="footer-content-socials">
          <a href="https://www.instagram.com/digital.kultura" target="_blank">
            <div>
              <img src={instagramLogo} alt="Digital Kultura Instagram Link" />
            </div>
          </a>
          <a href="https://t.me/digital_kultura" target="_blank">
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
