import React from 'react';
import SlotMachine from './components/slotmachine';

const App: React.FC = () => {
  const options = [
    'エンジニアを始めたきっかけ',
    '一番好きな漫画・アニメ',
    '中高の部活動',
    '「あ、エンジニアやめたいかも」どんな時？',
    'これまでのバイト遍歴',
    'やっちまったしくじりエピソード',
    '5スキでやりたい企画',
    '駄菓子屋に行ったらこれだけは絶対買うもの',
    '小さいころの夢'
  ];

  return (
    <div className="App h-screen py-10 flex flex-col items-center bg-black">
      <h1 className="text-6xl text-white font-bold mb-5">トークテーマ</h1>
      <div className="w-full flex justify-center">
        <SlotMachine options={options} />
      </div>
    </div>
  );
  
};

export default App;