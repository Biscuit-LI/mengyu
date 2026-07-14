const STAR_NAMES = [
  '织女星', '牛郎星', '北极星', '北斗星', '天狼星', '金星', '木星', '水星', '火星', '土星',
  '天王星', '海王星', '冥王星', '仙女座', '仙后座', '猎户座', '天鹅座', '天蝎座', '金牛座',
  '白羊座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '射手座', '摩羯座', '双鱼座',
  '流星雨', '彗星', '银河', '星云', '月光', '晨曦', '黄昏', '极光', '日蚀', '月蚀',
  '星尘', '星轨', '星座', '星团', '星环', '星芒', '星夜', '星空', '星辰', '星河',
];

const ADJECTIVES = [
  '璀璨的', '遥远的', '神秘的', '温柔的', '明亮的', '深邃的', '梦幻的', '宁静的',
  '闪烁的', '永恒的', '浪漫的', '孤独的', '温暖的', '清冷的', '朦胧的', '绚丽的',
];

function generateRandomString(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function generateNickname(): string {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const star = STAR_NAMES[Math.floor(Math.random() * STAR_NAMES.length)];
  const suffix = Math.random() > 0.7 ? generateRandomString().substring(0, 3) : '';
  return suffix ? `${adjective}${star}${suffix}` : `${adjective}${star}`;
}

export function generateFixedNickname(): string {
  const index = Math.floor(Math.random() * STAR_NAMES.length);
  return STAR_NAMES[index];
}
