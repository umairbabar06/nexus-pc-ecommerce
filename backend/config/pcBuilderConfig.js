module.exports = {
  SOCKET_RAM_COMPAT: {
    'AM4': ['DDR4'],
    'AM5': ['DDR5'],
    'LGA1851': ['DDR5'],
    'LGA1700': ['DDR4', 'DDR5'],
    'LGA1200': ['DDR4'],
    'LGA1151': ['DDR4'],
    'LGA2066': ['DDR4']
  },
  SOCKET_PLATFORM: {
    'AM4': 'AMD',
    'AM5': 'AMD',
    'LGA1851': 'Intel',
    'LGA1700': 'Intel',
    'LGA1200': 'Intel',
    'LGA1151': 'Intel',
    'LGA2066': 'Intel'
  },
  FORM_FACTOR_COMPAT: {
    'Full Tower': ['E-ATX', 'ATX', 'Micro-ATX', 'Mini-ITX'],
    'Mid Tower': ['ATX', 'Micro-ATX', 'Mini-ITX'],
    'Mini Tower': ['Micro-ATX', 'Mini-ITX'],
    'Mini-ITX': ['Mini-ITX']
  },
  POWER_ESTIMATES: {
    cpu: { 
      default: 95, 
      low: 65, 
      mid: 105, 
      high: 125, 
      detectTier(name) {
        if (!name) return 'default';
        if (/i9|Ryzen 9|Threadripper/i.test(name)) return 'high';
        if (/i7|Ryzen 7/i.test(name)) return 'mid';
        if (/i3|Ryzen 3|Celeron|Pentium/i.test(name)) return 'low';
        return 'default';
      } 
    },
    gpu: { 
      default: 150, 
      low: 75, 
      mid: 150, 
      high: 250, 
      ultra: 350, 
      detectTier(name) {
        if (!name) return 'default';
        if (/4090|3090|7900\s*XTX|4080|7900\s*XT/i.test(name)) return 'ultra';
        if (/4070|3080|7800|6800|3070|6700/i.test(name)) return 'high';
        if (/4060|3060|7600|6600|2060/i.test(name)) return 'mid';
        if (/1650|1050|1030|6400/i.test(name)) return 'low';
        return 'default';
      } 
    },
    ram: 5,
    ssd: 7,
    hdd: 10,
    mobo: 50,
    cooler: { air: 5, aio: 15 },
    cooling_fans: 3,
    overhead: 50
  },
  PC_BUILDER_CATEGORIES: [
    { key: 'cpu', label: 'Processor (CPU)', category: 'cpu', required: true, icon: '⚡' },
    { key: 'mobo', label: 'Motherboard', category: 'mobo', required: true, icon: '🔲' },
    { key: 'ram', label: 'Memory (RAM)', category: 'ram', required: true, icon: '🧩' },
    { key: 'gpu', label: 'Graphics Card (GPU)', category: 'gpu', required: false, icon: '🎮' },
    { key: 'ssd', label: 'SSD Storage', category: 'ssd', required: false, icon: '💾' },
    { key: 'hdd', label: 'HDD Storage', category: 'hdd', required: false, icon: '💿' },
    { key: 'psu', label: 'Power Supply (PSU)', category: 'psu', required: true, icon: '🔌' },
    { key: 'casing', label: 'PC Case', category: 'casing', required: false, icon: '🖥️' },
    { key: 'cooler', label: 'CPU Cooler', category: 'cooler', required: false, icon: '❄️' }
  ]
};
