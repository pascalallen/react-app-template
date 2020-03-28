import React, { ReactNode } from 'react';
import Footer from '@/components/Footer/Footer';

type Props = {
  name: string;
  children: ReactNode;
  showFooter?: boolean;
};

const PageContainer = (props: Props) => {
  const { name, children, showFooter = true } = props;

  return (
    <div className="page-container d-flex min-vh-100 flex-column overflow-auto">
      <div id={`${name}-container`} className={`container page-content-container ${name}-container flex-fill-shrink-0`}>
        {children}
      </div>
      {showFooter ? (
        <div className="page-footer-container flex-shrink-0">
          <Footer />
        </div>
      ) : null}
    </div>
  );
};

export default PageContainer;
