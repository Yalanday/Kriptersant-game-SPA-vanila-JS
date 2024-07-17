export const createNameUserTemplate = ({name, gender}) => {
  let nameValue;
  name === '' && gender === 'man' ? nameValue = 'Криптопоцык' : nameValue = 'Криптоняшка';
  if (name !== '') { nameValue = name;}
  return `<span class="footer__name-user">${nameValue}</span>`;
}

