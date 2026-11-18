const routes = [
  {
    id: 'river', regionChinese: '桂林 广西 阳朔', name: 'The Li River', region: 'Guilin · Guangxi', type: 'Rivers', chinese: '漓江',
    description: 'Karst peaks, bamboo rafts, and quiet lanes in the Yangshuo countryside.',
    days: [
      'Start with a loop around Guilin’s central lakes and cross the bridges between them. Leave the afternoon open for a stroll through the surrounding lanes, then return to the lakefront as the lights come on.',
      'Set aside the morning for the Li River boat ride to Yangshuo. Watch for the changing shapes of the limestone peaks, then check in and explore the quieter lanes off West Street on foot.',
      'Start early on the Yulong Valley’s riverside paths. Turn back whenever you’ve had enough walking and leave time for lunch before your onward journey.',
    ],
  },
  {
    id: 'peaks', regionChinese: '张家界 湖南', name: 'Peaks in the Clouds', region: 'Zhangjiajie · Hunan', type: 'Mountains', chinese: '张家界',
    description: 'Sandstone pillars rise above forest trails and banks of mountain mist.',
    days: [
      'Settle into Wulingyuan and explore the town on foot. Keep the first afternoon easy, get your bearings, and check the park entrance and shuttle options for the next morning.',
      'Spend the day at Yuanjiajie, linking a few sandstone viewpoints instead of trying to cover the whole park. Keep extra time for the return shuttle and pick a shorter circuit if visibility is poor.',
      'Walk Golden Whip Stream at the base of the cliffs. Choose an out-and-back distance that suits your group and leave the afternoon open for the journey onward.',
    ],
  },
  {
    id: 'tea', regionChinese: '杭州 浙江 龙井', name: 'Tea & West Lake', region: 'Hangzhou · Zhejiang', type: 'Culture', chinese: '西湖',
    description: 'A lakeside walk, temple courtyards, and a cup of tea in the Longjing hills.',
    days: [
      'Walk one of the West Lake causeways in the morning, then spend the afternoon in the lakeside gardens. Pause at a pavilion or cafe before looping back along the water.',
      'Explore the courtyards and paths around Lingyin Temple. Continue to Longjing village for tea, and leave time to walk a short stretch of the surrounding hills before departure.',
    ],
  },
  {
    id: 'beijing', name: 'Beyond the Great Wall', region: 'Beijing · North China', type: 'Culture', chinese: '北京',
    description: 'Ancient ramparts, imperial courtyards, and everyday life in the hutongs.',
    days: [
      'Make the Forbidden City the main stop and allow time for its courtyards. Continue to Jingshan Park for a view back across the palace roofs before calling it a day.',
      'Take a round-trip transfer to Mutianyu. Walk between a few watchtowers at your own pace and choose your turnaround point before tackling the steepest stairs.',
      'Spend an unhurried morning in the hutongs and stop somewhere for lunch. In the afternoon, explore the Temple of Heaven grounds and linger along the paths if time allows.',
    ],
  },
  {
    id: 'shanghai', name: 'Along the Shanghai Bund', region: 'Shanghai · East China', type: 'Cities', chinese: '上海',
    description: 'Riverside skylines, leafy streets, and a city that comes alive after dark.',
    days: [
      'Walk the Bund to get your bearings and see the skyline across the Huangpu. Then turn inland for Yu Garden and the lanes around it, leaving the evening free.',
      'Spend the day on the tree-lined streets of the former French Concession. Pick a handful of lanes to explore and let coffee stops and small shops set the pace.',
      'Cross to Pudong for a different perspective on the city. Head back to the waterfront at dusk and compare the two banks as the skyline lights up.',
    ],
  },
  {
    id: 'xian', name: 'Echoes of Ancient Xi’an', region: 'Xi’an · Shaanxi', type: 'Culture', chinese: '西安',
    description: 'Terracotta warriors, city walls, and old lanes full of local flavor.',
    days: [
      'Start on the old city walls and choose a walking section that suits your pace. Spend the afternoon near the Bell Tower and leave room for a meal in the surrounding streets.',
      'Set aside most of the day for the Terracotta Army. Move between the excavation halls slowly enough to notice the individual faces, armor, and poses before returning to the city.',
      'Wander the Muslim Quarter and make time for a snack stop. Continue to the grounds around the Giant Wild Goose Pagoda for a final walk before departure.',
    ],
  },
  {
    id: 'chengdu', name: 'Pandas & Teahouses', region: 'Chengdu · Sichuan', type: 'Culture', chinese: '成都',
    description: 'Panda encounters, park-side tea, and the welcoming rhythms of Sichuan.',
    days: [
      'Make the panda research base your main morning stop. Allow time to move between viewing areas, then keep the rest of the day flexible back in the city.',
      'Start with covered-bowl tea in People’s Park. Later, walk through Kuanzhai Alley and duck into the smaller lanes when you want a quieter stretch.',
      'Visit Wuhou Shrine and spend time in its courtyards before walking the nearby lanes of Jinli. Leave a buffer for lunch and the onward journey.',
    ],
  },
  {
    id: 'huangshan', name: 'Huangshan & Huizhou Villages', region: 'Anhui · Jiangxi', type: 'Mountains', chinese: '黄山',
    description: 'Granite ridges, white-walled villages, and terraced hills on a three-day route through southern Anhui and neighboring Jiangxi.',
    days: [
      'Start in Tangkou and choose a Huangshan route suited to the weather and your group. Allow time for the pine-lined viewpoints and plan your descent before setting out.',
      'Spend the day in Hongcun, walking along the pond and through the village lanes. Add Xidi if you have time for the transfer and a second village walk.',
      'Continue to Wuyuan and choose a village walk around Jiangling or one of the nearby settlements. Leave time for the onward journey.',
    ],
  },
];

const details = {
  river: {
    slug: 'li-river', price: 480, difficulty: 'easy', months: [4, 5, 9, 10], groupSize: 8, rating: 4.9, reviews: 124,
    highlights: ['Guilin’s central lakes on foot', 'Karst peaks along the Li River', 'Quiet lanes in old Yangshuo', 'Riverside paths in the Yulong Valley'],
    included: ['Two nights in a guesthouse', 'Li River boat ride', 'Local transfer to the Yulong Valley'],
    notIncluded: ['Travel to and from Guilin', 'Meals and personal expenses', 'Travel insurance'],
    gallery: [['1557750223-53916b138a90', 'pBg2i0aUOec'], ['1551650045-fc958c7b0452', 'bXHHjxFLw58'], ['1690420979851-d019fa6e919e', '8TYSocsa_9c']],
  },
  peaks: {
    slug: 'zhangjiajie-peaks', bestSeason: 'autumn', price: 540, difficulty: 'moderate', months: [4, 5, 9, 10, 11], groupSize: 6, rating: 4.9, reviews: 98,
    highlights: ['Wulingyuan on foot', 'Sandstone viewpoints at Yuanjiajie', 'A walk along Golden Whip Stream'],
    included: ['Two nights in Wulingyuan', 'Forest park admission', 'Park shuttle allowance'],
    notIncluded: ['Travel to and from Zhangjiajie', 'Optional cable cars and lifts', 'Meals and travel insurance'],
    gallery: [['1740521532587-dd5938febf27', 'IUjIATAp2AA'], ['1517047098372-8224cef6dec4', 'U6p7yV5waA0'], ['1743092440321-c46684fcd687', 'k2b2MUNEH5k']],
  },
  tea: {
    slug: 'tea-and-west-lake', bestSeason: 'spring', price: 320, difficulty: 'easy', months: [3, 4, 5, 9, 10], groupSize: 8, rating: 4.8, reviews: 82,
    highlights: ['West Lake causeways and gardens', 'Courtyards at Lingyin Temple', 'Longjing village tea tasting'],
    included: ['One night in Hangzhou', 'Temple admission allowance', 'Tea tasting'],
    notIncluded: ['Rail or airfare to Hangzhou', 'Meals outside the tasting', 'Travel insurance'],
    gallery: [['1767784821016-c7ae4951716f', 'Av1C6l0KZbQ'], ['1736772875229-3a5984e3877f', 'MsyIOw1Pb8E'], ['1747798678108-ba9a8606d58b', '3UGQVaKtoYU']],
  },
  beijing: {
    slug: 'beyond-the-great-wall', price: 620, difficulty: 'moderate', months: [4, 5, 9, 10], groupSize: 10, rating: 4.9, reviews: 156,
    highlights: ['Forbidden City and Jingshan Park', 'Mutianyu Great Wall walk', 'Hutong lanes and the Temple of Heaven'],
    included: ['Two nights in Beijing', 'Mutianyu round-trip transfer', 'Admission allowance for planned sights'],
    notIncluded: ['Travel to and from Beijing', 'Meals and optional cable car rides', 'Travel insurance'],
    gallery: [['1668333140118-84e827fe42ca', 'eTcSiwZYA-k'], ['1701668910380-b44dcc028525', '2CC1CGMxIac'], ['1566234626884-8d1382c2842d', 'tMDG9DjFK7Q']],
  },
  shanghai: {
    slug: 'shanghai-bund', price: 560, difficulty: 'easy', months: [3, 4, 5, 9, 10, 11], groupSize: 10, rating: 4.8, reviews: 112,
    highlights: ['An evening walk along the Bund', 'Classical gardens at Yu Garden', 'Tree-lined lanes and a Pudong skyline view'],
    included: ['Two nights in Shanghai', 'Yu Garden admission allowance', 'Local metro allowance'],
    notIncluded: ['Travel to and from Shanghai', 'Meals and observation deck tickets', 'Travel insurance'],
    gallery: [['1538428494232-9c0d8a3ab403', 'uKyzXEc2k_s'], ['1592203272820-147d6102fd04', 'rvXkYDk-lYs'], ['1709423595537-09b5d39758c3', 'ZWqcn-xm-1w']],
  },
  xian: {
    slug: 'ancient-xian', price: 460, difficulty: 'easy', months: [4, 5, 9, 10], groupSize: 8, rating: 4.9, reviews: 91,
    highlights: ['Walk atop the old city walls', 'Spend time with the Terracotta Army', 'Explore the Muslim Quarter and pagoda grounds'],
    included: ['Two nights in Xi’an', 'Terracotta Army return transfer', 'Museum and city wall admission allowance'],
    notIncluded: ['Travel to and from Xi’an', 'Meals and bike rentals', 'Travel insurance'],
    gallery: [['1527922891260-918d42a4efc8', 'xZDWEEMS3sA'], ['1759443789046-51c638b260e8', 'U1-VxnKn8nA'], ['1527922751658-fdc12370761e', 'ZZV1FOGaQ8s']],
  },
  chengdu: {
    slug: 'chengdu-pandas-and-teahouses', price: 445, difficulty: 'easy', months: [3, 4, 5, 9, 10, 11], groupSize: 8, rating: 5, reviews: 104,
    highlights: ['A morning at the panda research base', 'Covered-bowl tea in People’s Park', 'Wuhou Shrine and Jinli’s old lanes'],
    included: ['Two nights in Chengdu', 'Panda base admission and local transfer', 'Tea in People’s Park'],
    notIncluded: ['Travel to and from Chengdu', 'Meals and optional performances', 'Travel insurance'],
    gallery: [['1572295269175-f18627ae9c41', 'HFgxFulbsF4'], ['1694418500115-02578eaec401', 'JwigqKcH2_U'], ['1707225825264-c2c5c510b126', 'IqLKXnL88ns']],
  },
  huangshan: {
    slug: 'huangshan-huizhou-villages', bestSeason: 'autumn', price: 495, difficulty: 'moderate',
    months: [4, 5, 9, 10], groupSize: 8, rating: 4.9, reviews: 78,
    highlights: ['Granite ridges and pines on Huangshan', 'Ponds and Huizhou architecture in Hongcun', 'Hillside villages around Wuyuan'],
    included: ['Two nights of accommodation', 'Huangshan admission allowance', 'Local ground transport allowance'],
    notIncluded: ['Travel to and from the region', 'Optional cable car rides and meals', 'Travel insurance'],
    gallery: ['huangshan', 'hongcun-xidi', 'wuyuan'].map(id => ({
      id,
      file: `places/${id}.webp`,
    })),
  },
};

export const popularPlaces = [
  { tourId: 'beijing', name: 'Beijing', chinese: '北京', attraction: 'Great Wall & Forbidden City', attractionChinese: '万里长城 · 故宫', description: 'Walk through centuries of imperial history.', descriptionChinese: '漫步古都，感受历史的温度。' },
  { tourId: 'shanghai', name: 'Shanghai', chinese: '上海', attraction: 'The Bund & Yu Garden', attractionChinese: '外滩 · 豫园', description: 'Discover a waterfront where old meets new.', descriptionChinese: '在江畔邂逅老上海与摩登都市。' },
  { tourId: 'xian', name: 'Xi’an', chinese: '西安', attraction: 'Terracotta Army & City Wall', attractionChinese: '兵马俑 · 西安城墙', description: 'Follow the stories of an ancient capital.', descriptionChinese: '寻访千年古都，聆听历史回响。' },
  { tourId: 'chengdu', name: 'Chengdu', chinese: '成都', attraction: 'Giant Pandas & People’s Park', attractionChinese: '大熊猫 · 人民公园', description: 'Meet the pandas, then slow down over tea.', descriptionChinese: '看国宝熊猫，品一杯盖碗茶。' },
  { tourId: 'river', name: 'Guilin', chinese: '桂林', attraction: 'Li River & Yangshuo', attractionChinese: '漓江 · 阳朔', description: 'Let the river lead you into the mountains.', descriptionChinese: '泛舟漓江，走进如画山水。' },
  { tourId: 'peaks', name: 'Zhangjiajie', chinese: '张家界', attraction: 'Sandstone Peaks & Forest Trails', attractionChinese: '奇峰 · 森林步道', description: 'Find a world of forest pillars and drifting mist.', descriptionChinese: '穿行奇峰云海，感受自然之美。' },
];

export const tours = routes.map(route => {
  const detail = details[route.id];
  return {
    ...route,
    ...detail,
    destination: popularPlaces.find(place => place.tourId === route.id),
    duration: route.days.length,
    bestSeason: detail.bestSeason ?? 'springAutumn',
    gallery: detail.gallery.map(photo => {
      if (!Array.isArray(photo)) return photo;
      const [id, source] = photo;
      return { id, source: `https://unsplash.com/photos/${source}` };
    }),
  };
});
