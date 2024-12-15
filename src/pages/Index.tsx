import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoPlayer from '@/components/VideoPlayer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

interface Channel {
  name: string;
  url: string;
  logo?: string;
}

const Index = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [channels, setChannels] = useState<Channel[]>([]);

  const parseM3UContent = (content: string) => {
    const lines = content.split('\n');
    const channels: Channel[] = [];
    let currentChannel: Partial<Channel> = {};

    lines.forEach((line) => {
      if (line.startsWith('#EXTINF:')) {
        const nameMatch = line.match(/tvg-name="([^"]*)"/) || line.match(/,(.+)$/);
        const logoMatch = line.match(/tvg-logo="([^"]*)"/);
        
        currentChannel.name = nameMatch ? nameMatch[1] : 'Unknown Channel';
        currentChannel.logo = logoMatch ? logoMatch[1] : undefined;
      } else if (line.trim().startsWith('http')) {
        currentChannel.url = line.trim();
        if (currentChannel.url && currentChannel.name) {
          channels.push(currentChannel as Channel);
        }
        currentChannel = {};
      }
    });

    return channels;
  };

  const handleUrlSubmit = async () => {
    if (!url.includes('stream.sunset-media.ru')) {
      toast({
        variant: "destructive",
        title: t('invalidUrl'),
      });
      return;
    }

    try {
      const response = await fetch(url);
      const content = await response.text();
      const parsedChannels = parseM3UContent(content);
      setChannels(parsedChannels);
      if (parsedChannels.length > 0) {
        setVideoUrl(parsedChannels[0].url);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error loading playlist",
      });
    }
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
        const parsedChannels = parseM3UContent(content);
        setChannels(parsedChannels);
        if (parsedChannels.length > 0) {
          setVideoUrl(parsedChannels[0].url);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-white">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
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

            {channels.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {channels.map((channel, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setVideoUrl(channel.url)}
                    className={`p-4 rounded-lg ${
                      videoUrl === channel.url ? 'bg-primary' : 'bg-gray-800'
                    } hover:bg-primary/80 transition-colors`}
                  >
                    {channel.logo && (
                      <div className="w-16 h-16 mx-auto mb-2 overflow-hidden rounded-lg">
                        <img 
                          src={channel.logo} 
                          alt={channel.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                    )}
                    <p className="text-sm text-center truncate">{channel.name}</p>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;