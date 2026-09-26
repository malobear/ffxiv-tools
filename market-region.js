// Shared data center / region picker for every tool on this site that pulls
// live Universalis prices. One localStorage key so a DC chosen on one page
// (e.g. trade-in-mounts.html) is remembered on every other page that also
// prices things (e.g. hunt-for-astronomy.html), instead of each tool having
// its own separate "where do you play" setting.
(function () {
  var STORAGE_KEY = "ffxiv-tools-region";
  var LEGACY_KEYS = ["tim-region"]; // trade-in-mounts.html's original page-local key, migrated in once

  var LABELS = {
    "North-America": "NA, all DCs", "Aether": "Aether", "Crystal": "Crystal", "Dynamis": "Dynamis", "Primal": "Primal",
    "Europe": "EU, all DCs", "Chaos": "Chaos", "Light": "Light",
    "Japan": "JP, all DCs", "Elemental": "Elemental", "Gaia": "Gaia", "Mana": "Mana", "Meteor": "Meteor",
    "Materia": "Materia"
  };

  var OPTIONS_HTML =
    '<option value="North-America">NA (all DCs)</option>' +
    '<optgroup label="North America">' +
      '<option value="Aether">Aether</option>' +
      '<option value="Crystal">Crystal</option>' +
      '<option value="Dynamis">Dynamis</option>' +
      '<option value="Primal">Primal</option>' +
    '</optgroup>' +
    '<optgroup label="Europe">' +
      '<option value="Europe">EU (all DCs)</option>' +
      '<option value="Chaos">Chaos</option>' +
      '<option value="Light">Light</option>' +
    '</optgroup>' +
    '<optgroup label="Japan">' +
      '<option value="Japan">JP (all DCs)</option>' +
      '<option value="Elemental">Elemental</option>' +
      '<option value="Gaia">Gaia</option>' +
      '<option value="Mana">Mana</option>' +
      '<option value="Meteor">Meteor</option>' +
    '</optgroup>' +
    '<optgroup label="Oceania">' +
      '<option value="Materia">Materia</option>' +
    '</optgroup>';

  function save(region) {
    try { localStorage.setItem(STORAGE_KEY, region); } catch (e) {}
  }

  function load() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      if (v) return v;
      for (var i = 0; i < LEGACY_KEYS.length; i++) {
        var legacy = localStorage.getItem(LEGACY_KEYS[i]);
        if (legacy) { save(legacy); return legacy; }
      }
    } catch (e) {}
    return "North-America";
  }

  function populate(selectEl) {
    selectEl.innerHTML = OPTIONS_HTML;
  }

  window.MarketRegion = { STORAGE_KEY: STORAGE_KEY, LABELS: LABELS, load: load, save: save, populate: populate };
})();
