/**
 * fix-sockets-and-names.js
 * 
 * Comprehensive migration script that:
 * 1. Fixes socket specs on ALL CPUs and motherboards using chipset/series detection
 * 2. Prepends "AMD" to Ryzen CPU names (if not already present)
 * 3. Appends socket info to CPU names (e.g., "[AM4]", "[AM5]", "[LGA1700]")
 * 4. Appends socket info to motherboard names
 * 
 * Run: node scripts/fix-sockets-and-names.js
 * Safe to run multiple times.
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Product  = require('../models/Product');

// ── Chipset → Socket mapping for motherboards ────────────────────────────────
const MOBO_CHIPSET_SOCKET = {
  // AMD AM4
  'A320': 'AM4', 'B350': 'AM4', 'X370': 'AM4',
  'B450': 'AM4', 'X470': 'AM4',
  'A520': 'AM4', 'B550': 'AM4', 'X570': 'AM4',
  // AMD AM5
  'A620': 'AM5', 'B650': 'AM5', 'B650E': 'AM5',
  'X670': 'AM5', 'X670E': 'AM5',
  'B850': 'AM5', 'X870': 'AM5', 'X870E': 'AM5',
  // Intel LGA1200 (10th/11th gen)
  'H410': 'LGA1200', 'B460': 'LGA1200', 'H470': 'LGA1200', 'Z490': 'LGA1200',
  'H510': 'LGA1200', 'B560': 'LGA1200', 'H570': 'LGA1200', 'Z590': 'LGA1200',
  // Intel LGA1700 (12th/13th/14th gen)
  'H610': 'LGA1700', 'B660': 'LGA1700', 'H670': 'LGA1700', 'Z690': 'LGA1700',
  'B760': 'LGA1700', 'H770': 'LGA1700', 'Z790': 'LGA1700',
  // Intel LGA1851 (Core Ultra / Arrow Lake)
  'Z890': 'LGA1851', 'B860': 'LGA1851', 'H810': 'LGA1851',
  // Intel LGA1151 (8th/9th gen)
  'H310': 'LGA1151', 'B360': 'LGA1151', 'H370': 'LGA1151', 'Z370': 'LGA1151', 'Z390': 'LGA1151',
};

// ── CPU detection rules ──────────────────────────────────────────────────────
function detectCpuSocket(name) {
  const n = name;

  // Already has explicit socket in name
  if (/\bAM5\b/i.test(n))            return 'AM5';
  if (/\bAM4\b/i.test(n))            return 'AM4';
  if (/\bLGA\s*1851\b/i.test(n))     return 'LGA1851';
  if (/\bLGA\s*1700\b/i.test(n))     return 'LGA1700';
  if (/\bLGA\s*1200\b/i.test(n))     return 'LGA1200';
  if (/\bLGA\s*1151\b/i.test(n))     return 'LGA1151';

  // Intel Core Ultra series → LGA1851
  if (/Core\s*Ultra/i.test(n))       return 'LGA1851';
  if (/Ultra\s*[2579]\s*2\d{2}/i.test(n)) return 'LGA1851';

  // AMD Ryzen — detect from model number
  // Ryzen 9000/8000/7000 series → AM5
  if (/Ryzen\s*[3579]\s*9\d{3}/i.test(n)) return 'AM5';
  if (/Ryzen\s*[3579]\s*8\d{3}/i.test(n)) return 'AM5';
  if (/Ryzen\s*[3579]\s*7\d{3}/i.test(n)) return 'AM5';
  // Ryzen 5000/3000/2000/1000 series → AM4
  if (/Ryzen\s*[3579]\s*5\d{3}/i.test(n)) return 'AM4';
  if (/Ryzen\s*[3579]\s*3\d{3}/i.test(n)) return 'AM4';
  if (/Ryzen\s*[3579]\s*2\d{3}/i.test(n)) return 'AM4';
  if (/Ryzen\s*[3579]\s*1\d{3}/i.test(n)) return 'AM4';
  // Threadripper → varies but most are sTRX4/sWRX8, skip for now
  if (/Threadripper/i.test(n))       return 'AM4';

  // Intel Core i-series — detect from generation
  // 14th gen (i-14xxx) → LGA1700
  if (/Core\s*i[3579][- ]*14\d{3}/i.test(n)) return 'LGA1700';
  // 12th/13th gen → LGA1700
  if (/Core\s*i[3579][- ]*1[23]\d{3}/i.test(n)) return 'LGA1700';
  // 10th/11th gen → LGA1200
  if (/Core\s*i[3579][- ]*1[01]\d{3}/i.test(n)) return 'LGA1200';
  // 8th/9th gen → LGA1151
  if (/Core\s*i[3579][- ]*[89]\d{3}/i.test(n))  return 'LGA1151';

  // Celeron/Pentium — harder to pin, skip
  return null;
}

// ── Motherboard socket detection from chipset ────────────────────────────────
function detectMoboSocket(name) {
  const n = name;

  // Check explicit socket first
  if (/\bAM5\b/i.test(n))            return 'AM5';
  if (/\bAM4\b/i.test(n))            return 'AM4';
  if (/\bLGA\s*1851\b/i.test(n))     return 'LGA1851';
  if (/\bLGA\s*1700\b/i.test(n))     return 'LGA1700';
  if (/\bLGA\s*1200\b/i.test(n))     return 'LGA1200';
  if (/\bLGA\s*1151\b/i.test(n))     return 'LGA1151';

  // Detect from chipset — sort by longest key first to match B650E before B650
  const sortedChipsets = Object.keys(MOBO_CHIPSET_SOCKET).sort((a, b) => b.length - a.length);
  for (const chipset of sortedChipsets) {
    // Use word boundary to avoid partial matches (e.g., "B650" in "B6500")
    const regex = new RegExp(`\\b${chipset}\\b`, 'i');
    if (regex.test(n)) {
      return MOBO_CHIPSET_SOCKET[chipset];
    }
  }

  return null;
}

// ── Determine if CPU is AMD ──────────────────────────────────────────────────
function isAmdCpu(name) {
  return /Ryzen|AMD|Threadripper/i.test(name);
}

function isIntelCpu(name) {
  return /Intel|Core\s*i[3579]|Core\s*Ultra|Celeron|Pentium|Xeon/i.test(name);
}

// ── Main runner ──────────────────────────────────────────────────────────────
async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected:', process.env.MONGO_URI);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STEP 1: Fix CPUs
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n═══ STEP 1: Fixing CPU names & sockets ═══\n');
  const cpus = await Product.find({ category: 'cpu', deleted_at: null });
  let cpuUpdated = 0;

  for (const cpu of cpus) {
    let name = cpu.name;
    const changes = {};
    let dirty = false;

    // Detect socket
    const socket = detectCpuSocket(name);
    if (socket && cpu.specs?.socket !== socket) {
      changes.specs = { ...(cpu.specs || {}), socket };
      dirty = true;
    }

    // Add "AMD" prefix to Ryzen CPUs if not already present
    if (isAmdCpu(name) && !name.startsWith('AMD')) {
      name = `AMD ${name}`;
      dirty = true;
    }

    // Add "Intel" prefix to Intel CPUs if not already present
    if (isIntelCpu(cpu.name) && !name.startsWith('Intel')) {
      name = `Intel ${name}`;
      dirty = true;
    }

    // Append socket tag if not already in name
    const finalSocket = socket || cpu.specs?.socket;
    if (finalSocket && !new RegExp(`\\[${finalSocket}\\]`, 'i').test(name) && !new RegExp(`\\b${finalSocket}\\b`, 'i').test(name)) {
      name = `${name} [${finalSocket}]`;
      dirty = true;
    }

    if (dirty) {
      if (name !== cpu.name) changes.name = name;
      await Product.updateOne({ _id: cpu._id }, { $set: changes });
      cpuUpdated++;
      console.log(`  ✓ ${cpu.name.substring(0, 55)}`);
      if (changes.name) console.log(`    → name: ${changes.name.substring(0, 65)}`);
      if (changes.specs?.socket) console.log(`    → socket: ${changes.specs.socket}`);
    }
  }
  console.log(`\n  CPUs updated: ${cpuUpdated}/${cpus.length}`);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STEP 2: Fix Motherboards
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n═══ STEP 2: Fixing Motherboard sockets ═══\n');
  const mobos = await Product.find({ category: 'mobo', deleted_at: null });
  let moboUpdated = 0;

  for (const mobo of mobos) {
    let name = mobo.name;
    const changes = {};
    let dirty = false;

    // Detect socket from chipset
    const socket = detectMoboSocket(name);
    if (socket && mobo.specs?.socket !== socket) {
      changes.specs = { ...(mobo.specs || {}), socket };
      dirty = true;
    }

    // Append socket tag if not already in name
    const finalSocket = socket || mobo.specs?.socket;
    if (finalSocket && !new RegExp(`\\[${finalSocket}\\]`, 'i').test(name) && !new RegExp(`\\b${finalSocket}\\b`, 'i').test(name)) {
      name = `${name} [${finalSocket}]`;
      dirty = true;
    }

    if (dirty) {
      if (name !== mobo.name) changes.name = name;
      await Product.updateOne({ _id: mobo._id }, { $set: changes });
      moboUpdated++;
      console.log(`  ✓ ${mobo.name.substring(0, 55)}`);
      if (changes.name) console.log(`    → name: ${changes.name.substring(0, 65)}`);
      if (changes.specs?.socket) console.log(`    → socket: ${changes.specs.socket}`);
    }
  }
  console.log(`\n  Motherboards updated: ${moboUpdated}/${mobos.length}`);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  console.log('\n✅ All done!');
  await mongoose.disconnect();
}

run().catch(console.error);
