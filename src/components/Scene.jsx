import React, { useId, useState } from 'react';

const palettes = {
  river: ['#edf1d5', '#9dbb9e', '#527f6f', '#317461', '#16473b'],
  peaks: ['#e8e9d7', '#9aafa8', '#597d76', '#426762', '#213e39'],
  tea: ['#f3e9ce', '#adb183', '#739367', '#527650', '#2b513b'],
};

const hills = 'M-100 495V420Q50 290 132 369T299 364Q355 311 405 375T522 370Q570 335 608 371Q662 415 715 346Q762 286 793 190Q813 133 850 160Q881 181 896 264Q914 329 945 280Q969 202 1005 220Q1032 233 1067 308Q1105 377 1290 319V880H-100Z';
const peaks = 'M-100 440V350L104 340 138 245Q153 220 170 248L190 350 233 358 264 161Q285 120 308 159L333 351 406 337 437 250Q456 210 478 248L498 350 559 330 581 134Q602 90 624 136L648 345 697 318 722 198Q740 166 756 193L778 343 835 325 864 114Q888 70 914 112L943 324 998 301 1025 190Q1048 154 1070 195L1096 331 1280 311V840H-100Z';

function Illustration({ kind = 'river', fit = 'cover' }) {
  const id = useId();
  const [sky, pale, distant, middle, ink] = palettes[kind] || palettes.river;

  return (
    <svg className="scene" viewBox="0 0 1200 740" preserveAspectRatio={fit === 'contain' ? 'xMidYMid meet' : 'xMidYMid slice'} aria-hidden="true">
      <defs>
        <linearGradient id={id + '-sky'} x2="0%" y2="100%">
          <stop stopColor={sky} /><stop offset="100%" stopColor={pale} />
        </linearGradient>
        <linearGradient id={id + '-water'} x2="0%" y2="100%">
          <stop stopColor={sky} /><stop offset="100%" stopColor={pale} />
        </linearGradient>
        <filter id={id + '-grain'}><feTurbulence type="fractalNoise" baseFrequency=".61" numOctaves="3" stitchTiles="stitch" /></filter>
        <filter id={id + '-mist'} x="-30%" y="-150%" width="160%" height="400%"><feGaussianBlur stdDeviation="19" /></filter>
      </defs>
      <rect width="1200" height="740" fill={`url(#${id}-sky)`} />
      <g className="far">
        <circle cx="921" cy="170" r="64" fill="#fff1bd" opacity=".9" />
        <path fill={distant} opacity=".62" d="M-100 377Q30 327 99 251T226 289T360 281T510 309T642 273T786 315T912 276T1065 288T1300 254V780H-100Z" />
        <path fill={pale} d="M-100 399Q46 353 130 382T305 335T466 365T649 336T824 360T998 324T1300 366V780H-100Z" />
        <path fill="none" stroke={ink} strokeWidth="2" opacity=".65" d="M955 242q9-10 18 0q9-10 18 0m19-16q7-7 14 0q7-7 14 0" />
      </g>
      <g className="mid">
        <path fill={middle} d={kind === 'peaks' ? peaks : hills} />
        <path fill={`url(#${id}-water)`} d="M-100 465Q83 391 225 434T510 458T791 441T1300 444V840H-100Z" />
        <g className="mist" fill={sky} opacity=".64" filter={`url(#${id}-mist)`}>
          <ellipse cx="780" cy="391" rx="315" ry="20" /><ellipse cx="260" cy="449" rx="250" ry="18" />
        </g>
        <g fill="none" stroke={middle} strokeWidth="1.4" opacity=".42">
          {Array.from({ length: 11 }, (_, i) => <path key={i} d={`M${52 + i * 29} ${479 + i * 17}Q${406 + i * 15} ${423 + i * 15} ${697 + i * 28} ${515 + i * 13}T1280 ${482 + i * 19}`} />)}
        </g>
        {kind === 'tea' ? (
          <g fill={ink} transform="translate(765 438)">
            <path d="M-65 11Q-35 6 0-30Q35 6 65 11ZM-49-16Q-25-22 0-50Q25-22 49-16ZM-43 9h8v42h-8zm78 0h8v42h-8zM-54 48H54v5H-54Z" />
          </g>
        ) : (
          <g transform="translate(738 526)" fill={ink}>
            <g className="boat">
              <path d="M-68 7Q0 18 61-2Q42 29-40 25ZM-11 11L-3-13Q9-22 19-10L29 9Z" />
              <circle cx="9" cy="-22" r="6" /><path d="M19-3l37-32" stroke={ink} strokeWidth="2" />
            </g>
          </g>
        )}
      </g>
      <g className="near">
        <path fill={middle} d="M-100 509Q68 460 180 518T346 550Q287 609 158 631T35 820H-100ZM1300 404Q1156 386 1080 478T939 531Q1036 553 1086 624T1300 731Z" />
        <path fill={ink} d="M-100 552Q83 483 201 566T298 592Q182 603 139 671T46 817H-100ZM1300 468Q1210 433 1127 526T1000 552Q1084 589 1119 650T1300 780Z" />
        <g fill={pale} opacity=".5">
          {Array.from({ length: 31 }, (_, i) => {
            const x = 1050 + (i * 29) % 157;
            const y = 555 + (i * 17) % 106;
            return <ellipse key={i} cx={x} cy={y} rx={7 + i % 11} ry="3" transform={`rotate(-31 ${x} ${y})`} />;
          })}
        </g>
      </g>
      <rect width="1200" height="740" filter={`url(#${id}-grain)`} opacity=".16" style={{ mixBlendMode: 'multiply' }} />
    </svg>
  );
}

export const photos = {
  huangshan: { id: 'huangshan', file: 'places/huangshan.webp', alt: 'Granite peaks and forested ridges on Huangshan', altChinese: '黄山的花岗岩峰峦和林木覆盖的山脊' },
  river: { credit: 'Zhimai Zhang', source: 'https://unsplash.com/photos/pBg2i0aUOec', id: '1557750223-53916b138a90', alt: 'The Li River winding between forest-covered karst mountains in Guilin', altChinese: '漓江蜿蜒穿过桂林林木覆盖的喀斯特群峰' },
  peaks: { credit: 'Jakub Tomasik', source: 'https://unsplash.com/photos/IUjIATAp2AA', id: '1740521532587-dd5938febf27', alt: 'Sunlit sandstone pillars and green forests in Zhangjiajie', altChinese: '阳光下的张家界砂岩石柱与森林', position: '50% 45%' },
  tea: { credit: 'Bluesea Tea', source: 'https://unsplash.com/photos/Av1C6l0KZbQ', id: '1767784821016-c7ae4951716f', alt: 'Rows of green Longjing tea terraces beneath the mountains in Hangzhou', altChinese: '杭州山脚下一排排翠绿的龙井茶园', position: '50% 60%' },
  beijing: { id: '1668333140118-84e827fe42ca', alt: 'The Great Wall winding over green hills in China', altChinese: '万里长城蜿蜒穿过青山', credit: 'Jeremy Huang', source: 'https://unsplash.com/photos/eTcSiwZYA-k' },
  shanghai: { id: '1538428494232-9c0d8a3ab403', alt: 'The Oriental Pearl Tower and Shanghai skyline across the Huangpu River', altChinese: '黄浦江对岸的东方明珠塔和上海天际线', credit: 'Shanghai photograph', source: 'https://unsplash.com/photos/uKyzXEc2k_s' },
  xian: { id: '1527922891260-918d42a4efc8', alt: 'Rows of Terracotta Army warriors near Xi’an', altChinese: '西安附近排列整齐的兵马俑', credit: 'Xi’an photograph', source: 'https://unsplash.com/photos/xZDWEEMS3sA' },
  chengdu: { id: '1572295269175-f18627ae9c41', alt: 'A giant panda resting on a wooden platform in Chengdu', altChinese: '成都一只在木平台上休息的大熊猫', credit: 'billow926', source: 'https://unsplash.com/photos/HFgxFulbsF4' },
};

export default function Scene({ kind = 'river', priority = false, fit = 'cover', language = 'en', photo: galleryPhoto, decorative = false, sizes }) {
  const [status, setStatus] = useState('loading');
  const photo = photos[kind] || photos.river;
  const image = galleryPhoto || photo;
  const localFile = image.file && `${import.meta.env.BASE_URL}${image.file}`;
  const id = image.id;
  const imageUrl = width => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=82`;
  return <div className={`scene landscape image-${status}`}>
    <Illustration kind={kind} fit={fit} />
    {status !== 'failed' && <img src={localFile || imageUrl(priority ? 2560 : 1440)}
      srcSet={localFile ? undefined : [240, 360, 640, 960, 1440, 1920, 2560].map(width => `${imageUrl(width)} ${width}w`).join(', ')}
      sizes={sizes ?? (priority ? '100vw' : '(max-width: 500px) 100vw, (max-width: 920px) 50vw, 33vw')}
      style={{ objectPosition: photo.position || '50% 50%' }}
      alt={decorative ? '' : galleryPhoto && galleryPhoto.id !== photo.id ? (language === 'zh-Hans' ? '目的地风景' : 'Destination scenery') : language === 'zh-Hans' ? photo.altChinese : photo.alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'}
      decoding="async" onLoad={() => setStatus('loaded')} onError={() => setStatus('failed')} />}
  </div>;
}
