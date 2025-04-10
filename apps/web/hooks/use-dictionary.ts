import { useState, useEffect } from 'react';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then(module => module.default),
  es: () => import('../dictionaries/es.json').then(module => module.default),
};

export const useDictionary = (locale: string = 'en') => {
  const [dictionary, setDictionary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        setLoading(true);
        const selectedLocale = locale in dictionaries ? locale : 'en';
        const dict = await dictionaries[selectedLocale as keyof typeof dictionaries]();
        setDictionary(dict);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadDictionary();
  }, [locale]);

  return { dictionary, loading, error };
};
