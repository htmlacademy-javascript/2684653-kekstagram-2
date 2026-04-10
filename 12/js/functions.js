/**
 * Преобразует временную строку вида `'HH:MM:SS'` или `'HH:MM'` в секунды
 *
 * @param {string} timeString - Временная строка
 * @returns {number} Количество секунд
 */
const parseTime = (timeString) => {
  const splittedTime = timeString.split(':');

  let seconds = (parseInt(splittedTime[0], 10) * 60 * 60) + (parseInt(splittedTime[1], 10) * 60);

  if (splittedTime.length === 3) {
    seconds += splittedTime[2];
  }

  return seconds;
};

/**
 * Проверяет, вписывается ли встреча в рамки рабочего дня
 *
 * @param {string} dayStart - Начало рабочего дня
 * @param {string} dayEnd - Конец рабочего дня
 * @param {string} meetingStart - Начало встречи
 * @param {number} meetingDuration - Продолжительность встречи
 * @returns {boolean}
 */
const isMeetingOnSchedule = (dayStart, dayEnd, meetingStart, meetingDuration) => {
  const meetingStartTime = parseTime(meetingStart);

  return ((meetingStartTime >= parseTime(dayStart)) && ((meetingStartTime + meetingDuration * 60) <= parseTime(dayEnd)));
};

isMeetingOnSchedule('08:00', '17:30', '14:00', 90); // true
