# Інструкція з запуску

### Попередні вимоги
* Node.js (LTS)
* Запущений Android-емулятор в Android Studio

### Запуск проєкту

1. Перейдіть у папку проєкту:
   cd lab3 

Встановіть залежності та тунель:


npm install
npm install @expo/ngrok --save-dev

Запустіть сервер розробки:


npx expo start --tunnel

Після завантаження Metro Bundler натисніть клавішу a в терміналі для автоматичного відкриття застосунку на емуляторі.

Скріншоти виконання

![Click](./screenshots/click.png)
![Dark theme](./screenshots/dark.png)
![Light theme](./screenshots/light.png)
![Pinch](./screenshots/pinch.png)
![Tasks](./screenshots/tasks.png)