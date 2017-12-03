import Component from '../core/Component';

const createRadioButtons = (items, name, selectedValue, handler) =>
  items
    .map((item, index) =>
      `<label for="radio-${index}">
        <input
          onchange="${handler}"
          id="radio-${index}"
          type="radio"
          name="${name}"
          value="${item.value}"
          ${selectedValue === item.value ? 'checked' : ''}
        >
        ${item.label}
       </label>
      `
    )
    .join('');

export default class RadioButtonGroup extends Component {
  constructor({ items=[], name='', selectedValue=null, onChange=()=>({}) } = { }) {
    super();
    this.state = { items, name, onChange, selectedValue };
  }
  handleChange(event) {
    this.state.onChange(event);
  }
  render() {
    const {items, name, selectedValue} = this.state;
    return `
      ${createRadioButtons(items, name, selectedValue, `${this.getSelf()}.handleChange(event)`)}
    `
  }
};
