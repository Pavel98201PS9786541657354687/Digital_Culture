import "./style.scss";
import footerGradient from "@/assets/footer-gradient.png";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="gradient"></div>
      <div className="footer-content">
        <p>© 2023 Ваш сайт. Все права защищены.</p>
      </div>
    </footer>
  );
};
