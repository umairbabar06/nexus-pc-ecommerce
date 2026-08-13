/**
 * Minimal MySQL-dump parser.
 * Extracts every `INSERT INTO \`table\` (col1, col2, ...) VALUES (...), (...);`
 * statement from a .sql dump and returns rows as plain objects keyed by
 * column name — so we never have to hardcode column positions.
 *
 * No MySQL server required — this reads the .sql text directly.
 */

function parseValueToken(raw) {
  const token = raw.trim();
  if (token.toUpperCase() === 'NULL') return null;

  if (token.startsWith("'") && token.endsWith("'")) {
    let inner = token.slice(1, -1);
    inner = inner
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\\\/g, '\\');
    return inner;
  }

  if (/^-?\d+(\.\d+)?$/.test(token)) {
    return Number(token);
  }

  return token;
}

// Splits "(a, 'b, c', NULL), (d, 'e', 1)" into [['a', "'b, c'", 'NULL'], ['d', "'e'", '1']]
function splitTuples(text) {
  const tuples = [];
  let cur = [];
  let buf = '';
  let depth = 0;
  let inString = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];

    if (inString) {
      if (ch === '\\' && i + 1 < text.length) {
        buf += ch + text[i + 1];
        i += 1;
        continue;
      }
      if (ch === "'") {
        inString = false;
        buf += ch;
        continue;
      }
      buf += ch;
      continue;
    }

    if (ch === "'") {
      inString = true;
      buf += ch;
      continue;
    }
    if (ch === '(') {
      depth += 1;
      if (depth === 1) {
        buf = '';
        continue;
      }
    }
    if (ch === ')') {
      depth -= 1;
      if (depth === 0) {
        cur.push(buf);
        tuples.push(cur);
        cur = [];
        buf = '';
        continue;
      }
    }
    if (depth === 1 && ch === ',') {
      cur.push(buf);
      buf = '';
      continue;
    }
    if (depth >= 1) buf += ch;
  }

  return tuples;
}

/**
 * @param {string} sql full contents of the .sql dump
 * @returns {Object<string, Array<Object>>} tableName -> array of row objects
 */
function parseDump(sql) {
  const tables = {};
  const insertRegex = /INSERT INTO `(\w+)`\s*\(([^)]+)\)\s*VALUES\s*/gi;

  let match;
  while ((match = insertRegex.exec(sql)) !== null) {
    const table = match[1];
    const columns = match[2].split(',').map((c) => c.trim().replace(/`/g, ''));

    // Find the terminating ";" for this statement by scanning from where
    // the regex left off, tracking string/paren state so a ';' inside a
    // quoted string doesn't end the statement early.
    let i = insertRegex.lastIndex;
    let depth = 0;
    let inString = false;
    const start = i;
    for (; i < sql.length; i += 1) {
      const ch = sql[i];
      if (inString) {
        if (ch === '\\') { i += 1; continue; }
        if (ch === "'") inString = false;
        continue;
      }
      if (ch === "'") { inString = true; continue; }
      if (ch === '(') depth += 1;
      if (ch === ')') depth -= 1;
      if (ch === ';' && depth === 0) break;
    }
    const valuesText = sql.slice(start, i);
    insertRegex.lastIndex = i;

    const tuples = splitTuples(valuesText);
    const rows = tuples.map((tuple) => {
      const obj = {};
      columns.forEach((col, idx) => {
        obj[col] = parseValueToken(tuple[idx] ?? 'NULL');
      });
      return obj;
    });

    if (!tables[table]) tables[table] = [];
    tables[table].push(...rows);
  }

  return tables;
}

module.exports = { parseDump };