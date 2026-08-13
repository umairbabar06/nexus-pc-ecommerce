/**
 * Defines which `specs.<key>` attributes are filterable for each category.
 * Brand is a top-level field, NOT a spec — handled separately in getFacets.
 * A filter group only appears in the sidebar if at least one product in the
 * current set has a non-empty value for that key.
 */

const CATEGORY_FILTERS = {
  // ── PC Components ──────────────────────────────────
  cpu: [
    { key: 'socket',             label: 'Socket' },
    { key: 'cores',              label: 'Cores' },
    { key: 'integratedGraphics', label: 'Integrated Graphics' },
  ],
  gpu: [
    { key: 'chipset',  label: 'Chipset' },
    { key: 'vram',     label: 'VRAM' },
  ],
  ram: [
    { key: 'ramType',  label: 'Memory Type' },
    { key: 'capacity', label: 'Capacity' },
    { key: 'speed',    label: 'Speed (MHz)' },
  ],
  ssd: [
    { key: 'capacity',  label: 'Capacity' },
    { key: 'interface', label: 'Interface' },
  ],
  hdd: [
    { key: 'capacity', label: 'Capacity' },
    { key: 'rpm',      label: 'RPM' },
  ],
  mobo: [
    { key: 'socket',     label: 'Socket' },
    { key: 'formFactor', label: 'Form Factor' },
  ],
  psu: [
    { key: 'wattage',    label: 'Wattage' },
    { key: 'efficiency', label: 'Efficiency' },
    { key: 'modular',    label: 'Modular Type' },
  ],
  casing: [
    { key: 'formFactor', label: 'Form Factor' },
  ],
  cooler: [
    { key: 'coolerType', label: 'Cooler Type' },
    { key: 'socket',     label: 'Socket Support' },
  ],
  cooling_fans: [
    { key: 'size', label: 'Fan Size' },
  ],

  // ── Audio ───────────────────────────────────────────
  headsets: [
    { key: 'connection', label: 'Connection' },
    { key: 'type',       label: 'Type' },
  ],
  handsfree: [
    { key: 'connection', label: 'Connection' },
    { key: 'type',       label: 'Type' },
  ],
  airbuds: [
    { key: 'connection', label: 'Connection' },
  ],
  airpods: [
    { key: 'connection', label: 'Connection' },
  ],
  speakers: [
    { key: 'connection', label: 'Connection' },
  ],
  gaming_sets: [
    { key: 'connection', label: 'Connection' },
  ],

  // ── Smart Devices ────────────────────────────────────
  smart_watches: [
    { key: 'compatibility', label: 'Compatibility' },
  ],
  power_banks: [
    { key: 'capacity',   label: 'Capacity' },
    { key: 'fastCharge', label: 'Fast Charge' },
  ],

  // ── Accessories (price + brand + color covers these) ─
  cases:        [],
  custom_cases: [],
  cables:       [],
  adapters:     [],
  tripods:      [],
  watch_straps: [],
};

// Shown on every category (only if data exists)
const UNIVERSAL_FILTERS = [
  { key: 'color', label: 'Color' },
];

function getFilterKeysForCategory(category) {
  const specific = CATEGORY_FILTERS[category] || [];
  return [...UNIVERSAL_FILTERS, ...specific];
}

// Human-readable labels for each category value
const CATEGORY_LABELS = {
  cpu:          'CPU',
  gpu:          'Graphics Card',
  ram:          'RAM',
  mobo:         'Motherboard',
  hdd:          'HDD',
  ssd:          'SSD',
  psu:          'Power Supply',
  casing:       'PC Case',
  cooler:       'CPU Cooler',
  cooling_fans: 'Cooling Fan',
  adapters:     'Adapters',
  cables:       'Cables',
  cases:        'Phone Cases',
  custom_cases: 'Custom Cases',
  airbuds:      'Airbuds',
  airpods:      'Airpods',
  handsfree:    'Handsfree',
  headsets:     'Headsets',
  gaming_sets:  'Gaming Sets',
  power_banks:  'Power Banks',
  smart_watches:'Smart Watches',
  speakers:     'Speakers',
  tripods:      'Tripods',
  watch_straps: 'Watch Straps',
  other:        'Other',
};

module.exports = { CATEGORY_FILTERS, UNIVERSAL_FILTERS, CATEGORY_LABELS, getFilterKeysForCategory };
