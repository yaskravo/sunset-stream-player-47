import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      enterPlaylist: "Enter a link to the playlist or upload an M3U file",
      attention: "Attention! Only playlists from Sunset are supported",
      uploadPlaylist: "Upload Playlist",
      chooseFile: "Choose File",
      privacyPolicy: "Privacy Policy",
      termsOfUse: "Terms of Use",
      copyright: "© 2024 Sunset Media. All rights reserved.",
      invalidUrl: "Error: Only URLs from stream.sunset-media.ru are supported",
    },
  },
  ru: {
    translation: {
      enterPlaylist: "Введите ссылку на плейлист или загрузите файл M3U",
      attention: "Внимание! Поддерживаются только плейлисты от Sunset",
      uploadPlaylist: "Загрузить плейлист",
      chooseFile: "Выбрать файл",
      privacyPolicy: "Политика конфиденциальности",
      termsOfUse: "Условия использования",
      copyright: "© 2024 Sunset Media. Все права защищены.",
      invalidUrl: "Ошибка: Поддерживаются только URL с stream.sunset-media.ru",
    },
  },
  uk: {
    translation: {
      enterPlaylist: "Введіть посилання на плейлист або завантажте файл M3U",
      attention: "Увага! Підтримуються тільки плейлисти від Sunset",
      uploadPlaylist: "Завантажити плейлист",
      chooseFile: "Вибрати файл",
      privacyPolicy: "Політика конфіденційності",
      termsOfUse: "Умови використання",
      copyright: "© 2024 Sunset Media. Всі права захищені.",
      invalidUrl: "Помилка: Підтримуються тільки URL з stream.sunset-media.ru",
    },
  },
  kk: {
    translation: {
      enterPlaylist: "Плейлист сілтемесін енгізіңіз немесе M3U файлын жүктеңіз",
      attention: "Назар аударыңыз! Тек Sunset плейлисттері қолдау көрсетіледі",
      uploadPlaylist: "Плейлистті жүктеу",
      chooseFile: "Файлды таңдау",
      privacyPolicy: "Құпиялылық саясаты",
      termsOfUse: "Қолдану шарттары",
      copyright: "© 2024 Sunset Media. Барлық құқықтар қорғалған.",
      invalidUrl: "Қате: Тек stream.sunset-media.ru URL-дері қолдау көрсетіледі",
    },
  },
  uz: {
    translation: {
      enterPlaylist: "Pleylist havolasini kiriting yoki M3U faylini yuklang",
      attention: "Diqqat! Faqat Sunset pleylisatlari qo'llab-quvvatlanadi",
      uploadPlaylist: "Pleylistni yuklash",
      chooseFile: "Faylni tanlash",
      privacyPolicy: "Maxfiylik siyosati",
      termsOfUse: "Foydalanish shartlari",
      copyright: "© 2024 Sunset Media. Barcha huquqlar himoyalangan.",
      invalidUrl: "Xato: Faqat stream.sunset-media.ru URL-lari qo'llab-quvvatlanadi",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;