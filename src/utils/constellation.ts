export const CONSTELLATIONS = [
  { name: '白羊座', emoji: '♈', date: '3.21-4.19' },
  { name: '金牛座', emoji: '♉', date: '4.20-5.20' },
  { name: '双子座', emoji: '♊', date: '5.21-6.21' },
  { name: '巨蟹座', emoji: '♋', date: '6.22-7.22' },
  { name: '狮子座', emoji: '♌', date: '7.23-8.22' },
  { name: '处女座', emoji: '♍', date: '8.23-9.22' },
  { name: '天秤座', emoji: '♎', date: '9.23-10.23' },
  { name: '天蝎座', emoji: '♏', date: '10.24-11.22' },
  { name: '射手座', emoji: '♐', date: '11.23-12.21' },
  { name: '摩羯座', emoji: '♑', date: '12.22-1.19' },
  { name: '水瓶座', emoji: '♒', date: '1.20-2.18' },
  { name: '双鱼座', emoji: '♓', date: '2.19-3.20' },
];

export function getRandomConstellation(): string {
  const index = Math.floor(Math.random() * CONSTELLATIONS.length);
  return CONSTELLATIONS[index].name;
}

export function getConstellationEmoji(name: string): string {
  const found = CONSTELLATIONS.find(c => c.name === name);
  return found?.emoji || '⭐';
}

export function getConstellationByName(name: string) {
  return CONSTELLATIONS.find(c => c.name === name);
}
