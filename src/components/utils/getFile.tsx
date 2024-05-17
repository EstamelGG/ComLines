import React, { useState, useEffect } from 'react';

export function useFetchTextFile(url: string): string {
  const [text, setText] = useState<string>('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const text = await response.text();
        setText(text);
      } catch (error) {
      }
    };

    fetchData();
  }, [url]);

  return text;
}