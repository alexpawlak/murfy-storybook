"use strict";
(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  let IS_DRY_RUN = false;

  // src/sync/utils.ts
  function hexToFigmaRGBA(hex) {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16) / 255;
    const g = parseInt(h.slice(2, 4), 16) / 255;
    const b = parseInt(h.slice(4, 6), 16) / 255;
    const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1;
    return { r, g, b, a };
  }
  function findOrCreateCollection(name, collections) {
    const existing = collections.find((c) => c.name === name);
    if (existing) {
      if (IS_DRY_RUN) {
        return {
          collection: {
            id: existing.id,
            name: existing.name,
            modes: existing.modes,
            addMode: () => 'mock-mode',
            renameMode: () => {}
          },
          created: false
        };
      }
      return { collection: existing, created: false };
    }
    if (IS_DRY_RUN) {
      return { 
        collection: { 
          id: "mock-coll-" + name, 
          modes: [{ modeId: "mock-mode-0", name: "Mode 1" }], 
          name, 
          addMode: () => "mock-mode-new", 
          renameMode: () => {} 
        }, 
        created: true 
      };
    }
    return { collection: figma.variables.createVariableCollection(name), created: true };
  }
  function findVariable(name, collectionId, variables) {
    return variables.find((v) => v.name === name && v.variableCollectionId === collectionId);
  }
  function findOrCreateVariable(name, collectionId, resolvedType, variables) {
    const existing = findVariable(name, collectionId, variables);
    if (existing) {
      if (IS_DRY_RUN) {
        return { variable: { id: existing.id, name: existing.name, setValueForMode: () => {} }, created: false };
      }
      return { variable: existing, created: false };
    }
    if (IS_DRY_RUN) {
      return { variable: { id: "mock-var-" + name, name, setValueForMode: () => {} }, created: true };
    }
    return { variable: figma.variables.createVariable(name, collectionId, resolvedType), created: true };
  }
  function ensureModes(collection, modeNames) {
    const modeMap = /* @__PURE__ */ new Map();
    const existingModes = [...collection.modes];
    if (existingModes.length > 0 && modeNames.length > 0) {
      if (!IS_DRY_RUN && typeof collection.renameMode === 'function') {
        try { collection.renameMode(existingModes[0].modeId, modeNames[0]); } catch (e) {}
      }
      modeMap.set(modeNames[0], existingModes[0].modeId);
    }
    for (let i = 1; i < modeNames.length; i++) {
      const name = modeNames[i];
      const existing = existingModes.find((m) => m.name === name);
      if (existing) {
        modeMap.set(name, existing.modeId);
      } else {
        const modeId = (IS_DRY_RUN || !collection.addMode) ? "mock-mode-" + i : collection.addMode(name);
        modeMap.set(name, modeId);
      }
    }
    return modeMap;
  }

  // src/sync/primitives.ts
  function syncPrimitives(tokens, collections, allVariables) {
    const { collection, created: collCreated } = findOrCreateCollection("Primitives", collections);
    const modeMap = ensureModes(collection, ["Value"]);
    const modeId = modeMap.get("Value");
    const variableMap = /* @__PURE__ */ new Map();
    let created = 0;
    let updated = 0;
    const changes = [];
    for (const [key, hex] of Object.entries(tokens.primitives)) {
      const name = `primitives/${key}`;
      const { variable, created: isNew } = findOrCreateVariable(name, collection.id, "COLOR", allVariables);
      const rgba = hexToFigmaRGBA(hex);
      variable.setValueForMode(modeId, rgba);
      variableMap.set(key, variable);
      changes.push({
        name,
        type: isNew ? 'created' : 'updated',
        category: 'Primitives'
      });
      if (isNew) created++;
      else updated++;
    }
    return { collection, variableMap, created, updated, changes };
  }

  // src/sync/semantic.ts
  function resolveTokenValue(value, primitiveVars) {
    var aliasMatch = value.match(/^\{primitives\.(.+)\}$/);
    if (aliasMatch) {
      var primVar = primitiveVars.get(aliasMatch[1]);
      if (primVar) {
        return { type: "VARIABLE_ALIAS", id: primVar.id };
      }
    }
    return hexToFigmaRGBA(value);
  }
  function syncSemantic(tokens, primitiveVars, collections, allVariables) {
    var themeNames = Object.keys(tokens.themes);
    var { collection } = findOrCreateCollection("Theme", collections);
    var modeMap = ensureModes(collection, themeNames);
    var created = 0;
    var updated = 0;
    const changes = [];
    var tokenKeys = Object.keys(tokens.themes[themeNames[0]]);
    for (var i = 0; i < tokenKeys.length; i++) {
      var tokenKey = tokenKeys[i];
      var name = "theme/" + tokenKey;
      var result = findOrCreateVariable(name, collection.id, "COLOR", allVariables);
      var variable = result.variable;
      var isNew = result.created;
      for (var j = 0; j < themeNames.length; j++) {
        var themeName = themeNames[j];
        var modeId = modeMap.get(themeName);
        if (!modeId) continue;
        var value = tokens.themes[themeName][tokenKey];
        if (!value) continue;
        var resolved = resolveTokenValue(value, primitiveVars);
        variable.setValueForMode(modeId, resolved);
      }
      changes.push({
        name,
        type: isNew ? 'created' : 'updated',
        category: 'Themes'
      });
      if (isNew) created++;
      else updated++;
    }
    return { created, updated, changes };
  }

  // src/sync/accents.ts
  function resolveTokenValue2(value, primitiveVars) {
    var aliasMatch = value.match(/^\{primitives\.(.+)\}$/);
    if (aliasMatch) {
      var primVar = primitiveVars.get(aliasMatch[1]);
      if (primVar) {
        return { type: "VARIABLE_ALIAS", id: primVar.id };
      }
    }
    return hexToFigmaRGBA(value);
  }
  function syncAccents(tokens, primitiveVars, collections, allVariables) {
    var accentNames = Object.keys(tokens.accents);
    var { collection } = findOrCreateCollection("Accent", collections);
    var modeMap = ensureModes(collection, accentNames);
    var variableMap = /* @__PURE__ */ new Map();
    var created = 0;
    var updated = 0;
    const changes = [];
    var tokenKeys = Object.keys(tokens.accents[accentNames[0]]);
    for (var i = 0; i < tokenKeys.length; i++) {
      var tokenKey = tokenKeys[i];
      var name = "accent/" + tokenKey;
      var result = findOrCreateVariable(name, collection.id, "COLOR", allVariables);
      var variable = result.variable;
      var isNew = result.created;
      for (var j = 0; j < accentNames.length; j++) {
        var accentName = accentNames[j];
        var modeId = modeMap.get(accentName);
        if (!modeId) continue;
        var value = tokens.accents[accentName][tokenKey];
        if (!value) continue;
        var resolved = resolveTokenValue2(value, primitiveVars);
        variable.setValueForMode(modeId, resolved);
      }
      variableMap.set(tokenKey, variable);
      changes.push({
        name,
        type: isNew ? 'created' : 'updated',
        category: 'Accents'
      });
      if (isNew) created++;
      else updated++;
    }
    return { variableMap, created, updated, changes };
  }

  // src/sync/dimensions.ts
  function syncDimensions(tokens, collections, allVariables) {
    const { collection } = findOrCreateCollection("Dimensions", collections);
    const modeMap = ensureModes(collection, ["Value"]);
    const modeId = modeMap.get("Value");
    let created = 0;
    let updated = 0;
    const changes = [];
    for (const [key, value] of Object.entries(tokens.dimensions)) {
      const name = `dimensions/${key}`;
      const { variable, created: isNew } = findOrCreateVariable(name, collection.id, "FLOAT", allVariables);
      variable.setValueForMode(modeId, value);
      changes.push({
        name,
        type: isNew ? 'created' : 'updated',
        category: 'Dimensions'
      });
      if (isNew) created++;
      else updated++;
    }
    return { created, updated, changes };
  }

  // src/sync/typography-variables.ts
  function getTypographyModeValue(token, modeName, property) {
    if (token && token[modeName] && typeof token[modeName][property] !== "undefined") {
      return token[modeName][property];
    }
    return token == null ? void 0 : token[property];
  }
  function syncTypographyVariables(tokens, collections, allVariables) {
    var _a, _b;
    const { collection } = findOrCreateCollection("Typography", collections);
    const modeMap = ensureModes(collection, ["Desktop", "Mobile"]);
    let created = 0;
    let updated = 0;
    const changes = [];
    for (const [key, token] of Object.entries(tokens.typography)) {
      const variableSpecs = [
        { name: `typography/font-size/${key}`, valueForMode: (modeName) => getTypographyModeValue(token, modeName.toLowerCase(), "fontSize") },
        { name: `typography/line-height/${key}`, valueForMode: (modeName) => { const v = getTypographyModeValue(token, modeName.toLowerCase(), "lineHeight"); return typeof v !== "undefined" ? v * 100 : v; } },
        { name: `typography/letter-spacing/${key}`, valueForMode: () => (_a = token.letterSpacing) != null ? _a : 0 },
        { name: `typography/font-weight/${key}`, valueForMode: () => (_b = token.fontWeight) != null ? _b : 400 }
      ];
      for (const spec of variableSpecs) {
        const { variable, created: isNew } = findOrCreateVariable(spec.name, collection.id, "FLOAT", allVariables);
        for (const modeName of ["Desktop", "Mobile"]) {
          const modeId = modeMap.get(modeName);
          if (!modeId) continue;
          const value = spec.valueForMode(modeName);
          if (typeof value !== "undefined") {
            variable.setValueForMode(modeId, value);
          }
        }
        changes.push({
          name: spec.name,
          type: isNew ? 'created' : 'updated',
          category: 'Typography Variables'
        });
        if (isNew) created++;
        else updated++;
      }
    }
    return { created, updated, changes };
  }

  // src/sync/text-styles.ts
  var WEIGHT_MAP = {
    400: "Regular",
    500: "Medium",
    600: "SemiBold",
    700: "Bold",
    800: "ExtraBold",
    900: "Black",
    950: "Ultra"
  };
  var STYLE_NAME_MAP = {
    display: "Headings/Display",
    "display-xl": "Headings/Display XL",
    h1: "Headings/H1",
    h2: "Headings/H2",
    h3: "Headings/H3",
    h4: "Headings/H4",
    h5: "Headings/H5",
    h6: "Headings/H6",
    "text-large": "Body/Large",
    "text-main": "Body/Main",
    "text-small": "Body/Small",
    "text-xsmall": "Body/XSmall",
    "text-large-semibold": "Body/Large Semibold",
    "text-main-semibold": "Body/Main Semibold",
    "text-small-semibold": "Body/Small Semibold",
    "text-xsmall-semibold": "Body/XSmall Semibold",
    label: "Label/Default"
  };
  function getTextCase(token) {
    return token.textTransform === "uppercase" ? "UPPER" : "ORIGINAL";
  }
  function syncTextStyles(tokens) {
    return __async(this, null, function* () {
      var _a;
      const existingStyles = yield figma.getLocalTextStylesAsync();
      const collections = yield figma.variables.getLocalVariableCollectionsAsync();
      const typoCollection = collections.find((c) => c.name === "Typography");
      const fontSizeVarMap = {};
      if (typoCollection) {
        const allVars = yield Promise.all(typoCollection.variableIds.map((id) => figma.variables.getVariableByIdAsync(id)));
        for (const v of allVars.filter(Boolean)) {
          const match = v.name.match(/^typography\/font-size\/(.+)$/);
          if (match) fontSizeVarMap[match[1]] = v;
        }
      }
      let created = 0;
      let updated = 0;
      const changes = [];
      for (const [name, token] of Object.entries(tokens.typography)) {
        const styleName = (_a = STYLE_NAME_MAP[name]) != null ? _a : `Murfy/${name}`;
        const fontStyle = (_a = WEIGHT_MAP[token.fontWeight]) != null ? _a : "Regular";
        const fontName = { family: "Murfy A2", style: fontStyle };
        try {
          yield figma.loadFontAsync(fontName);
        } catch (e) {
          console.error(`Font "Murfy A2 ${fontStyle}" not available. Skipping ${styleName}.`);
          continue;
        }
        let style = existingStyles.find((s) => s.name === styleName);
        const isNew = !style;
        if (!style) {
          if (IS_DRY_RUN) {
            style = { id: `mock-style-${name}`, name: styleName, setBoundVariable: () => {} };
          } else {
            style = figma.createTextStyle();
            style.name = styleName;
          }
        }
        if (!IS_DRY_RUN) {
          style.fontName = fontName;
          style.letterSpacing = { value: token.letterSpacing * 100, unit: "PERCENT" };
          style.textCase = getTextCase(token);
          style.lineHeight = { value: getTypographyModeValue(token, "desktop", "lineHeight") * 100, unit: "PERCENT" };
          const fsVar = fontSizeVarMap[name];
          if (fsVar) {
            style.setBoundVariable("fontSize", fsVar);
          } else {
            style.fontSize = getTypographyModeValue(token, "desktop", "fontSize");
          }
        }
        changes.push({
          name: styleName,
          type: isNew ? 'created' : 'updated',
          category: 'Text Styles'
        });
        if (isNew) created++;
        else updated++;
      }
      return { created, updated, changes };
    });
  }

  // src/sync/typography-specimen.ts
  var TYPOGRAPHY_SPECIMEN_NODE_ID = "62:1051";
  var SPECIMEN_SAMPLE_MAP = {
    display: "Murfy",
    "display-xl": "Murfy",
    h1: "Réparez, ne remplacez pas",
    h2: "Nos services de réparation",
    h3: "Réparation à domicile",
    h4: "Lave-linge, sèche-linge, lave-vaisselle",
    h5: "Prise en charge rapide et efficace",
    h6: "Techniciens certifiés et expérimentés",
    "text-large": "Nous réparons vos appareils électroménagers à domicile.",
    "text-main": "Prenez rendez-vous en ligne en quelques clics. Un technicien se déplace chez vous.",
    "text-small": "Réparation garantie 6 mois. Pièces d’origine constructeur.",
    "text-xsmall": "Mentions légales · Politique de confidentialité · CGV",
    "text-large-semibold": "Nous réparons vos appareils électroménagers à domicile.",
    "text-main-semibold": "Prenez rendez-vous en ligne en quelques clics.",
    "text-small-semibold": "Réparation garantie 6 mois. Pièces d’origine constructeur.",
    "text-xsmall-semibold": "Techniciens certifiés et expérimentés",
    label: "SECTION LABEL · FORM FIELD · BADGE TEXT"
  };
  function inferTypographyTokenFromNodeName(nodeName) {
    const normalized = nodeName.trim().toLowerCase();
    const map = {
      display: "display",
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      h5: "h5",
      h6: "h6",
      "body/large": "text-large",
      large: "text-large",
      "body/main": "text-main",
      main: "text-main",
      "body/small": "text-small",
      small: "text-small",
      "body/xsmall": "text-xsmall",
      xsmall: "text-xsmall",
      "body/large semibold": "text-large-semibold",
      "large semibold": "text-large-semibold",
      "body/main semibold": "text-main-semibold",
      "main semibold": "text-main-semibold",
      "body/small semibold": "text-small-semibold",
      "small semibold": "text-small-semibold",
      "body/xsmall semibold": "text-xsmall-semibold",
      "xsmall semibold": "text-xsmall-semibold",
      "label/default": "label",
      label: "label"
    };
    return map[normalized];
  }
  function updateTypographySpecimen(tokens) {
    return __async(this, null, function* () {
      if (IS_DRY_RUN) return { updated: 0, skipped: true };
      
      const target = yield figma.getNodeByIdAsync(TYPOGRAPHY_SPECIMEN_NODE_ID);
      if (!target || !("findAll" in target)) {
        return { updated: 0, skipped: true };
      }
      const textStyles = yield figma.getLocalTextStylesAsync();
      const styleByName = new Map(textStyles.map((style) => [style.name, style]));
      const textNodes = target.findAll((node) => node.type === "TEXT");
      let updated = 0;
      for (const node of textNodes) {
        const tokenName = inferTypographyTokenFromNodeName(node.name);
        if (!tokenName) continue;
        const token = tokens.typography[tokenName];
        if (!token) continue;
        const styleName = STYLE_NAME_MAP[tokenName];
        const style = styleByName.get(styleName);
        const fontStyle = WEIGHT_MAP[token.fontWeight] || "Regular";
        const fontName = { family: "Murfy A2", style: fontStyle };
        try {
          yield figma.loadFontAsync(fontName);
        } catch (e) {
          continue;
        }
        if (style) {
          yield node.setTextStyleIdAsync(style.id);
        } else {
          node.fontName = fontName;
          node.fontSize = getTypographyModeValue(token, "desktop", "fontSize");
          node.lineHeight = { value: getTypographyModeValue(token, "desktop", "lineHeight") * 100, unit: "PERCENT" };
          node.letterSpacing = { value: token.letterSpacing * 100, unit: "PERCENT" };
          node.textCase = getTextCase(token);
        }
        if (SPECIMEN_SAMPLE_MAP[tokenName]) {
          node.characters = SPECIMEN_SAMPLE_MAP[tokenName];
        }
        updated++;
      }
      return { updated, skipped: false };
    });
  }

  // src/code.ts
  figma.showUI(__html__, { width: 420, height: 520, themeColors: true });
  function sendMessage(msg) {
    figma.ui.postMessage(msg);
  }
  function syncTokens(tokens) {
    return __async(this, null, function* () {
      try {
        const collections = figma.variables.getLocalVariableCollections();
        const allVariables = figma.variables.getLocalVariables();
        const stats = {
          collectionsCreated: 0,
          variablesCreated: 0,
          variablesUpdated: 0,
          textStylesCreated: 0,
          textStylesUpdated: 0,
          specimenTextUpdated: 0
        };
        const allChanges = [];
        sendMessage({ type: "SYNC_PROGRESS", step: "Primitives...", progress: 10 });
        const primResult = syncPrimitives(tokens, collections, allVariables);
        const primitiveVars = primResult.variableMap;
        stats.variablesCreated += primResult.created;
        stats.variablesUpdated += primResult.updated;
        if (primResult.changes) allChanges.push(...primResult.changes);
        
        sendMessage({ type: "SYNC_PROGRESS", step: "Themes...", progress: 30 });
        const semResult = syncSemantic(tokens, primitiveVars, collections, allVariables);
        stats.variablesCreated += semResult.created;
        stats.variablesUpdated += semResult.updated;
        if (semResult.changes) allChanges.push(...semResult.changes);
        
        sendMessage({ type: "SYNC_PROGRESS", step: "Accents...", progress: 55 });
        const accResult = syncAccents(tokens, primitiveVars, collections, allVariables);
        stats.variablesCreated += accResult.created;
        stats.variablesUpdated += accResult.updated;
        if (accResult.changes) allChanges.push(...accResult.changes);
        
        sendMessage({ type: "SYNC_PROGRESS", step: "Dimensions...", progress: 70 });
        const dimResult = syncDimensions(tokens, collections, allVariables);
        stats.variablesCreated += dimResult.created;
        stats.variablesUpdated += dimResult.updated;
        if (dimResult.changes) allChanges.push(...dimResult.changes);
        
        sendMessage({ type: "SYNC_PROGRESS", step: "Typography variables...", progress: 80 });
        const typographyResult = syncTypographyVariables(tokens, collections, allVariables);
        stats.variablesCreated += typographyResult.created;
        stats.variablesUpdated += typographyResult.updated;
        if (typographyResult.changes) allChanges.push(...typographyResult.changes);
        
        sendMessage({ type: "SYNC_PROGRESS", step: "Text Styles...", progress: 90 });
        const tsResult = yield syncTextStyles(tokens);
        stats.textStylesCreated = tsResult.created;
        stats.textStylesUpdated = tsResult.updated;
        if (tsResult.changes) allChanges.push(...tsResult.changes);
        
        sendMessage({ type: "SYNC_PROGRESS", step: "Typography specimen...", progress: 97 });
        const specimenResult = yield updateTypographySpecimen(tokens);
        stats.specimenTextUpdated = specimenResult.updated;
        if (!IS_DRY_RUN) {
          figma.root.setPluginData("lastSync", (/* @__PURE__ */ new Date()).toISOString());
          figma.root.setPluginData("tokensVersion", String(tokens.$version));
        }
        sendMessage({ type: "SYNC_PROGRESS", step: "Done!", progress: 100 });
        sendMessage({ type: IS_DRY_RUN ? "PREVIEW_COMPLETE" : "SYNC_COMPLETE", stats, changes: allChanges });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        sendMessage({ type: "SYNC_ERROR", error: message });
      }
    });
  }
  figma.ui.onmessage = (msg) => {
    if (msg.type === "SET_DRY_RUN") {
      IS_DRY_RUN = msg.value;
    }
    if (msg.type === "SYNC_TOKENS") {
      IS_DRY_RUN = msg.isDryRun || false;
      syncTokens(msg.tokens);
    }
    if (msg.type === "CANCEL") {
      figma.closePlugin();
    }
  };
})();
