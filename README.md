# Система управления временем по методу Pomodoro
    Трекер Помодоро - это метод управления временем, в котором работа разбивается на интервалы 
    (обычно 25 минут) называемые "помидорами", с последующим коротким перерывом. После определенного 
    числа помидоров следует более длительный перерыв. Трекер помодоро помогает повысить продуктивность 
    и поддерживать концентрацию.
# Запуск проекта, рекомендации
    1. npm i
    2. npm start
    3. Для ускоренного тестирования приложения рекомендую зайти в настройки и нажать кнопку DEV_MODE.
    Она выставит длительность задачи 4 сек., короткий перерыв 3 сек., длинный 7 сек.
# Технологии
    - исходное приложение creacte-react-app
    - стейт менеджер Redux
    - TypeScript
# Что умеет приложение:
    - При первом запуске приложения у пользователя спросят, можно ли отправлять уведомления ему. Уведомления представляют с собой умеренной громкости звонок и браузерное уведомление (если такое есть) о том, что время таймера закончилось.
    - На главной странице пользователь видит инпут для ввода названия задачи. Инпут с валидацией. По клику на кнопку "Добавить" создатся задача с введенным названием. Дефолтные настройки это 1 помидор длительностью в 25 минут. Задача создатся по определенному типу и запушится в массив store. Id задачи присваивается через утилиту randomString. В рамках этого приложения этого более чем достаточно.
    - Задачу можно редактировать через специальное меню справа от названия задачи. Задачу можно переименовать, инпут работает так же с валидацией. Задаче можно добавить помидор, убрать его, удалить, а так же поднять или опустить в очереди задач.
    - Помидор так же можно добавить по кнопке "+" на таймере.
    - При запуске таймера, запускается setInterval. Каждую секунду в store происходит обновление оставшегося времени в задаче, таймер отображает данные из store. Id setInterval-а записывается, чтобы корректно останавливать таймер, защищая приложение от багов. Остановка таймера происходит при перемещении задачи, удалении задачи, при переходе пользователя на другую страницу приложения. Запись в store необходима для корректного отображения данных в любой момент времени при любом состоянии, в следующих версиях будет сохранение и загрузка данных с помощью local storage.
    - Кнопка "Стоп" остановит таймер и сбросит время на изначальное.
    - Кнопка "Пауза" остановит таймер задачи и запустит таймер паузы. Он работает фоном и считает время на паузе для статистики "фокуса". Работает по принципу таймера задачи.
    - Во время паузы вместо кнопки "Стоп" появляется кнопка "Сделано", при нажатии на нее задача считается полностью выполненной вне зависимости от оставшегося времени и количества оставшихся помидорок.
    - По истичению времени задачи срабатывает уведомление - звук и системный баннер (если он есть). Происходит проверка на наличие следующей задачи или помидора в текущей, если он\она есть, состояние приложение через store переходит в "время перерыва". Время перерыва реагирует на количество предыдущих коротких перерывов, в зависимости от кол-ва коротких перевывов ПОДРЯД, появится длинный перерыв. Если наступает момент, когда задача выполняется, а следующей нет, счетчик перерывов сбрасывается. Это нужно, чтобы учитывать, что пользователь может сидеть с открытым приложением без задач например 2 часа, и получить длинный перерыв после первого же помидора.
    - Таймер перерыва работает точно так же, как и два других таймера, только сбросить время перерыва нельзя, чтобы не затягивать отдых пользователя, зато перерыв можно пропустить.
    - Настройки. Пользователь может выбрать продолжительность помидора, короткого и длинного перерывов. В инпутах пользователь увидит текущие параметры. Если пользователь поставит 0 или оставит поле пустым и применит настройку, то длительность не поменяется. Настройки отображаются и меняются так же в store.
    - DEV_MODE. Кнопка, которая выставит длительность помидора 4 секунды, короткий перерыв 3 секунды, длинный перерыв 7 секунд. Это нужно для меня и моего потенциального работодателя, который сможет быстро оценить работу приложения с такими короткими интервалами.
    - Статистика. В данной версии приложения создается фейковая статистика с середины декабря по вчерашний день, чтобы можно было понажимать на селект и дни недели. Она местами нереалистична, но в будущей версии с local storage фейковая статистика будет не нужна. Статистика рисуется из store из объектов определенного типа. Во время работы пользователя с таймером всегда производится проверка на объект с текущей датой, чтобы действия пользователя регистрировались по датам корректно.
# Над чем работаю дальше:
    1. Рефакторинг, некоторые компоненты очень большие, код трудно поддерживать. Фикс багов (пока писал, заметил, что отрицательное число в параметрах сломает таймер).
    1. Приложение доступно пока что только в десктопной версии, скоро будет адаптивная версия.
    2. Сохранение данных в local storage для сбора актуальной статистики.
    3. Анимация, возможность использовать английскую версию, возможность использовать темную тему.
