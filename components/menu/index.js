'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Select } from 'antd';
import { LanguageData } from '@/locales/data-language-selection';

const LanguageMenu = () => {
  const router = useRouter();
  const { option } = Select;

  const handleLanguageChange = (locale) => {
    router.push(`/${locale}`);
  };
  

  // Dinamik olarak dil seçeneklerini oluştur
  const options = LanguageData.map(language => ({
    value: language.value,
    label: (
      <div>
        <span>{language.emoji}</span>
        <span style={{ marginLeft: 8 }}>{language.label}</span>
      </div>
    ),
  }));

  return (
    <div>
      {/* Select bileşeni için dinamik olarak oluşturulan seçenekler */}
      <Select defaultValue="tr" style={{ width: 120 }} onChange={handleLanguageChange} options={options}>

      {/* Dinamik olarak oluşturulan seçenekler yerine düz metin kullanmak
      <Option value="en">English</Option>
      <Option value="tr">Türkçe</Option>
      */}
      </Select>
    </div>
  );
};

export default LanguageMenu;