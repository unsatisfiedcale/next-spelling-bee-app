import React from "react";
import styles from "./styles.module.css";
import { CgBee } from "react-icons/cg";
import LanguageMenu from "../menu";




function Header() {
  return (
    <header className={`${styles.header} container fluid`}>
      <div className={styles.headerWrapper}>
      <div className={`${styles.logo} ${styles.spellingBee}`}>
          <CgBee /> SPELLING BEE
        </div>
        <nav className={styles.navigationMenu}>
        <LanguageMenu />
          </nav>
      </div>
    </header>
  );
}

export { Header };