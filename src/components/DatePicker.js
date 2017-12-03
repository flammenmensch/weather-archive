import Component from '../core/Component';

export default class DatePicker extends Component {
  constructor({
    min = undefined,
    max = undefined,
    selectedValue = null,
    onChange = () => ({})
  } = {}) {
    super();
    this.state = { min, max, selectedValue, onChange };
  }
  handleChange(event) {
    this.state.onChange(event);
  }
  render() {
    return `
      <input
        class="date-picker"
        type="date"
        value="${this.state.selectedValue}"
        min="${this.state.min}"
        max="${this.state.max}"
        oninput="${this.getSelf()}.handleChange(event)"
      >
    `;
  }
};
