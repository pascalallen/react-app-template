import React from 'react';

type Props = {
  color?: string;
  height?: string;
  thickness?: number;
  width?: string;
};

const LoadingCat = (props: Props) => {
  const { color = '#000000', height = '150px', thickness = 15, width = '150px' } = props;

  return (
    <div className="loading-cat-container d-flex align-items-center justify-content-center">
      <svg
        className="loading-cat-svg"
        id="loading-cat-svg"
        height={height}
        pathLength="1000"
        speed="1s"
        version="1.1"
        viewBox="0 0 336 380"
        width={width}>
        <g
          fill="none"
          fillRule="evenodd"
          id="cat-outline"
          stroke="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1">
          <path
            className="cat-head-outline"
            d="M316.697571,130.872572 C311.485306,91.8946978 306.270989,52.9147813 301.058724,13.9369071 C300.436946,9.05777993 293.989334,7.24827526 290.685497,11.0265864 L206.969137,97.8950643 C204.732378,100.484739 201.395707,101.98381 197.874351,101.98381 L167.778652,101.98381 L137.680901,101.98381 C134.159544,101.98381 130.822874,100.484739 128.586115,97.8950643 L44.8697551,11.0265864 C41.565918,7.24827526 35.1183054,9.05777993 34.4965274,13.9369071 C29.2842626,52.9147813 24.0699458,91.8946978 18.857681,130.874614 C12.734296,176.647321 1.90550811,221.531615 15.6769683,267.075581 C26.7581611,303.717029 51.3132635,333.626957 85.2832756,351.619887 C110.451948,364.954262 139.141977,371.32429 167.778652,370.987306 C196.413275,371.32429 225.103304,364.954262 250.271976,351.621929 C284.420518,333.530967 309.427077,301.135524 320.651915,264.528795 C334.253053,220.165296 322.662946,175.470939 316.697571,130.872572 Z"
            id="cat-stroke-outline"
            stroke={color}
            strokeWidth={thickness}
          />
        </g>
      </svg>
    </div>
  );
};

export default LoadingCat;
