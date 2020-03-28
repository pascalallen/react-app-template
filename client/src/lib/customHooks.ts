/***
 ** THIS METHODS CAN ONLY BE CALLED INSIDE THE BODY OF A REACT FUNCTIONAL COMPONENT
 ***/

import { useEffect, useRef, EffectCallback, DependencyList } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { AnyObject } from '@/types/common';

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const useMatch = () => {
  const match: {
    path: string;
    url: string;
    isExact: boolean;
    params: AnyObject;
  } = useRouteMatch();
  return match;
};

export const useDidUpdateEffect = (effect: EffectCallback, deps?: DependencyList): void => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      effect();
    } else {
      didMountRef.current = true;
    }
  }, deps);
};
