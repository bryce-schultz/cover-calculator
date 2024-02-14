import { useState, useEffect } from 'react';

export function useWindowDimension() 
{
  const [dimension, setDimension] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => 
  {
    const resizeHandler = () => 
    {
      setDimension([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);
  return dimension;
}