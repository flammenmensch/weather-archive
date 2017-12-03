import * as actionTypes from '../constants/actionTypes';
import * as chartService from '../services/chartService';
import {load} from '../services/dbService';

import Chart from './Chart';
import DatePicker from './DatePicker';
import RadioButtonGroup from './RadioButtonGroup';

const CHART_WIDTH = 500;
const CHART_HEIGHT = 500;

const createPoints = chartService.getPoints(CHART_WIDTH, CHART_HEIGHT);

export default (props) => {
  const buttons = new RadioButtonGroup({
    items: props.buttons,
    name: props.buttonGroupName,
    selectedValue: props.selectedDataSet,
    onChange: (event) => {
      const dataSet = event.target.value;
      load(dataSet)
        .then((data) => {
          props.dispatch({ type: actionTypes.UPDATE_DATA_TYPE, payload: {
            dataSet: data,
            selectedDataSet: dataSet
          }});
        })
    }
  });

  const startDate = new DatePicker({
    min: props.minDate,
    max: props.maxDate,
    selectedValue: props.selectedStartDate,
    onChange: (event) => {
      props.dispatch({ type: actionTypes.UPDATE_START_DATE, payload: event.target.value });
    }
  });

  const endDate = new DatePicker({
    min: props.minDate,
    max: props.maxDate,
    selectedValue: props.selectedEndDate,
    onChange: (event) => {
      props.dispatch({ type: actionTypes.UPDATE_END_DATE, payload: event.target.value });
    }
  });

  const chart = new Chart({
    width: CHART_WIDTH,
    height: CHART_HEIGHT,
    points: createPoints(props.dataSet, props.selectedStartDate, props.selectedEndDate)
  });

  return `
    <div class="button-container">${buttons.render()}</div>
    <div class="container container--vertical">
      <div class="date-container">${startDate.render()}${endDate.render()}</div>
      <div class="chart-container">
        ${chart.render()}
      </div>
    </div>
  `;
};
