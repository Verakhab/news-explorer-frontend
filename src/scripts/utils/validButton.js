export default function validButton() {
  if (this.checkValidity()) {
    this.querySelector('[type=submit]')
      .setAttribute('style', 'background-color: #2F71E5; color: white; cursor: pointer');
    this.querySelector('[type=submit]').disabled = !this.checkValidity();
  } else {
    this.querySelector('[type=submit]')
      .removeAttribute('style', 'background-color: #2F71E5; color: white; cursor: pointer');
    this.querySelector('[type=submit]').disabled = !this.checkValidity();
  }
}
