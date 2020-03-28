import React from 'react';
import classnames from 'classnames';

type Props = {
  id: string;
  title: string;
  text: string | number;
  href?: string;
  active?: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

const MenuCardButton = (props: Props) => {
  const { id, title, text, href, active = false, onClick } = props;

  return (
    <a
      id={id}
      className={classnames(
        'cursor-pointer',
        'menu-card-button',
        'd-flex',
        'flex-column',
        'w-100',
        'rounded-lg',
        active ? 'bg-primary text-white border-primary' : 'bg-transparent'
      )}
      href={href}
      onClick={event => {
        event.preventDefault();
        onClick(event);
      }}>
      <span className="title font-size-md font-weight-bold">{title}</span>
      <span className="text font-size-sm">{text}</span>
    </a>
  );
};

export default MenuCardButton;
