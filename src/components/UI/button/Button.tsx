import React, { ButtonHTMLAttributes } from 'react';
import './Button.styles.scss';

const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in',
  inverted: 'inverted',
};

type BtnProps = {
  buttonType: keyof typeof BUTTON_TYPE_CLASSES;
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, buttonType, ...otherProps }: BtnProps) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
