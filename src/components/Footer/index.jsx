import styles from "./footer.module.css";
import { FacebookIcon } from "../FacebookIcon";
import { InstagramIcon } from "../InstagramIcon";
import { TwitterIcon } from "../TwitterIcon";
import { LinkedinIcon } from "../LinkedinIcon";

export const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div>
          <h4>Informações</h4>
          <p>Sobre nós</p>
          <p>Termos de Serviço</p>
          <p>Política de Privacidade</p>
          <p>Ajuda</p>
        </div>
        <div>
          <h4>Contato</h4>
          <p>Email: hyperpower@loja.com</p>
          <p>Telefone: (11) 1233-2586</p>
        </div>
        <div>
          <h4>Siga-nos</h4>
          <div className={styles.socialIcons}>
            <InstagramIcon></InstagramIcon>
            <TwitterIcon></TwitterIcon>
            <FacebookIcon></FacebookIcon>
            <LinkedinIcon></LinkedinIcon>
          </div>
        </div>
        <div className={styles.thanks}>
          <h4>Obrigado pela preferência!</h4>
          <p>
            Estamos felizes por tê-lo como <br /> cliente!
          </p>
        </div>
      </footer>
      <div className={styles.footerCopyright}>
        <p>@2026 Hyper Power Store. Todos os direitos reservados.</p>
      </div>
    </>
  );
};
