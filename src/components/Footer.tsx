import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="mt-auto py-6 px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto text-center">
        <p className="text-gray-400 mb-2">{t('copyright')}</p>
        <div className="flex justify-center gap-4">
          <a
            href="https://sunset-media.ru/sunset-media-privacy.html"
            className="text-primary hover:text-primary/80 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('privacyPolicy')}
          </a>
          <a
            href="https://sunset-media.ru/sunset-media-terms.html"
            className="text-primary hover:text-primary/80 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('termsOfUse')}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;