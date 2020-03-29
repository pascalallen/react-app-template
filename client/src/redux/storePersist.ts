import { RootState } from '@/types/redux';
import { AnyObject } from '@/types/common';

const saveState = (rootState: RootState): void => {
  try {
    const stateToPersist: AnyObject = {};
    const serializedState = JSON.stringify(stateToPersist);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    // Ignore write errors
  }
};

const loadState = (): AnyObject | undefined => {
  try {
    const serializedState = localStorage.getItem('state');

    if (!serializedState) {
      return undefined;
    }

    const state = JSON.parse(serializedState);
    return state ? state : undefined;
  } catch (error) {
    return undefined;
  }
};

export default Object.freeze({
  saveState,
  loadState
});
