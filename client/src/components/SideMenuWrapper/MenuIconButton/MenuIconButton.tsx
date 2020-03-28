import React from 'react';
import classnames from 'classnames';

type Props = {
  id: string;
  href?: string;
  className?: string;
  iconClassName: string;
  text: string;
  textClassName?: string;
  active?: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

const MenuIconButton = (props: Props) => {
  const {
    id,
    href,
    iconClassName,
    className = '',
    text,
    textClassName = '',
    active = false,
    onClick = () => {}
  } = props;

  return (
    <a
      id={id}
      className={classnames(
        'cursor-pointer',
        'icon-button',
        'border-0',
        'd-flex',
        'align-items-center',
        'justify-content-start',
        className,
        active ? 'active' : ''
      )}
      href={href}
      onClick={event => {
        event.preventDefault();
        onClick(event);
      }}>
      <span className={classnames('button-icon', 'font-size-lg', iconClassName)} />
      <span className={classnames('button-text', 'font-size-sm', 'font-weight-bold', textClassName)}>{text}</span>
    </a>
  );
};

export default MenuIconButton;
