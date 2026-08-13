import { useEffect } from 'react';

const SEO = ({ title, description }) => {
  useEffect(() => {
    document.title = title ? `${title} | Nexus PC` : 'Nexus PC — Premium PC Components';
    
    let meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', description || 'Nexus PC — Premium PC components for gamers, creators, and professionals.');
    }
  }, [title, description]);

  return null;
};

export default SEO;
