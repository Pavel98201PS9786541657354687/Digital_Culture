import "./style.scss";
import liveLogoLetters from "@/assets/live-logo-letters.webm";
import liveLogoEye from "@/assets/live-logo-eye.webm";
import telegramLogo from "@/assets/telegram-logo-fill.svg";
import instagramLogo from "@/assets/instagram-logo-fill.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="gradient"></div>
      <div className="footer-content">
        <div className="footer-content-logo" onClick={() => navigate("/")}>
          <video width="8%" autoPlay loop muted>
            <source src={liveLogoEye} type="video/webm" />
            Ваш браузер не поддерживает видео.
          </video>
          <video className="footer-content-logo__letters" width="45%" autoPlay loop muted>
            <source src={liveLogoLetters} type="video/webm" />
            Ваш браузер не поддерживает видео.
          </video>
        </div>
        <div className="footer-content-phone">+7 (961) 965-05-00</div>
        <div className="footer-content-socials">
          <a href="">
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
        <div className="footer-content-language">RU / ENG</div>
        <div className="footer-content-copyright">© ООО "Макларенс" 2025. Все права защищены.</div>
        <a className="footer-content-policy" href="">Политика обработки персональных данных</a>
      </div>
    </footer>
  );
};
