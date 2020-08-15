import React from "react";
import styles from "../../stylesheets/components/title.module.scss";
import cx from "classnames";
const Title = (props) => {
  const { title } = props;
  const _className = cx(styles.container);
  return <div className={_className}>{title}</div>;
};

export default Title;
