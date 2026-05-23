# Інструкція з запуску

### Попередні вимоги
* Node.js (LTS)
* Запущений Android-емулятор в Android Studio

### Запуск проєкту

1. Перейдіть у папку проєкту:
   cd lab5

Встановіть залежності та тунель:


npm install
npm install @expo/ngrok --save-dev

Запустіть сервер розробки:


npx expo start --tunnel

Після завантаження Metro Bundler натисніть клавішу a в терміналі для автоматичного відкриття застосунку на емуляторі.

Скріншоти виконання

![Login](./screenshots/login.png)
![Register](./screenshots/register.png)
![Information about product](./screenshots/prod_info.png)
![List of products](./screenshots/list_prod.png)
