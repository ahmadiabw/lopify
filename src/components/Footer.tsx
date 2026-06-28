import React from 'react';
import styles from './Footer.module.css';
import { GENERAL_CONFIG } from '../config/apps';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <span className={styles.boldText}>{GENERAL_CONFIG.title}</span>
        <span className={styles.separator}>|</span>
        <span>{GENERAL_CONFIG.copyright}</span>
      </div>
    </footer>
  );
}
