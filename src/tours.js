export const tours = [
  {
    id: 'river', regionChinese: '桂林 广西 阳朔', name: 'The Li River', region: 'Guilin · Guangxi', type: 'Rivers', chinese: '漓江',
    description: 'Karst peaks, bamboo rafts, and quiet lanes in the Yangshuo countryside.',
    days: ['Walk around the central lakes of Guilin.', 'Follow the Li River to Yangshuo and explore its old lanes.', 'Spend the morning on the riverside paths of the Yulong Valley.'],
  },
  {
    id: 'peaks', regionChinese: '张家界 湖南', name: 'Peaks in the Clouds', region: 'Zhangjiajie · Hunan', type: 'Mountains', chinese: '张家界',
    description: 'Sandstone pillars rise above forest trails and banks of mountain mist.',
    days: ['Settle into Wulingyuan and explore the town on foot.', 'Visit Yuanjiajie and take in the sandstone viewpoints.', 'Follow the Golden Whip Stream trail.'],
  },
  {
    id: 'tea', regionChinese: '杭州 浙江 龙井', name: 'Tea & West Lake', region: 'Hangzhou · Zhejiang', type: 'Culture', chinese: '西湖',
    description: 'A lakeside walk, temple courtyards, and a cup of tea in the Longjing hills.',
    days: ['Walk the West Lake causeways and visit the lakeside gardens.', 'Explore Lingyin Temple and stop for tea in Longjing village.'],
  },
  {
    id: 'beijing', name: 'Beyond the Great Wall', region: 'Beijing · North China', type: 'Culture', chinese: '北京',
    description: 'Ancient ramparts, imperial courtyards, and everyday life in the hutongs.',
    days: ['Explore the Forbidden City and wander through Jingshan Park.', 'Spend a day walking the Great Wall at Mutianyu.', 'Slow down in the hutongs and visit the Temple of Heaven.'],
  },
  {
    id: 'shanghai', name: 'Along the Shanghai Bund', region: 'Shanghai · East China', type: 'Cities', chinese: '上海',
    description: 'Riverside skylines, leafy streets, and a city that comes alive after dark.',
    days: ['Walk the Bund and explore the lanes around Yu Garden.', 'Discover the tree-lined streets of the former French Concession.', 'Explore Pudong and return to the waterfront for an evening stroll.'],
  },
  {
    id: 'xian', name: 'Echoes of Ancient Xi’an', region: 'Xi’an · Shaanxi', type: 'Culture', chinese: '西安',
    description: 'Terracotta warriors, city walls, and old lanes full of local flavor.',
    days: ['Walk the old city walls and explore the Bell Tower area.', 'Visit the Terracotta Army and take time with its extraordinary details.', 'Wander the Muslim Quarter and the grounds around the Giant Wild Goose Pagoda.'],
  },
  {
    id: 'chengdu', name: 'Pandas & Teahouses', region: 'Chengdu · Sichuan', type: 'Culture', chinese: '成都',
    description: 'Panda encounters, park-side tea, and the welcoming rhythms of Sichuan.',
    days: ['Visit the Chengdu Research Base of Giant Panda Breeding.', 'Pause for tea in People’s Park and explore Kuanzhai Alley.', 'Visit Wuhou Shrine and wander the lanes of Jinli.'],
  },
];

export const popularPlaces = [
  { tourId: 'beijing', name: 'Beijing', chinese: '北京', attraction: 'Great Wall & Forbidden City', attractionChinese: '万里长城 · 故宫', description: 'Walk through centuries of imperial history.', descriptionChinese: '漫步古都，感受历史的温度。' },
  { tourId: 'shanghai', name: 'Shanghai', chinese: '上海', attraction: 'The Bund & Yu Garden', attractionChinese: '外滩 · 豫园', description: 'Discover a waterfront where old meets new.', descriptionChinese: '在江畔邂逅老上海与摩登都市。' },
  { tourId: 'xian', name: 'Xi’an', chinese: '西安', attraction: 'Terracotta Army & City Wall', attractionChinese: '兵马俑 · 西安城墙', description: 'Follow the stories of an ancient capital.', descriptionChinese: '寻访千年古都，聆听历史回响。' },
  { tourId: 'chengdu', name: 'Chengdu', chinese: '成都', attraction: 'Giant Pandas & People’s Park', attractionChinese: '大熊猫 · 人民公园', description: 'Meet the pandas, then slow down over tea.', descriptionChinese: '看国宝熊猫，品一杯盖碗茶。' },
  { tourId: 'river', name: 'Guilin', chinese: '桂林', attraction: 'Li River & Yangshuo', attractionChinese: '漓江 · 阳朔', description: 'Let the river lead you into the mountains.', descriptionChinese: '泛舟漓江，走进如画山水。' },
  { tourId: 'peaks', name: 'Zhangjiajie', chinese: '张家界', attraction: 'Sandstone Peaks & Forest Trails', attractionChinese: '奇峰 · 森林步道', description: 'Find a world of forest pillars and drifting mist.', descriptionChinese: '穿行奇峰云海，感受自然之美。' },
];
