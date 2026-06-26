import styles from "./header.module.css";
import logo from "../../assets/logo-hyper-powerr.png";
import { HearthIcon } from "../HearthIcon/index.jsx";
import { CarIcon } from "../CarIcon/index.jsx";
import { UserIcon } from "../UserIcon/index.jsx";
import { SearchBar } from "../SearchBar/index.jsx";
import { CepIcon } from "../CepIcon/index.jsx";
import { ArrowIcon } from "../ArrowIcon/index.jsx";

export const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.topLogo} src={logo} alt="Blue Control logo" />
      <div className={styles.topIcons}>
        <HearthIcon></HearthIcon>
        <CarIcon></CarIcon>
        <UserIcon></UserIcon>
      </div>
      <div className={styles.middle}>
        <SearchBar></SearchBar>
      </div>
      <div className={styles.bottom}>
        <CepIcon></CepIcon>
        <button className={styles.cepButton}>Digite seu CEP</button>
        <ArrowIcon></ArrowIcon>
      </div>
    </header>
  );
};
