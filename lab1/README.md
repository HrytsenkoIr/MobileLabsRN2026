# Інструкція з запуску

### Попередні вимоги
* Node.js (LTS)
* Запущений Android-емулятор в Android Studio

### Запуск проєкту

1. Перейдіть у папку проєкту:
cd lab1

Встановіть залежності та тунель:


npm install
npm install @expo/ngrok --save-dev

Запустіть сервер розробки:


npx expo start --tunnel

Після завантаження Metro Bundler натисніть клавішу a в терміналі для автоматичного відкриття застосунку на емуляторі.

Скріншоти виконання

![Головна](./screenshots/home.png)
![Фотогалерея](./screenshots/gallery.png)
![Профіль](./screenshots/profile.png)