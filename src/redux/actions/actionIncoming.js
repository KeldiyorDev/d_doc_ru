import { dispatch } from '../store';
import { EXECUTION_INFORMATION_ID } from '../types';

export const getDataExecution = (data) => {
    dispatch({ type: EXECUTION_INFORMATION_ID, payload: data });
};