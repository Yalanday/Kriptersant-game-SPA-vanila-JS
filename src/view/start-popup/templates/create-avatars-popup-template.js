export const createAvatarsPopupTemplate = ({ gender }) => {
  return `<div class="start-popup__container">
            <h2 class="start-popup__title">Выбери аватар</h2>
            <div class="start-popup__avatar-buttons">
                <button class="avatar-button" data-number="1" type="button">
                    <img src="/images/avatars/${gender}-1.jpg" alt="">
                </button>
                <button class="avatar-button" data-number="2" type="button">
                    <img src="/images/avatars/${gender}-2.jpg" alt="">
                </button>
                <button class="avatar-button" data-number="3" type="button">
                    <img src="/images/avatars/${gender}-3.jpg" alt="">
                </button>
                <button class="avatar-button" data-number="4" type="button">
                    <img src="/images/avatars/${gender}-4.jpg" alt="">
                </button>
            </div>
          </div>`
}
