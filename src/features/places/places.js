export const placeRegions = ['north', 'northeast', 'east', 'central', 'south', 'southwest', 'northwest'];
export const placeTypes = ['Rivers', 'Mountains', 'Culture', 'Cities', 'Nature'];

const provinces = {
  beijing: ['Beijing', '北京'], hebei: ['Hebei', '河北'], shanxi: ['Shanxi', '山西'],
  innerMongolia: ['Inner Mongolia', '内蒙古'], heilongjiang: ['Heilongjiang', '黑龙江'],
  jilin: ['Jilin', '吉林'], liaoning: ['Liaoning', '辽宁'], shanghai: ['Shanghai', '上海'],
  zhejiang: ['Zhejiang', '浙江'], jiangsu: ['Jiangsu', '江苏'], anhui: ['Anhui', '安徽'],
  jiangxi: ['Jiangxi', '江西'], fujian: ['Fujian', '福建'], shandong: ['Shandong', '山东'],
  henan: ['Henan', '河南'], hubei: ['Hubei', '湖北'], hubeiChongqing: ['Hubei / Chongqing', '湖北／重庆'],
  hunan: ['Hunan', '湖南'], guangxi: ['Guangxi', '广西'], guangdong: ['Guangdong', '广东'],
  hainan: ['Hainan', '海南'], hongKong: ['Hong Kong', '香港'], macau: ['Macau', '澳门'],
  sichuan: ['Sichuan', '四川'], chongqing: ['Chongqing', '重庆'], guizhou: ['Guizhou', '贵州'],
  yunnan: ['Yunnan', '云南'], tibet: ['Tibet', '西藏'], shaanxi: ['Shaanxi', '陕西'],
  gansu: ['Gansu', '甘肃'], qinghai: ['Qinghai', '青海'], xinjiang: ['Xinjiang', '新疆'],
};

// UNESCO flags refer to inscribed World Heritage properties and confirmed components.
const directory = {
  north: [
    ['mutianyu', 'Great Wall at Mutianyu', '慕田峪长城', 'beijing', 'Culture', [4, 5, 9, 10], 'Climb between watchtowers along a wooded ridge outside Beijing.', '沿北京城外的林间山脊，在一座座敌楼之间步行。', true],
    ['forbidden-city', 'Forbidden City', '故宫', 'beijing', 'Culture', [4, 5, 9, 10], 'Follow the central axis through palace courtyards and side halls.', '沿中轴线穿过宫殿院落，顺道看看两侧的殿宇。', true],
    ['temple-of-heaven', 'Temple of Heaven', '天坛', 'beijing', 'Culture', [4, 5, 9, 10], 'See the blue-roofed Hall of Prayer and walk the surrounding park paths.', '欣赏蓝瓦祈年殿，再沿园内小径散步。', true],
    ['summer-palace', 'Summer Palace', '颐和园', 'beijing', 'Culture', [4, 5, 9, 10], 'Walk beside Kunming Lake and look up toward the halls on Longevity Hill.', '沿昆明湖漫步，抬头欣赏万寿山上的楼阁。', true],
    ['beijing-hutongs', 'Beijing Hutongs', '北京胡同', 'beijing', 'Culture', [4, 5, 9, 10], 'Explore narrow lanes and courtyard neighborhoods on foot.', '步行穿过窄巷，感受四合院街区的日常。'],
    ['chengde', 'Chengde Mountain Resort', '承德避暑山庄', 'hebei', 'Culture', [5, 6, 9], 'Stroll through the imperial grounds, then explore the outlying temples.', '先在皇家园林散步，再探访周边寺庙。', true],
    ['pingyao', 'Pingyao Ancient City', '平遥古城', 'shanxi', 'Culture', [4, 5, 9, 10], 'Explore old merchant streets and courtyard houses inside the city walls.', '走进城墙内的商号老街，探访传统院落。', true],
    ['yungang', 'Yungang Grottoes', '云冈石窟', 'shanxi', 'Culture', [5, 6, 9, 10], 'Look closely at Buddhist figures carved into sandstone caves near Datong.', '在大同附近的砂岩洞窟里，细看佛教造像。', true],
    ['wutai', 'Mount Wutai', '五台山', 'shanxi', 'Mountains', [5, 6, 9], 'Visit temple courtyards set among five broad mountain summits.', '在五座宽阔的山峰之间，探访一座座寺院。', true],
    ['hulunbuir', 'Hulunbuir Grassland', '呼伦贝尔大草原', 'innerMongolia', 'Nature', [6, 7, 8, 9], 'Look out over broad grasslands and the bends of the Morigele River.', '眺望开阔草原与蜿蜒的莫日格勒河。'],
  ],
  northeast: [
    ['harbin-ice', 'Harbin Ice and Snow World', '哈尔滨冰雪大世界', 'heilongjiang', 'Cities', [1, 2], 'See illuminated ice towers and sculptures; check the season’s opening dates.', '欣赏灯光点亮的冰塔与冰雕，出发前查阅当季开放日期。'],
    ['changbai', 'Changbai Mountain', '长白山', 'jilin', 'Mountains', [6, 7, 8, 9], 'Visit forested slopes and look out over the crater lake when conditions allow.', '走访林木覆盖的山坡，天气允许时远眺火山口天池。'],
    ['shenyang-palace', 'Shenyang Imperial Palace', '沈阳故宫', 'liaoning', 'Culture', [5, 6, 9, 10], 'Explore early Qing palace halls and their compact courtyards.', '参观清初宫殿里的厅堂和紧凑院落。', true],
  ],
  east: [
    ['bund', 'The Bund', '外滩', 'shanghai', 'Cities', [3, 4, 5, 9, 10, 11], 'Walk the Huangpu waterfront for historic buildings and the Pudong skyline.', '沿黄浦江散步，一边看历史建筑，一边望向浦东天际线。'],
    ['yu-garden', 'Yu Garden', '豫园', 'shanghai', 'Culture', [3, 4, 5, 9, 10], 'Follow winding paths past rockeries, pavilions, and pools in Shanghai’s old city.', '在上海老城的园林中沿曲径走过假山、亭台和池塘。'],
    ['west-lake', 'West Lake', '西湖', 'zhejiang', 'Nature', [3, 4, 5, 9, 10], 'Walk a lake causeway and pause at the waterside gardens and pavilions.', '走过西湖堤岸，在水边园林和亭台间稍作停留。', true],
    ['wuzhen', 'Wuzhen Water Town', '乌镇', 'zhejiang', 'Culture', [4, 5, 9, 10], 'Wander along canals between stone bridges and timber houses.', '沿着水巷漫步，穿过石桥与木屋。'],
    ['suzhou-gardens', 'Classical Gardens of Suzhou', '苏州园林', 'jiangsu', 'Culture', [3, 4, 5, 9, 10], 'Look for framed views of ponds, rockeries, and courtyards in the classical gardens.', '留意古典园林中由门窗框出的池塘、假山与院落。', true],
    ['sun-yat-sen-mausoleum', 'Sun Yat-sen Mausoleum', '中山陵', 'jiangsu', 'Culture', [3, 4, 5, 9, 10, 11], 'Climb the broad stairway on Nanjing’s Purple Mountain to the memorial hall.', '沿南京紫金山上的宽阔台阶走到纪念堂。'],
    ['huangshan', 'Huangshan', '黄山', 'anhui', 'Mountains', [4, 5, 9, 10], 'Follow ridge paths past granite peaks and pines shaped by mountain winds.', '沿山脊步道走过花岗岩峰峦，欣赏山风塑造的奇松。', true],
    ['hongcun-xidi', 'Hongcun and Xidi', '宏村与西递', 'anhui', 'Culture', [3, 4, 5, 9, 10], 'Walk between whitewashed Huizhou houses, ponds, and stone lanes.', '漫步在徽派白墙民居、池塘与石板巷之间。', true],
    ['wuyuan', 'Wuyuan Villages', '婺源', 'jiangxi', 'Culture', [3, 4, 10, 11], 'Visit hillside villages for spring rapeseed flowers or autumn harvest scenes.', '探访山间村落，春看油菜花，秋赏收获景象。'],
    ['fujian-tulou', 'Fujian Tulou', '福建土楼', 'fujian', 'Culture', [3, 4, 5, 10, 11], 'Explore villages with round and rectangular earthen communal homes.', '探访村落中的圆形和方形夯土聚居建筑。', true],
    ['wuyi', 'Wuyi Mountains', '武夷山', 'fujian', 'Mountains', [4, 5, 9, 10, 11], 'Pair sandstone ridge walks with views of the bends of the Nine-Bend Stream.', '走上砂岩山脊，也看看九曲溪蜿蜒的河道。', true],
    ['gulangyu', 'Gulangyu Island', '鼓浪屿', 'fujian', 'Culture', [3, 4, 5, 10, 11], 'Take a ferry from Xiamen and wander lanes lined with historic villas.', '从厦门乘渡轮上岛，漫步历史别墅之间的小巷。', true],
    ['mount-tai', 'Mount Tai', '泰山', 'shandong', 'Mountains', [4, 5, 9, 10], 'Climb stone stairways past temples and inscriptions toward the summit.', '沿石阶上山，经过寺庙和摩崖题刻，走向山顶。', true],
    ['qufu', 'Qufu', '曲阜', 'shandong', 'Culture', [4, 5, 9, 10], 'Visit the Temple of Confucius, the Kong Family Mansion, and the cemetery.', '参观孔庙、孔府和孔林，了解这座古城。', true],
    ['qingdao', 'Qingdao Coast', '青岛', 'shandong', 'Cities', [5, 6, 9, 10], 'Follow the seafront past piers, beaches, and headlands.', '沿海滨步道走过栈桥、沙滩和岬角。'],
  ],
  central: [
    ['shaolin', 'Shaolin Temple', '少林寺', 'henan', 'Culture', [4, 5, 9, 10], 'Visit the temple compound and the Pagoda Forest at the foot of Mount Song.', '参观嵩山脚下的少林寺院落和塔林。', true],
    ['longmen', 'Longmen Grottoes', '龙门石窟', 'henan', 'Culture', [4, 5, 9, 10], 'Follow the Yi River past limestone cliffs covered with Buddhist carvings.', '沿伊河漫步，欣赏石灰岩崖壁上的佛教雕刻。', true],
    ['yellow-crane', 'Yellow Crane Tower', '黄鹤楼', 'hubei', 'Culture', [3, 4, 5, 10, 11], 'Climb the tower for a view of Wuhan and the Yangtze River.', '登上黄鹤楼，眺望武汉城与长江。'],
    ['three-gorges', 'Three Gorges', '长江三峡', 'hubeiChongqing', 'Rivers', [4, 5, 9, 10], 'See the steep walls of Qutang, Wu, and Xiling gorges from the Yangtze.', '从长江水面欣赏瞿塘峡、巫峡和西陵峡的陡峭山壁。'],
    ['zhangjiajie', 'Zhangjiajie', '张家界', 'hunan', 'Mountains', [4, 5, 9, 10, 11], 'Explore the sandstone pillars and forest paths of UNESCO-listed Wulingyuan.', '走进列入世界遗产名录的武陵源，欣赏砂岩峰林与森林步道。', true],
    ['fenghuang', 'Fenghuang Ancient Town', '凤凰古城', 'hunan', 'Culture', [4, 5, 9, 10], 'Walk along the Tuo River past stilt houses and old stone lanes.', '沿沱江漫步，看吊脚楼与古城石巷。'],
  ],
  south: [
    ['li-river', 'Li River', '漓江', 'guangxi', 'Rivers', [4, 5, 9, 10], 'Follow the river between Guilin and Yangshuo for limestone peaks and waterside villages.', '沿桂林至阳朔的河道欣赏石灰岩峰峦与水边村落。'],
    ['longji', 'Longji Rice Terraces', '龙脊梯田', 'guangxi', 'Nature', [5, 6, 9, 10], 'Follow village footpaths through flooded spring paddies or golden autumn fields.', '沿村间小路看春季灌水的稻田，或秋季金黄的梯田。'],
    ['canton-tower', 'Canton Tower', '广州塔', 'guangdong', 'Cities', [10, 11, 12, 1, 2, 3], 'See Guangzhou’s skyline from the tower or across the Pearl River.', '登塔远眺广州天际线，也可从珠江对岸观赏塔身。'],
    ['kaiping', 'Kaiping Diaolou', '开平碉楼', 'guangdong', 'Culture', [3, 4, 10, 11, 12], 'Walk between villages with fortified towers set amid fields.', '在田野环绕的村庄之间步行，参观碉楼。', true],
    ['yalong-bay', 'Sanya and Yalong Bay', '三亚亚龙湾', 'hainan', 'Nature', [11, 12, 1, 2, 3], 'Spend a day walking the sandy arc of Yalong Bay on Hainan’s southern coast.', '在海南南岸的亚龙湾沿弧形沙滩漫步。'],
    ['victoria-harbour', 'Victoria Harbour', '维多利亚港', 'hongKong', 'Cities', [10, 11, 12, 3, 4], 'Ride the ferry or walk the waterfront for views of Hong Kong’s skyline.', '乘渡轮或沿海滨漫步，欣赏香港天际线。'],
    ['macau-centre', 'Historic Centre of Macau', '澳门历史城区', 'macau', 'Culture', [10, 11, 12, 3, 4], 'Connect historic squares, temples, and churches on a walk through the old city.', '步行穿过老城区，串联历史广场、庙宇与教堂。', true],
  ],
  southwest: [
    ['panda-base', 'Giant Panda Breeding Base', '成都大熊猫繁育研究基地', 'sichuan', 'Nature', [3, 4, 5, 9, 10, 11], 'Allow a morning for the panda enclosures and shaded paths at the Chengdu research base.', '留出一个上午，沿成都研究基地的林荫步道参观熊猫场馆。'],
    ['leshan', 'Leshan Giant Buddha', '乐山大佛', 'sichuan', 'Culture', [3, 4, 5, 9, 10], 'See the seated Buddha carved into the cliff where rivers meet.', '在江河交汇处观赏依崖凿成的坐佛。', true],
    ['emei', 'Mount Emei', '峨眉山', 'sichuan', 'Mountains', [4, 5, 9, 10], 'Follow forest paths to Buddhist temples and high mountain viewpoints.', '沿林间步道探访佛寺和高山观景点。', true],
    ['jiuzhaigou', 'Jiuzhaigou Valley', '九寨沟', 'sichuan', 'Nature', [5, 6, 9, 10], 'Explore turquoise lakes and waterfalls. Check current access and reservations before departure.', '欣赏碧蓝湖泊与瀑布，出发前请查询当前开放和预约情况。', true, 'jiuzhaiAccess'],
    ['qingcheng-dujiangyan', 'Mount Qingcheng and Dujiangyan', '青城山·都江堰', 'sichuan', 'Culture', [4, 5, 9, 10], 'Pair wooded Taoist temple paths with a visit to the historic irrigation works.', '走访林间道观，再参观历史悠久的都江堰水利工程。', true],
    ['hongya-cave', 'Hongya Cave', '洪崖洞', 'chongqing', 'Cities', [3, 4, 5, 10, 11], 'See stacked riverside buildings lit up after dusk in central Chongqing.', '入夜后观赏重庆市中心江边层层叠叠的灯火建筑。'],
    ['dazu', 'Dazu Rock Carvings', '大足石刻', 'chongqing', 'Culture', [3, 4, 5, 9, 10, 11], 'Look closely at religious scenes carved into the cliffs at Baodingshan and Beishan.', '在宝顶山和北山细看刻在岩壁上的宗教造像。', true],
    ['huangguoshu', 'Huangguoshu Waterfall', '黄果树瀑布', 'guizhou', 'Nature', [5, 6, 7, 8, 9], 'Follow paths between viewpoints for different angles on the broad cascade.', '沿步道走访不同观景台，从各个角度欣赏宽阔的瀑布。'],
    ['stone-forest', 'Stone Forest', '石林', 'yunnan', 'Nature', [3, 4, 5, 9, 10, 11], 'Walk among the tall limestone pinnacles of Shilin near Kunming.', '在昆明附近的石林，穿行于高耸的石灰岩柱之间。', true],
    ['dali-erhai', 'Dali and Erhai Lake', '大理古城·洱海', 'yunnan', 'Culture', [3, 4, 5, 9, 10, 11], 'Pair Dali’s old streets with a slow walk or cycle along Erhai Lake.', '逛过大理古城老街，再沿洱海慢走或骑行。'],
    ['lijiang', 'Lijiang Old Town', '丽江古城', 'yunnan', 'Culture', [3, 4, 5, 9, 10, 11], 'Explore stone lanes, small bridges, and canals in the old town.', '在古城的石板巷、小桥与水渠之间漫步。', true],
    ['tiger-leaping-gorge', 'Tiger Leaping Gorge', '虎跳峡', 'yunnan', 'Rivers', [4, 5, 9, 10], 'Look down on the Jinsha River between steep mountains. Check trail conditions before hiking.', '从陡峭群山之间俯瞰金沙江，徒步前请查看步道情况。'],
    ['yuanyang', 'Yuanyang Rice Terraces', '元阳梯田', 'yunnan', 'Nature', [11, 12, 1, 2, 3], 'Watch changing light on the flooded Hani terraces from hillside viewpoints.', '从山间观景台欣赏蓄水的哈尼梯田与不断变化的光影。', true],
    ['shangri-la', 'Shangri-La', '香格里拉', 'yunnan', 'Culture', [5, 6, 9, 10], 'Visit Dukezong Old Town and the monastery above the surrounding hills.', '探访独克宗古城与坐落在山坡上的松赞林寺。'],
    ['potala', 'Potala Palace', '布达拉宫', 'tibet', 'Culture', [4, 5, 9, 10], 'See the red and white palace above Lhasa and allow time to adjust to the altitude.', '欣赏拉萨城上方红白相间的宫殿，并留时间适应海拔。', true],
    ['namtso', 'Namtso Lake', '纳木错', 'tibet', 'Nature', [6, 7, 8, 9], 'See the broad high-altitude lake beneath the Nyenchen Tanglha mountains.', '在念青唐古拉山下眺望开阔的高海拔湖泊。'],
    ['everest-tibet', 'Everest Base Camp (Tibet side)', '珠峰大本营', 'tibet', 'Mountains', [4, 5, 9, 10], 'The north-side approach is at high altitude. Check permit and access requirements and allow time to acclimatize.', '珠峰北侧海拔很高。出发前请查验所需许可和通行规定，并留时间适应海拔。', false, 'tibetAdvice'],
  ],
  northwest: [
    ['terracotta-army', 'Terracotta Army', '兵马俑', 'shaanxi', 'Culture', [3, 4, 5, 9, 10], 'Walk the excavation halls and compare the figures, armor, and formations.', '走访发掘展厅，细看陶俑的面容、盔甲和队列。', true],
    ['xian-wall', 'Xi’an City Wall', '西安城墙', 'shaanxi', 'Culture', [3, 4, 5, 9, 10], 'Walk or cycle atop the city wall for a view of rooftops and gates.', '步行或骑行登上城墙，俯瞰城门和街区屋顶。'],
    ['mount-hua', 'Mount Hua', '华山', 'shaanxi', 'Mountains', [4, 5, 9, 10], 'Choose a route along steep granite ridges between the mountain’s peaks.', '选择一条沿陡峭花岗岩山脊连接各峰的路线。'],
    ['mogao', 'Mogao Caves', '莫高窟', 'gansu', 'Culture', [4, 5, 9, 10], 'See Buddhist paintings and sculptures in the cave complex near Dunhuang.', '在敦煌附近的洞窟群中欣赏佛教壁画与彩塑。', true],
    ['crescent-lake', 'Singing Sand Dunes and Crescent Lake', '鸣沙山月牙泉', 'gansu', 'Nature', [4, 5, 9, 10], 'Walk the edge of Dunhuang’s dunes to the crescent-shaped oasis.', '沿敦煌沙丘边缘漫步，走到形如新月的泉水绿洲。'],
    ['jiayuguan', 'Jiayuguan Pass', '嘉峪关', 'gansu', 'Culture', [5, 6, 9, 10], 'Explore the fortress at the western end of the Ming-era Great Wall.', '探访明长城西端的关城。', true],
    ['zhangye-danxia', 'Zhangye Danxia', '张掖丹霞', 'gansu', 'Nature', [5, 6, 7, 8, 9], 'Take in bands of red, ochre, and orange rock from designated viewpoints.', '在指定观景台欣赏红、赭、橙色相间的丘陵。'],
    ['qinghai-lake', 'Qinghai Lake', '青海湖', 'qinghai', 'Nature', [6, 7, 8, 9], 'Follow parts of the lakeshore for open water and broad plateau grasslands.', '沿部分湖岸走走，眺望开阔湖面与高原草地。'],
    ['kanas', 'Kanas Lake', '喀纳斯', 'xinjiang', 'Nature', [6, 7, 8, 9], 'See a forest-ringed lake and the changing colors of the Altai valleys.', '欣赏森林环抱的湖泊与阿尔泰山谷的季节色彩。'],
    ['kashgar', 'Kashgar Old City', '喀什古城', 'xinjiang', 'Culture', [4, 5, 9, 10], 'Walk the old city’s lanes and browse its workshops and markets.', '漫步古城街巷，看看手工作坊与集市。'],
  ],
};

export const places = Object.entries(directory).flatMap(([region, rows]) =>
  rows.map(([id, name, chineseName, provinceKey, type, bestMonths, description, chineseDescription, unesco = false, advice]) => {
    const [province, chineseProvince] = provinces[provinceKey];
    return { id, name, chineseName, province, chineseProvince, region, type, bestMonths, description, chineseDescription, unesco, advice };
  })
);

function normalize(text) {
  return text.normalize('NFKD').toLowerCase().replace(/\p{M}/gu, '').replace(/['’]/g, '');
}

export function findPlaces({ query = '', region = '', type = '', unescoOnly = false } = {}) {
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  return places.filter(place => {
    if (region && region !== place.region) return false;
    if (type && type !== place.type) return false;
    if (unescoOnly && !place.unesco) return false;
    const searchText = normalize([
      place.name, place.chineseName, place.province, place.chineseProvince, place.description, place.chineseDescription,
    ].join(' '));
    return terms.every(term => searchText.includes(term));
  });
}
