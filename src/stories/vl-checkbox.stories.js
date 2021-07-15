import { html } from 'lit-html';
import '../vl-checkbox';
import '../style.css';

export default {
  title: 'Components/vl-checkbox',
};

export const Default = ({ label }) => html`<vl-checkbox data-vl-label=${label}></vl-checkbox>`;

Default.args = { label: 'Label' };
