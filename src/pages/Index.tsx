import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/VideoPlayer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleUrlSubmit = () => {
    if (!url.includes('stream.sunset-media.ru')) {
      toast({
        variant: "destructive",
        title: t('invalidUrl'),
      });
      return;
    }
    setVideoUrl(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (!content.includes('stream.sunset-media.ru')) {
          toast({
            variant: "destructive",
            title: t('invalidUrl'),
          });
          return;
        }
        // Here you would parse the M3U file and extract the first valid URL
        // For now, we'll just set a demo URL
        setVideoUrl('https://stream.sunset-media.ru/demo.m3u8');
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-2">{t('enterPlaylist')}</h1>
          <p className="text-center text-gray-400 mb-8">{t('attention')}</p>
          
          <VideoPlayer url={videoUrl} />
          
          <div className="mt-8 space-y-4">
            <div className="flex gap-4">
              <Input
                type="url"
                placeholder="https://stream.sunset-media.ru/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleUrlSubmit} className="bg-primary hover:bg-primary/80">
                {t('uploadPlaylist')}
              </Button>
            </div>
            
            <div className="text-center">
              <Input
                type="file"
                accept=".m3u,.m3u8"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button
                onClick={() => document.getElementById('file-upload')?.click()}
                variant="outline"
                className="w-full max-w-md"
              >
                {t('chooseFile')}
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;