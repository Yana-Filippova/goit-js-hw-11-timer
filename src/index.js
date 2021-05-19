import './styles.css';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = null;

    this.timerId = document.querySelector(`${this.selector}`);
    this.days = this.timerId.querySelector('[data-value="days"]');
    this.hours = this.timerId.querySelector('[data-value="hours"]');
    this.mins = this.timerId.querySelector('[data-value="mins"]');
    this.secs = this.timerId.querySelector('[data-value="secs"]');

    this.start();
  }

  start() {
    this.intervalId = setInterval(() => {
      const deltaTime = this.targetDate - Date.now();
      const time = this.getTimeRemaining(deltaTime);

      this.updateClock(time);

      if (deltaTime <= 0) {
        clearInterval(this.intervalId);
        const time = this.getTimeRemaining(0);

        this.updateClock(time);
      }
    }, 1000);
  }

  getTimeRemaining(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  updateClock({ days, hours, mins, secs }) {
    this.days.textContent = days;
    this.hours.textContent = hours;
    this.mins.textContent = mins;
    this.secs.textContent = secs;
  }
}

// Плагин это класс CountdownTimer, экземпляр которого создает новый таймер с настройками.

const timer1 = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Oct 05, 2021'),
});

const timer2 = new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date('Dec 31, 2021'),
});
