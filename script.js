const targetDate = new Date('2025-06-26T00:00:00').getTime();

// Получаем элементы для отображения
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
        clearInterval(interval);
        document.querySelector('.countdown-container').innerHTML = 
            '<div class="countdown-item">Событие началось!</div>';
        return;
    }

    // Вычисление временных значений
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Обновление элементов с анимацией
    updateElement(daysElement, days);
    updateElement(hoursElement, hours);
    updateElement(minutesElement, minutes);
    updateElement(secondsElement, seconds);
}

function updateElement(element, newValue) {
    const currentValue = parseInt(element.innerText);
    if (currentValue !== newValue) {
        element.classList.add('animate');
        element.innerText = newValue < 10 ? `0${newValue}` : newValue;
        
        // Удаляем класс анимации после завершения
        setTimeout(() => {
            element.classList.remove('animate');
        }, 500);
    }
}

// Запускаем обновление каждую секунду
const interval = setInterval(updateCountdown, 1000);
// Первоначальный вызов для немедленного отображения
updateCountdown();


function createCalendar() {
    const grid = document.getElementById('calendarGrid');
    const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    
    // Очищаем сетку и добавляем заголовки
    grid.innerHTML = '';
    weekdays.forEach(day => {
        const header = document.createElement('div');
        header.className = 'weekday-header';
        header.textContent = day;
        grid.appendChild(header);
    });

    // Рассчитываем начало месяца
    const firstDayOfMonth = new Date(2025, 5, 1).getDay(); // 0 = воскресенье
    const startOffset = (firstDayOfMonth + 6) % 7; // Конвертируем в понедельник-воскресенье
    const totalDays = 30;
    
    // Добавляем пустые ячейки перед первым днем
    for(let i = 0; i < startOffset; i++) {
        grid.appendChild(document.createElement('div'));
    }

    // Добавляем дни месяца
    for(let day = 1; day <= totalDays; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = day;
        
        if(day === 26) {
            dayElement.classList.add('special-day');
        }
        
        grid.appendChild(dayElement);
    }

    // Добавляем оставшиеся пустые ячейки
    const totalCells = 42; // 6 недель
    const currentCells = grid.children.length - 7; // вычитаем заголовки
    for(let i = currentCells; i < totalCells; i++) {
        grid.appendChild(document.createElement('div'));
    }
}

createCalendar();