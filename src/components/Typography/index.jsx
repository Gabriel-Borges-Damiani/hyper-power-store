import styles from "./typography.module.css";

const Typography = ({
  variant = "body",
  className = "",
  children,
  color,
  ...props
}) => {
  const getClassName = () => {
    const classBase = styles[variant] || styles.body;
    return `${classBase} ${className}`.trim();
  };

  const getStyle = () => {
    const style = {};

    const colorValue = color ? `var(${color})` : "var(--light-gray)";
    style["--typography-color"] = colorValue;

    return style;
  };

  const Tag = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(variant)
    ? variant
    : variant === "bold"
      ? "strong"
      : "p";

  return (
    <Tag className={getClassName()} style={getStyle()} {...props}>
      {children}
    </Tag>
  );
};

export default Typography;
