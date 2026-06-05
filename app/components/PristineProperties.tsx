'use client';

import React, { useState } from 'react';

interface PristineProperty {
  id: string;
  name: string;
  category: 'monolith' | 'sanctuary' | 'penthouse';
  description: string;
  price: string;
  location: string;
  airPurity: string;
  symmetryRatio: string;
  dimensions: string;
  features: string[];
  image: string;
  videoUrl: string;
  hygieneRating: number;
}

export default function PristineProperties() {
  const [activeTab, setActiveTab] = useState<'all' | 'monolith' | 'sanctuary' | 'penthouse'>('all');
  const [selectedProperty, setSelectedProperty] = useState<PristineProperty | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [activePurifierMode, setActivePurifierMode] = useState<boolean>(true);

  // Purity Calculator States
  const [airCycles, setAirCycles] = useState<number>(12);
  const [sunlightHours, setSunlightHours] = useState<number>(8);
  const [dustShieldLevel, setDustShieldLevel] = useState<number>(3);

  // Booking States
  const [bookingForm, setBookingForm] = useState({ fullName: '', contactAura: '', visitDate: '', pledgeCleanliness: false });
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const pristineProperties: PristineProperty[] = [
    {
      id: 'pristine-1',
      name: 'The Alabaster Monolith',
      category: 'monolith',
      description: 'คฤหาสน์หินอ่อนสีขาวบริสุทธิ์ไร้รอยต่อ โครงสร้างได้รับการปรับแต่งตามหลักเรขาคณิตสมมาตรขั้นสูงสุด ปราศจากมุมสะสมฝุ่น ติดตั้งเทคโนโลยีม่านอากาศแรงดันบวกป้องกันฝุ่นละอองจากภายนอก 100%',
      price: '120,000,000 THB',
      location: 'Symmetric Hills, Zone A',
      airPurity: '99.999% Zero-Dust Shield',
      symmetryRatio: '1:1.618 Absolute Symmetry',
      dimensions: '1,450 SQ.M.',
      features: ['ระบบกรองอากาศคาร์บอนระดับการแพทย์', 'ผนังหินกระจกกระจายแสงธรรมชาติ', 'สระน้ำเกลือไอออนขจัดสารพิษ', 'หุ่นยนต์ดูแลความสะอาดอัตโนมัติรอบด้าน'],
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-minimalist-design-and-white-furniture-40330-large.mp4',
      hygieneRating: 100
    },
    {
      id: 'pristine-2',
      name: 'The Luminescent Sanctuary',
      category: 'sanctuary',
      description: 'วิหารพักผ่อนส่วนตัวที่ห้อมล้อมด้วยระบบกระจกใสเคลือบสารนาโนอัจฉริยะ ทำความสะอาดตัวเองได้เมื่อสัมผัสแสงแดด ภายในควบคุมอุณหภูมิและความชื้นสัมพัทธ์ที่ 50% ตลอดปี ป้องกันแบคทีเรียและเชื้อราทุกชนิด',
      price: '185,000,000 THB',
      location: 'Pure-Air Coastline, Sector 1',
      airPurity: '99.997% Ultra HEPA',
      symmetryRatio: '1:1.000 Perfect Balance',
      dimensions: '2,100 SQ.M.',
      features: ['กระจกบานใหญ่ระบบกระจายแสงยูวีฆ่าเชื้อ', 'สวนพฤกษศาสตร์ควบคุมละอองเกสร', 'ห้องอาบน้ำแร่ประจุลบบำบัดผิวพรรณ', 'ระบบทำความสะอาดท่อน้ำปราศจากคลอรีน'],
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-interior-of-a-modern-white-living-room-with-sofa-41584-large.mp4',
      hygieneRating: 100
    },
    {
      id: 'pristine-3',
      name: 'The Platinum Glass Penthouse',
      category: 'penthouse',
      description: 'ห้องเพนท์เฮาส์ระนาบระเบียงกว้างพิเศษ ออกแบบเรียงตัวตามทิศทางลมธรรมชาติเพื่อการถ่ายเทหมุนเวียนอากาศอันสะอาดสดชื่น อัญเชิญแสงสว่างส่องทั่วถึงทุกตารางนิ้ว ขจัดมุมอับทึบอย่างสมบูรณ์แบบ',
      price: '95,000,000 THB',
      location: 'Metropolitan Clean-Air Hub',
      airPurity: '99.995% Plasma-Wave',
      symmetryRatio: '1:1.618 Aesthetic Golden',
      dimensions: '980 SQ.M.',
      features: ['ระบบพ่นสเปรย์ฆ่าเชื้อโรคแบบแสงอัตโนมัติ', 'ชุดครัวสเตนเลสสตีลเกรดสุญญากาศ', 'ห้องสปาและดีท็อกซ์พลังงานสั่นสะเทือน', 'เครื่องควบคุมความชื้นอัจฉริยะแยกจุด'],
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-camera-moving-through-a-modern-white-living-room-41585-large.mp4',
      hygieneRating: 100
    }
  ];

  const filteredProperties = activeTab === 'all'
    ? pristineProperties
    : pristineProperties.filter(p => p.category === activeTab);

  const airQualityPercentage = Math.min(100, Math.round(90 + (airCycles * 0.5) + (dustShieldLevel * 1.5)));
  const totalScore = ((airQualityPercentage + 100 + (sunlightHours * 1.2)) / 2.1).toFixed(3);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBookInspection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.fullName || !bookingForm.contactAura || !bookingForm.pledgeCleanliness) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsBooked(true);
      setIsProcessing(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans selection:bg-[#E2E8F0] selection:text-[#0F172A] overflow-x-hidden relative">
      
      {/* Floating Pristine Aesthetic Rings */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-amber-50/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-slate-100/60 rounded-full blur-[150px] pointer-events-none" />

      {/* Modern Grid Wireframe Lines */}
      <div className="hidden lg:block fixed inset-6 border border-slate-200/50 rounded-2xl pointer-events-none z-50">
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-slate-300" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-slate-300" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-slate-300" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-slate-300" />
      </div>

      {/* Navigation */}
      <nav className="relative z-40 border-b border-slate-200/60 bg-white/70 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-200 via-white to-sky-200 p-[1.5px] flex items-center justify-center shadow-sm">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <span className="text-amber-500 text-xs font-bold font-serif">✧</span>
              </div>
            </div>
            <div>
              <span className="text-lg font-bold tracking-[0.2em] text-slate-900 font-serif">VALERIA</span>
              <span className="block text-[8px] tracking-[0.35em] text-amber-600 font-mono uppercase font-bold">PRISTINE REALM</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-[11px] font-mono tracking-widest text-slate-600">
            <a href="#properties" className="hover:text-amber-600 transition-colors">01. THE LISTINGS</a>
            <a href="#hygiene" className="hover:text-amber-600 transition-colors">02. PURITY METRIC</a>
            <a href="#booking" className="hover:text-amber-600 transition-colors">03. BOOK SANCTUM</a>
            <a href="https://microtronic-thailand.github.io/micro-payment/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors">04. DONATE & PAYMENT</a>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActivePurifierMode(!activePurifierMode)}
              className={`px-3 py-1.5 rounded-full border text-[9px] font-mono tracking-widest transition-all duration-300 ${
                activePurifierMode 
                  ? 'bg-sky-50 text-sky-600 border-sky-200 shadow-sm shadow-sky-100' 
                  : 'bg-slate-100 text-slate-400 border-slate-200'
              }`}
            >
              <span className="inline-block w-1.5 h-1.5 bg-sky-500 rounded-full animate-ping mr-1.5 align-middle" />
              AIR FILTRATION: {activePurifierMode ? '100% STERILE' : 'STANDBY'}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">

        {activePurifierMode && (
          <div className="mb-8 p-3.5 bg-gradient-to-r from-sky-50/50 via-white to-amber-50/30 border border-slate-200/50 rounded-xl text-center text-xs font-mono text-slate-600 shadow-sm flex items-center justify-center gap-2 animate-pulse">
            <span>✨</span>
            <span>สภาพแวดล้อมได้รับการฆ่าเชื้อด้วยประจุไออนลบและระบบรังสียูวีซีความเข้มข้นต่ำเรียบร้อยแล้ว</span>
            <span>✨</span>
          </div>
        )}

        {/* Hero Section */}
        <section className="relative my-10 rounded-2xl border border-slate-200/60 bg-white p-8 md:p-16 overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-100/25 to-transparent rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-mono text-amber-700 font-bold tracking-wider">
                ✧ THE ABSOLUTE ORDER ✧
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold font-serif leading-tight tracking-wide text-slate-900">
                วิหารแห่งแสง <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">
                  และความเป็นระเบียบอันไร้ที่ติ
                </span>
              </h1>

              <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                ยินดีต้อนรับสู่สวรรค์แห่งความสะอาดสมบูรณ์แบบ แหล่งรวมพื้นที่อยู่อาศัยที่ได้รับการออกแบบมาเพื่อผู้รักสุขอนามัย ความเป็นระเบียบสมมาตร และเทคโนโลยีขจัดฝุ่นละอองในระดับอณู
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a 
                  href="#properties" 
                  className="px-6 py-3 bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-mono tracking-widest uppercase rounded transition-all shadow-md shadow-slate-200"
                >
                  เปิดทำเนียบอสังหาฯ สะอาดสูงสุด
                </a>
                <a 
                  href="#hygiene" 
                  className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-mono text-xs tracking-widest uppercase rounded transition-all"
                >
                  วิเคราะห์เครื่องวัดความบริสุทธิ์
                </a>
              </div>
            </div>

            <div className="relative flex justify-center items-center">
              <div className="relative w-full max-w-[380px] h-[380px] bg-gradient-to-tr from-sky-50 via-white to-amber-50/50 rounded-3xl p-6 border border-slate-200/80 shadow-md flex flex-col justify-between">
                
                <div className="text-center text-[10px] font-mono text-slate-400 tracking-widest">
                  AIR QUALITY CONTROL SYSTEM
                </div>

                <div className="my-auto flex flex-col items-center justify-center">
                  <div className="w-36 h-36 rounded-full bg-white border-4 border-double border-amber-300/60 flex items-center justify-center shadow-lg shadow-sky-100 relative">
                    <div className="absolute inset-2 rounded-full border border-dashed border-sky-200 animate-[spin_40s_linear_infinite]" />
                    <div className="text-center z-10">
                      <span className="block text-[10px] font-mono text-sky-500 tracking-wider">PM 2.5</span>
                      <span className="text-3xl font-serif font-bold text-slate-800">0.0</span>
                      <span className="block text-[8px] font-mono text-slate-400 uppercase mt-0.5">AQI PERFECT</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-serif italic mt-4 text-center">
                    "ไร้ฝุ่นละออง ปราศจากเชื้อไวรัส นำมาซึ่งความผ่อนคลายที่แท้จริง"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center text-[10px] font-mono pt-4 border-t border-slate-100">
                  <div className="border-r border-slate-100">
                    <span className="text-slate-400 block">HUMIDITY</span>
                    <span className="text-slate-700 font-semibold">50.0% RH</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">TEMPERATURE</span>
                    <span className="text-slate-700 font-semibold">24.5 °C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Properties Section */}
        <section id="properties" className="my-16 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200/60">
            <div>
              <h2 className="text-2xl font-serif text-slate-800 tracking-wide font-bold">
                I. ทำเนียบวิหารแห่งระเบียบความสมมาตร
              </h2>
              <p className="text-xs font-mono text-amber-600 mt-1 uppercase tracking-widest">
                PRECISELY CLEAN PROPERTIES VERIFIED BY MADAME VALERIA
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 md:mt-0 font-mono text-xs">
              {(['all', 'monolith', 'sanctuary', 'penthouse'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 border rounded-full transition-all uppercase tracking-wider ${
                    activeTab === tab
                      ? 'bg-amber-500 text-slate-900 border-amber-400 font-bold'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-800'
                  }`}
                >
                  {tab === 'all' ? '✦ ALL REALMS' : tab === 'monolith' ? '🏰 MONOLITH' : tab === 'sanctuary' ? '🌿 SANCTUARY' : '🏙️ PENTHOUSE'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {filteredProperties.map(prop => (
              <div 
                key={prop.id}
                onClick={() => setSelectedProperty(prop)}
                className="group relative bg-white border border-slate-200/80 hover:border-amber-400/60 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md cursor-pointer"
              >
                
                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-md border border-sky-300 rounded-full text-[9px] font-mono text-sky-600 tracking-widest uppercase font-bold shadow-sm">
                  ❄️ {prop.hygieneRating}% STERILE
                </div>

                <div className="h-64 relative overflow-hidden bg-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent z-10" />
                  <img 
                    src={prop.image} 
                    alt={prop.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                  />
                </div>

                <div className="p-6 space-y-4 relative">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono text-amber-600 uppercase tracking-widest">{prop.location}</span>
                    <button 
                      onClick={(e) => toggleFavorite(prop.id, e)}
                      className="text-amber-500 hover:scale-110 transition-transform text-xs"
                    >
                      {favorites[prop.id] ? '★ FAVORITE' : '☆ ADD'}
                    </button>
                  </div>

                  <h3 className="text-xl font-serif text-slate-800 group-hover:text-amber-600 transition-colors font-bold">
                    {prop.name}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {prop.description}
                  </p>

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-mono">
                    <div>
                      <span className="block text-[8px] text-slate-400 uppercase">AIR</span>
                      <span className="text-sky-600 font-semibold text-[9px]">{prop.airPurity}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[8px] text-slate-400 uppercase">SYMMETRY</span>
                      <span className="text-amber-600 font-semibold text-[9px]">{prop.symmetryRatio}</span>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-slate-50 hover:bg-amber-500 hover:text-slate-900 border border-slate-200 text-[10px] font-mono tracking-wider uppercase transition-all rounded-lg">
                    🔬 ตรวจสอบ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Property Modal */}
        {selectedProperty && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-slate-200 w-full max-w-4xl rounded-2xl overflow-hidden relative shadow-2xl">
              
              <button 
                onClick={() => { setSelectedProperty(null); setIsPlayingVideo(false); }}
                className="absolute top-4 right-4 z-50 w-8 h-8 bg-white border border-slate-200 text-slate-400 rounded-full flex items-center justify-center hover:bg-[#0F172A] hover:text-white transition-colors text-xs font-mono"
              >
                ✕
              </button>

              <div className="grid md:grid-cols-2">
                
                <div className="relative bg-slate-50 min-h-[300px] flex items-center justify-center border-r border-slate-100">
                  {!isPlayingVideo ? (
                    <>
                      <img 
                        src={selectedProperty.image} 
                        alt={selectedProperty.name}
                        className="w-full h-full object-cover absolute inset-0 opacity-95" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-slate-900/10 flex flex-col justify-end p-6 z-20">
                        <button 
                          onClick={() => setIsPlayingVideo(true)}
                          className="mx-auto w-14 h-14 rounded-full bg-white hover:bg-amber-500 text-slate-800 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all mb-4"
                        >
                          <svg className="w-6 h-6 fill-current text-amber-600" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full relative flex flex-col justify-between bg-black z-10">
                      <video 
                        src={selectedProperty.videoUrl} 
                        autoPlay 
                        loop 
                        controls 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="p-8 space-y-6 max-h-[580px] overflow-y-auto">
                  <div>
                    <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[9px] font-mono uppercase font-bold">
                      {selectedProperty.category}
                    </span>
                    <h2 className="text-2xl font-serif text-slate-900 mt-2 font-bold">{selectedProperty.name}</h2>
                    <p className="text-xs text-slate-400 font-mono mt-1">📍 {selectedProperty.location}</p>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {selectedProperty.description}
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-xs font-mono text-slate-800 uppercase tracking-wider font-bold">Specifications</h4>
                    <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div>
                        <span className="block text-[8px] text-slate-400">DIMENSION</span>
                        <span className="text-slate-700 font-semibold">{selectedProperty.dimensions}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] text-slate-400">CLEANROOM</span>
                        <span className="text-sky-600 font-semibold">ISO Class 5</span>
                      </div>
                      <div className="col-span-2">
                        <span className="block text-[8px] text-slate-400 mb-1">Features</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedProperty.features.map((f, i) => (
                            <span key={i} className="bg-white border border-slate-200 text-slate-600 text-[9px] px-2 py-0.5 rounded-full">
                              ✓ {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase">PRICE</span>
                      <span className="text-lg font-serif text-amber-600 font-bold">{selectedProperty.price}</span>
                    </div>
                    <a
                      href="#booking"
                      onClick={() => setSelectedProperty(null)}
                      className="px-4 py-2.5 bg-[#0F172A] text-white text-xs font-mono font-bold tracking-wider uppercase rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Purity Calculator Section */}
        <section id="hygiene" className="my-16 scroll-mt-20">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              <div className="space-y-6">
                <h3 className="text-2xl font-serif text-slate-800 font-bold">
                  II. Sanctuary Purity Index Calculator
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-600 uppercase mb-2">
                      Air Cycles per Hour: {airCycles}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="24"
                      value={airCycles}
                      onChange={(e) => setAirCycles(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-600 uppercase mb-2">
                      Sunlight Hours Daily: {sunlightHours}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="24"
                      value={sunlightHours}
                      onChange={(e) => setSunlightHours(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-600 uppercase mb-2">
                      Dust Shield Level: {dustShieldLevel}/5
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={dustShieldLevel}
                      onChange={(e) => setDustShieldLevel(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-5xl font-serif font-bold text-amber-600">{airQualityPercentage}%</div>
                  <div className="text-xs font-mono text-slate-600">Overall Air Quality Score</div>
                  <div className="text-3xl font-serif text-sky-600">{totalScore}</div>
                  <div className="text-xs font-mono text-slate-500">Composite Purity Index</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Section */}
        <section id="booking" className="my-16 scroll-mt-20">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-serif text-slate-800 font-bold mb-8">
              III. Book Your Sanctum Inspection
            </h3>

            {isBooked ? (
              <div className="text-center py-12 space-y-4">
                <div className="text-5xl">✓</div>
                <h4 className="text-xl font-serif text-slate-900 font-bold">Booking Confirmed!</h4>
                <p className="text-sm text-slate-600">Your inspection has been scheduled. We will contact you soon.</p>
                <button
                  onClick={() => setIsBooked(false)}
                  className="px-6 py-2 bg-amber-500 text-white rounded-lg font-mono text-xs uppercase"
                >
                  Book Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookInspection} className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-xs font-mono text-slate-600 uppercase mb-2">Full Name</label>
                  <input
                    type="text"
                    value={bookingForm.fullName}
                    onChange={(e) => setBookingForm({ ...bookingForm, fullName: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-600 uppercase mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={bookingForm.contactAura}
                    onChange={(e) => setBookingForm({ ...bookingForm, contactAura: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-600 uppercase mb-2">Preferred Visit Date</label>
                  <input
                    type="date"
                    value={bookingForm.visitDate}
                    onChange={(e) => setBookingForm({ ...bookingForm, visitDate: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={bookingForm.pledgeCleanliness}
                    onChange={(e) => setBookingForm({ ...bookingForm, pledgeCleanliness: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-xs text-slate-600">I pledge to maintain perfect cleanliness standards</span>
                </label>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3 bg-[#0F172A] text-white font-mono text-xs uppercase font-bold rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-all"
                >
                  {isProcessing ? 'Processing...' : 'Confirm Booking'}
                </button>
              </form>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}
