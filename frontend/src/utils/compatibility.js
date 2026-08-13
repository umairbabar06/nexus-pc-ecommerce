// Socket to compatible RAM types mapping
const SOCKET_RAM_MAP = {
  'AM4': ['DDR4'],
  'AM5': ['DDR5'],
  'LGA1851': ['DDR5'],
  'LGA1700': ['DDR4', 'DDR5'],
  'LGA1200': ['DDR4'],
  'LGA1151': ['DDR4'],
  'LGA2066': ['DDR4'],
};

// Socket to platform mapping
const SOCKET_PLATFORM = {
  'AM4': 'AMD', 'AM5': 'AMD',
  'LGA1851': 'Intel', 'LGA1700': 'Intel', 'LGA1200': 'Intel', 'LGA1151': 'Intel', 'LGA2066': 'Intel',
};

// Case form factor compatibility (what mobos can fit in what cases)
const CASE_MOBO_COMPAT = {
  'Full Tower': ['E-ATX', 'ATX', 'Micro-ATX', 'Mini-ITX'],
  'Mid Tower': ['ATX', 'Micro-ATX', 'Mini-ITX'],
  'Mini Tower': ['Micro-ATX', 'Mini-ITX'],
  'Mini-ITX': ['Mini-ITX'],
};

export const checkSocketCompat = (cpu, mobo) => {
  if (!cpu || !mobo) return { compatible: true, message: '' };
  const cpuSocket = cpu.specs?.socket;
  const moboSocket = mobo.specs?.socket;
  if (!cpuSocket || !moboSocket) return { compatible: true, message: '' };
  
  if (cpuSocket !== moboSocket) {
    return { compatible: false, message: `Socket mismatch: CPU (${cpuSocket}) vs Motherboard (${moboSocket})` };
  }
  return { compatible: true, message: 'Socket match' };
};

export const checkRamCompat = (ram, mobo, cpu) => {
  if (!ram) return { compatible: true, message: '' };
  
  const ramType = ram.specs?.ramType;
  if (!ramType) return { compatible: true, message: '' };

  if (mobo && mobo.specs?.ramType) {
    if (mobo.specs.ramType !== ramType) {
      return { compatible: false, message: `RAM mismatch: Motherboard requires ${mobo.specs.ramType}, selected ${ramType}` };
    }
  } else if (cpu && cpu.specs?.socket) {
    const allowedRam = SOCKET_RAM_MAP[cpu.specs.socket] || [];
    if (allowedRam.length > 0 && !allowedRam.includes(ramType)) {
      return { compatible: false, message: `RAM mismatch: CPU Socket (${cpu.specs.socket}) supports ${allowedRam.join(' or ')}, selected ${ramType}` };
    }
  }
  return { compatible: true, message: 'RAM match' };
};

export const checkFormFactorCompat = (casing, mobo) => {
  if (!casing || !mobo) return { compatible: true, message: '' };
  const caseFF = casing.specs?.formFactor;
  const moboFF = mobo.specs?.formFactor;
  if (!caseFF || !moboFF) return { compatible: true, message: '' };

  const allowed = CASE_MOBO_COMPAT[caseFF] || [];
  if (!allowed.includes(moboFF)) {
    return { compatible: false, message: `Form Factor mismatch: Case (${caseFF}) does not support Motherboard (${moboFF})` };
  }
  return { compatible: true, message: 'Form Factor match' };
};

export const checkCoolerCompat = (cooler, cpu) => {
  if (!cooler || !cpu) return { compatible: true, message: '' };
  const coolerSockets = cooler.specs?.socket || cooler.specs?.sockets || '';
  const cpuSocket = cpu.specs?.socket;
  
  if (!coolerSockets || !cpuSocket) return { compatible: true, message: '' };

  if (Array.isArray(coolerSockets)) {
    if (!coolerSockets.some(s => s.toLowerCase() === cpuSocket.toLowerCase())) {
        return { compatible: false, message: `Cooler does not support CPU socket ${cpuSocket}` };
    }
  } else if (typeof coolerSockets === 'string') {
    if (!coolerSockets.toLowerCase().includes(cpuSocket.toLowerCase())) {
      return { compatible: false, message: `Cooler does not support CPU socket ${cpuSocket}` };
    }
  }

  return { compatible: true, message: 'Cooler match' };
};

export const estimatePowerDraw = (selections) => {
  let wattage = 50; // System overhead

  if (selections.cpu) {
    const name = selections.cpu.name.toLowerCase();
    if (name.includes('i9') || name.includes('ryzen 9')) wattage += 150;
    else if (name.includes('i7') || name.includes('ryzen 7')) wattage += 125;
    else if (name.includes('i5') || name.includes('ryzen 5')) wattage += 105;
    else if (name.includes('i3') || name.includes('ryzen 3')) wattage += 65;
    else wattage += 95;
  }

  if (selections.gpu) {
    const name = selections.gpu.name.toLowerCase();
    if (name.includes('4090') || name.includes('7900') || name.includes('4080')) wattage += 350;
    else if (name.includes('4070') || name.includes('7800')) wattage += 250;
    else if (name.includes('4060') || name.includes('7600') || name.includes('3060')) wattage += 150;
    else if (name.includes('6500') || name.includes('1650')) wattage += 75;
    else wattage += 150;
  }

  if (selections.ram) wattage += 10; // Assume 2 sticks
  if (selections.ssd) wattage += 7;
  if (selections.hdd) wattage += 10;
  if (selections.mobo) wattage += 50;
  
  if (selections.cooler) {
    const name = selections.cooler.name.toLowerCase();
    if (name.includes('aio') || name.includes('liquid')) wattage += 15;
    else wattage += 5;
  }

  return wattage;
};

export const checkPsuCompat = (psu, estimatedWattage) => {
  if (!psu) return { sufficient: true, headroom: 0, status: 'good', message: '' };
  
  const psuWattage = parseInt(psu.specs?.wattage || psu.name.match(/\d+W/i)?.[0] || 0, 10);
  if (!psuWattage) return { sufficient: true, headroom: 0, status: 'good', message: '' };

  const headroom = psuWattage - estimatedWattage;
  if (headroom >= 100) {
    return { sufficient: true, headroom, status: 'good', message: `PSU has sufficient headroom (${headroom}W free).` };
  } else if (headroom >= 0) {
    return { sufficient: true, headroom, status: 'tight', message: `PSU capacity is tight (${headroom}W free). Consider upgrading.` };
  } else {
    return { sufficient: false, headroom, status: 'insufficient', message: `PSU capacity is insufficient. You need at least ${estimatedWattage}W.` };
  }
};

export const getAllWarnings = (selections) => {
  const warnings = [];

  const socketCheck = checkSocketCompat(selections.cpu, selections.mobo);
  if (!socketCheck.compatible) warnings.push({ type: 'error', message: socketCheck.message });
  else if (selections.cpu && selections.mobo) warnings.push({ type: 'success', message: socketCheck.message });

  const ramCheck = checkRamCompat(selections.ram, selections.mobo, selections.cpu);
  if (!ramCheck.compatible) warnings.push({ type: 'error', message: ramCheck.message });
  else if (selections.ram && (selections.mobo || selections.cpu)) warnings.push({ type: 'success', message: ramCheck.message });

  const ffCheck = checkFormFactorCompat(selections.casing, selections.mobo);
  if (!ffCheck.compatible) warnings.push({ type: 'error', message: ffCheck.message });

  const coolerCheck = checkCoolerCompat(selections.cooler, selections.cpu);
  if (!coolerCheck.compatible) warnings.push({ type: 'error', message: coolerCheck.message });

  if (selections.psu) {
    const power = estimatePowerDraw(selections);
    const psuCheck = checkPsuCompat(selections.psu, power);
    if (psuCheck.status === 'insufficient') {
      warnings.push({ type: 'error', message: psuCheck.message });
    } else if (psuCheck.status === 'tight') {
      warnings.push({ type: 'warning', message: psuCheck.message });
    }
  }

  return warnings;
};

export const getCompatibilityFilters = (selections, targetCategory) => {
  const filters = {};

  // Determine the active socket from existing selections
  const activeSocket = selections.cpu?.specs?.socket || selections.mobo?.specs?.socket;

  switch (targetCategory) {
    case 'cpu':
      // If mobo is selected, only show CPUs with matching socket
      if (selections.mobo?.specs?.socket) {
        filters.socket = selections.mobo.specs.socket;
      }
      break;

    case 'mobo':
      // If CPU is selected, only show mobos with matching socket
      if (selections.cpu?.specs?.socket) {
        filters.socket = selections.cpu.specs.socket;
      }
      // If case is selected, only show mobos that fit in the case
      if (selections.casing?.specs?.formFactor) {
        const supported = CASE_MOBO_COMPAT[selections.casing.specs.formFactor];
        if (supported?.length) filters.formFactor = supported.join(',');
      }
      // If RAM is selected, only show mobos that support that RAM type
      if (selections.ram?.specs?.ramType) {
        filters.ramType = selections.ram.specs.ramType;
      }
      break;

    case 'ram':
      // If mobo has explicit ramType, use it
      if (selections.mobo?.specs?.ramType) {
        filters.ramType = selections.mobo.specs.ramType;
      } else if (activeSocket && SOCKET_RAM_MAP[activeSocket]) {
        // Infer from socket — send all compatible types
        filters.ramType = SOCKET_RAM_MAP[activeSocket].join(',');
      }
      break;

    case 'casing':
      // If mobo is selected, only show cases that fit the mobo
      if (selections.mobo?.specs?.formFactor) {
        const moboFF = selections.mobo.specs.formFactor;
        const compatibleCases = Object.entries(CASE_MOBO_COMPAT)
          .filter(([, supported]) => supported.includes(moboFF))
          .map(([caseFF]) => caseFF);
        if (compatibleCases.length) filters.formFactor = compatibleCases.join(',');
      }
      break;

    case 'cooler':
      // Coolers support many sockets and don't have a strict specs.socket in DB
      // We will show all coolers and let the user pick, compatibility check will warn if needed.
      break;

    // gpu, ssd, hdd, psu — no compatibility filters needed
    default:
      break;
  }

  return filters;
};
