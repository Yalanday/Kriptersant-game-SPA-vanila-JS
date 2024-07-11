export const createAvatarUserTemplate = ({ gender, avatar }) => {
    if (gender === null && avatar === null) {
        return `<span>
                  <img width="80" height="60" src="./images/avatars/default.jpg" alt="Аватар пользователя">
                </span>`;
    } else {
        return `<span>
        <img width="80" height="60" src="./images/avatars/${gender}-${avatar}.jpg" alt="Аватар пользователя">
      </span>`;
    }
}

