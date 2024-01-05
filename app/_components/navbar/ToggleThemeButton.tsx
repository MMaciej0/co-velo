'use client';

import React from 'react';
import { Button } from '../../../components/ui/button';
import { SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';

const ToggleThemeButton = () => {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button variant="ghost" onClick={changeTheme} size="icon">
      <SunMoon />
    </Button>
  );
};

export default ToggleThemeButton;
