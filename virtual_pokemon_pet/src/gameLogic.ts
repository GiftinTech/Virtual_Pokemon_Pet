// DOM
export const gameLogic = () => {
  const hunger = document.querySelector('.hunger') as HTMLProgressElement;
  const happiness = document.querySelector('.happiness') as HTMLProgressElement;
  const health = document.querySelector('.health') as HTMLProgressElement;

  const feedButton = document.getElementById('feedBtn') as HTMLButtonElement;
  const playButton = document.getElementById('playBtn') as HTMLButtonElement;
  const healButton = document.getElementById('healBtn') as HTMLButtonElement;

  const valueValidation = (value: number) => {
    const validate = value < 0 ? 0 : value > 100 ? 100 : value;
    return validate;
  };

  const updateProgressBar = (bar: HTMLProgressElement, changedValue: number) => {
    bar.value = valueValidation(bar.value + changedValue);

    const progressPercentage = document.getElementById(bar.id + 'Value') as HTMLSpanElement;
    if (progressPercentage) progressPercentage.textContent = bar.value + '%';
  };

  feedButton.addEventListener('click', () => {
    updateProgressBar(hunger, 20);
    updateProgressBar(happiness, 20);
  });

  playButton.addEventListener('click', () => {
    updateProgressBar(happiness, 20);
    updateProgressBar(hunger, -10);
    updateProgressBar(health, -20);
  });

  healButton.addEventListener('click', () => {
    updateProgressBar(health, 100);
    updateProgressBar(hunger, 100);
    updateProgressBar(happiness, 100);
  });

  setInterval(() => {
    updateProgressBar(health, -2);
    updateProgressBar(hunger, -1);
    updateProgressBar(happiness, -3);
  }, 4000);
};

export default gameLogic;
