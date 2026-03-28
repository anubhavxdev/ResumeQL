import { useEffect } from 'react';

export const useDocumentTitle = (title) => {
  useEffect(() => {
    const defaultTitle = 'ResumeQL - AI Resume Generator';
    document.title = title ? `${title} | ResumeQL` : defaultTitle;

    return () => {
      document.title = defaultTitle;
    };
  }, [title]);
};
