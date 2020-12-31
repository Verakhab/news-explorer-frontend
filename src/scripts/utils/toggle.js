const toggle = (elOne, elTwo) => {
  elOne.style.display = (elOne.style.display === 'none') ? 'block' : 'none';
  elTwo.style.display = (elTwo.style.display === 'block') ? 'none' : 'block';
};

export default toggle;
