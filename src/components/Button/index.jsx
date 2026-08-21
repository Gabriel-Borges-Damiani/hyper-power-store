import styles from "./button.module.css";

export const Button = ({
  children,
  className,
  href,
  altBtn,
  outline,
  ...rest
}) => {
  const getClassName = () => {
    const classBase = altBtn
      ? styles.altBtn
      : outline
        ? styles.outline
        : styles.btn;
    return `${classBase} ${className}`.trim();
  };

  if (href) {
    return (
      <a href={href} className={getClassName()}>
        {children}
      </a>
    );
  }

  return (
    <button className={getClassName()} {...rest}>
      {children}
    </button>
  );
};
