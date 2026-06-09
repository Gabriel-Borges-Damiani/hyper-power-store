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
          <h3>Informações</h3>
          <p>Sobre nós</p>
          <p>Termos de Serviço</p>
          <p>Política de Privacidade</p>
          <p>Ajuda</p>
        </div>
        <div>
          <h3>Contato</h3>
          <p>Email: hyperpower@loja.com</p>
          <p>Telefone: (11) 1233-2586</p>
        </div>
        <div>
          <h3>Siga-nos</h3>
          <div className={styles.socialIcons}>
            <InstagramIcon></InstagramIcon>
            <TwitterIcon></TwitterIcon>
            <FacebookIcon></FacebookIcon>
            <LinkedinIcon></LinkedinIcon>
          </div>
        </div>
        <div className={styles.thanks}>
          <h3>Obrigado pela preferência!</h3>
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
