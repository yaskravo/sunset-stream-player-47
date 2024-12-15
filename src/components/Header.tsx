import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Header = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'ru', name: 'Русский' },
    { code: 'uk', name: 'Українська' },
    { code: 'kk', name: 'Қазақша' },
    { code: 'uz', name: "O'zbek" },
  ];

  return (
    <header className="flex justify-between items-center p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center">
        <img src="/lovable-uploads/177b836e-40dd-484b-b5fd-c49143ffe74e.png" alt="SUNSET PLAYER" className="h-8" />
      </div>
      <Select onValueChange={(value) => i18n.changeLanguage(value)} defaultValue={i18n.language}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </header>
  );
};

export default Header;