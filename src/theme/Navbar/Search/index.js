import React from 'react';
import styles from './styles.module.css';

export default function NavbarSearch({children, className}) {
  return <div className={`${className} ${styles.searchBox}`}>{children}</div>;
}
