import React from "react";
import PropTypes from "prop-types";
import styles from "../../stylesheets/components/subcomponents/image.module.scss";
import cx from "classnames";
const Svg = (props) => {
  const { imgSrc, label, className, input, standard } = props;
  const _className = cx(
    className,
    styles.svg,
    { [styles.input]: input },
    { [styles.standard]: standard }
  );
  return (
    <div className={_className}>
      <img src={imgSrc} alt={label} />
    </div>
  );
};

Svg.propTypes = {
  imgSrc: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  input: PropTypes.bool,
  standard: PropTypes.bool,
};

Svg.defaultProps = {
  imgSrc: "",
  label: "",
  className: "",
  input: false,
  standard: false,
};

export default Svg;
