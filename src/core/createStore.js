export default (reducer, onStoreUpdate, initialState={}) => {

  const dispatch = (action) => {
    console.groupCollapsed(`Dispatch action "${action.type}"`, action.payload);
    console.log('Previous state:', state);
    state = reducer(state, action);
    console.log('Next state:', state);
    console.groupEnd();
    onStoreUpdate(state);
  };

  const getState = () => {
    return state;
  };

  let state = { ...initialState, dispatch };

  return {
    dispatch, getState
  };
};
