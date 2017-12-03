import createStore from './core/createStore';
import reducer from './reducers';

import {load} from './services/dbService';

import App from './components/App';

const PRECIPITATION = 'precipitation';
const TEMPERATURE = 'temperature';

const makeRenderer = (Component) => (state={}) =>
  document.querySelector('#app').innerHTML = Component(state);

const init = () => {
  const update = makeRenderer(App);
  const initialDataSet = TEMPERATURE;

  load(initialDataSet)
    .then((data) => {
      const minDate = data[0].t;
      const maxDate = data[data.length - 1].t;
      const initialState = {
        buttons: [
          { label: 'Temperature', value: TEMPERATURE },
          { label: 'Precipitation', value: PRECIPITATION }
        ],
        buttonGroupName: 'dataSet',
        selectedDataSet: initialDataSet,
        selectedStartDate: minDate,
        selectedEndDate: maxDate,
        dataSet: data,
        minDate,
        maxDate
      };

      const store = createStore(reducer, update, initialState);

      update(store.getState());
    });
};

init();
