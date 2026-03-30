// 九星気学 - 本命星計算ロジック

export type HonmeiStar = {
  number: number;      // 1〜9
  name: string;        // 例: 一白水星
  element: string;     // 五行属性
  direction: string;   // 象徴方位
  nature: string;      // 性質・特徴
  color: string;       // 象徴色（CSS用）
};

const STARS: HonmeiStar[] = [
  {
    number: 1,
    name: "一白水星",
    element: "水",
    direction: "北",
    nature: "知恵・柔軟・流動",
    color: "#4a90d9",
  },
  {
    number: 2,
    name: "二黒土星",
    element: "土",
    direction: "南西",
    nature: "勤勉・包容・育成",
    color: "#8B6914",
  },
  {
    number: 3,
    name: "三碧木星",
    element: "木",
    direction: "東",
    nature: "躍動・創造・行動",
    color: "#2e8b57",
  },
  {
    number: 4,
    name: "四緑木星",
    element: "木",
    direction: "南東",
    nature: "協調・信頼・縁",
    color: "#5da832",
  },
  {
    number: 5,
    name: "五黄土星",
    element: "土",
    direction: "中央",
    nature: "王者・中心・強運",
    color: "#c8a000",
  },
  {
    number: 6,
    name: "六白金星",
    element: "金",
    direction: "北西",
    nature: "高貴・リーダー・完璧",
    color: "#aaaaaa",
  },
  {
    number: 7,
    name: "七赤金星",
    element: "金",
    direction: "西",
    nature: "喜び・弁才・豊かさ",
    color: "#c0392b",
  },
  {
    number: 8,
    name: "八白土星",
    element: "土",
    direction: "北東",
    nature: "変革・継承・山岳",
    color: "#e8d5b0",
  },
  {
    number: 9,
    name: "九紫火星",
    element: "火",
    direction: "南",
    nature: "知性・美・輝き",
    color: "#c0392b",
  },
];

/**
 * 年の各桁を1桁になるまで合計する
 */
function digitSum(n: number): number {
  while (n >= 10) {
    n = String(n)
      .split("")
      .reduce((acc, d) => acc + Number(d), 0);
  }
  return n;
}

/**
 * 節分（2月4日）前かどうかを判定する
 */
function isBeforeSetsubun(month: number, day: number): boolean {
  return month === 1 || (month === 2 && day <= 3);
}

/**
 * 生年月日から本命星を計算する
 * @param year  西暦年
 * @param month 月（1〜12）
 * @param day   日（1〜31）
 */
export function calcHonmeiStar(
  year: number,
  month: number,
  day: number
): HonmeiStar {
  // 節分前は前年を使う
  const targetYear = isBeforeSetsubun(month, day) ? year - 1 : year;

  // 年の桁を合計して1桁に
  const sum = digitSum(targetYear);

  // 11 から引いて 1〜9 に丸める
  let starNumber = 11 - sum;
  if (starNumber <= 0) starNumber += 9;
  if (starNumber > 9) starNumber -= 9;

  return STARS[starNumber - 1];
}

/**
 * 年の選択肢を生成（1930〜今年）
 */
export function getYearOptions(): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let y = currentYear; y >= 1930; y--) {
    years.push(y);
  }
  return years;
}

/**
 * 日の選択肢を生成（1〜31）
 */
export function getDayOptions(): number[] {
  return Array.from({ length: 31 }, (_, i) => i + 1);
}
