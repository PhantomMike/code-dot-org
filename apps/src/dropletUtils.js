var utils = require('./utils');

/**
 * @name DropletBlock
 * @description Definition of a block to be used in Droplet
 * @property {String} func identifying the function this block runs
 * @property {Object} parent object within which this function is defined as a property, keyed by the func name
 * @property {String} category category within which to place the block
 * @property {String} type type of the block (e.g. value)
 */

/**
 * @name DropletConfig
 * @description Configuration information for Droplet
 * @property {DropletBlock[]} blocks list of blocks
 * @property {Object} categories configuration of categories within which to place blocks
 */

var COLOR_PINK = '#F57AC6';
var COLOR_PURPLE = '#BB77C7';
var COLOR_GREEN = '#68D995';
var COLOR_LIGHT_GREEN = '#D3E965';
var COLOR_WHITE = '#FFFFFF';
var COLOR_BLUE = '#64B5F6';
var COLOR_ORANGE = '#FFB74D';

exports.randomNumber = function (min, max) {
  if (typeof max === 'undefined') {
    // If only one parameter is specified, use it as the max with zero as min:
    max = min;
    min = 0;
  }
  // Use double-tilde to ensure we are dealing with integers:
  return Math.floor(Math.random() * (~~max - ~~min + 1)) + ~~min;
};

exports.getTime = function() {
  return (new Date()).getTime();
};

/**
 * @type {DropletBlock[]}
 */
exports.dropletGlobalConfigBlocks = [
  {'func': 'getTime', 'parent': exports, 'category': 'Control', 'type': 'value' },
  {'func': 'randomNumber', 'parent': exports, 'category': 'Math', 'type': 'value' },
  {'func': 'prompt', 'parent': window, 'category': 'Variables', 'type': 'value' },
];

/**
 * @type {DropletBlock[]}
 */
exports.dropletBuiltinConfigBlocks = [
  {'func': 'Math.round', 'category': 'Math', 'type': 'value' },
  {'func': 'Math.abs', 'category': 'Math', 'type': 'value' },
  {'func': 'Math.max', 'category': 'Math', 'type': 'value' },
  {'func': 'Math.min', 'category': 'Math', 'type': 'value' },
];

/**
 * @type {DropletConfig|*}}
 */
var standardConfig = {};

standardConfig.blocks = [
  // Control
  {'func': 'forLoop_i_0_4', 'block': 'for (var i = 0; i < 4; i++) {\n  __;\n}', 'category': 'Control' },
  {'func': 'whileBlock', 'block': 'while (__) {\n  __;\n}', 'category': 'Control' },
  {'func': 'ifBlock', 'block': 'if (__) {\n  __;\n}', 'category': 'Control' },
  {'func': 'ifElseBlock', 'block': 'if (__) {\n  __;\n} else {\n  __;\n}', 'category': 'Control' },
  {'func': 'getTime', 'block': 'getTime()', 'category': 'Control', type: 'value' },

  // Math
  {'func': 'addOperator', 'block': '__ + __', 'category': 'Math' },
  {'func': 'subtractOperator', 'block': '__ - __', 'category': 'Math' },
  {'func': 'multiplyOperator', 'block': '__ * __', 'category': 'Math' },
  {'func': 'divideOperator', 'block': '__ / __', 'category': 'Math' },
  {'func': 'equalityOperator', 'block': '__ == __', 'category': 'Math' },
  {'func': 'inequalityOperator', 'block': '__ != __', 'category': 'Math' },
  {'func': 'greaterThanOperator', 'block': '__ > __', 'category': 'Math' },
  {'func': 'lessThanOperator', 'block': '__ < __', 'category': 'Math' },
  {'func': 'andOperator', 'block': '__ && __', 'category': 'Math' },
  {'func': 'orOperator', 'block': '__ || __', 'category': 'Math' },
  {'func': 'notOperator', 'block': '!__', 'category': 'Math' },
  {'func': 'randomNumber_max', 'block': 'randomNumber(__)', 'category': 'Math' },
  {'func': 'randomNumber_min_max', 'block': 'randomNumber(__, __)', 'category': 'Math' },
  {'func': 'mathRound', 'block': 'Math.round(__)', 'category': 'Math' },
  {'func': 'mathAbs', 'block': 'Math.abs(__)', 'category': 'Math' },
  {'func': 'mathMax', 'block': 'Math.max(__)', 'category': 'Math' },
  {'func': 'mathMin', 'block': 'Math.min(__)', 'category': 'Math' },

  // Variables
  {'func': 'declareAssign_x', 'block': 'var x = __;', 'category': 'Variables' },
  {'func': 'assign_x', 'block': 'x = __;', 'category': 'Variables' },
  {'func': 'declareAssign_x_array_1_4', 'block': 'var x = [1, 2, 3, 4];', 'category': 'Variables' },
  {'func': 'declareAssign_x_prompt', 'block': 'var x = prompt("Enter a value");', 'category': 'Variables' },

  // Functions
  {'func': 'functionParams_none', 'block': 'function myFunction() {\n  __;\n}', 'category': 'Functions' },
  {'func': 'functionParams_n', 'block': 'function myFunction(n) {\n  __;\n}', 'category': 'Functions' },
  {'func': 'callMyFunction', 'block': 'myFunction()', 'category': 'Functions' },
  {'func': 'callMyFunction_n', 'block': 'myFunction(n)', 'category': 'Functions' },
  {'func': 'return', 'block': 'return __;', 'category': 'Functions' },
];

standardConfig.categories = {
  'Control': {
    'color': 'blue',
    'rgb': COLOR_BLUE,
    'blocks': []
  },
  'Math': {
    'color': 'orange',
    'rgb': COLOR_ORANGE,
    'blocks': []
  },
  'Variables': {
    'color': 'purple',
    'rgb': COLOR_PURPLE,
    'blocks': []
  },
  'Functions': {
    'color': 'green',
    'rgb': COLOR_GREEN,
    'blocks': []
  },
  // create blank category in case level builders want to move all blocks here
  // (which will cause the palette header to disappear)
  '' : { 'blocks': [] },
};

/**
 * @param codeFunctions
 * @param {DropletConfig} dropletConfig
 * @param {DropletConfig} otherConfig optionally used to supply a standardConfig
 *  object which is not app specific. It will be used first, then overriden
 *  by the primary dropletConfig if there is overlap between the two.
 * @returns {Array}
 */
function mergeFunctionsWithConfig(codeFunctions, dropletConfig, otherConfig) {
  var merged = [];

  if (codeFunctions && dropletConfig && dropletConfig.blocks) {
    var blockSets = [ dropletConfig.blocks ];
    if (otherConfig) {
      blockSets.splice(0, 0, otherConfig.blocks);
    }
    // codeFunctions is an object with named key/value pairs
    //  key is a block name from dropletBlocks or standardBlocks
    //  value is an object that can be used to override block defaults
    for (var s = 0; s < blockSets.length; s++) {
      var blocks = blockSets[s];
      for (var i = 0; i < blocks.length; i++) {
        var block = blocks[i];
        if (blocks[i].func in codeFunctions) {
          // We found this particular block, now override the defaults with extend
          merged.push(utils.extend(blocks[i], codeFunctions[blocks[i].func]));
        }
      }
    }
  }
  return merged;
}

//
// Return a new categories object with the categories from dropletConfig
// merged with the ones in standardConfig
//

function mergeCategoriesWithConfig(dropletConfig) {
  var merged = {};

  if (dropletConfig && dropletConfig.categories) {
    var categorySets = [ dropletConfig.categories, standardConfig.categories ];
    for (var s = 0; s < categorySets.length; s++) {
      var categories = categorySets[s];
      for (var catName in categories) {
        if (!(catName in merged)) {
          merged[catName] = utils.shallowCopy(categories[catName]);
        }
      }
    }
  } else {
    merged = standardConfig.categories;
  }
  return merged;
}

/**
 * Generate code aliases in Javascript based on some level data.
 * @param {DropletConfig} dropletConfig
 * @param {String} parentObjName string reference to object upon which func is
 *  a property
 * @returns {String} code
 */
exports.generateCodeAliases = function (dropletConfig, parentObjName) {
  var code = '';
  var aliasFunctions = dropletConfig.blocks;

  // Insert aliases from aliasFunctions into code
  for (var i = 0; i < aliasFunctions.length; i++) {
    var cf = aliasFunctions[i];
    code += "var " + cf.func + " = function() { ";
    if (cf.idArgNone) {
      code += "return " + parentObjName + "." + cf.func + ".apply(" +
              parentObjName + ", arguments); };\n";
    } else {
      code += "var newArgs = " +
        (cf.idArgLast ? "arguments.concat(['']);" : "[''].concat(arguments);") +
        " return " + parentObjName + "." + cf.func +
        ".apply(" + parentObjName + ", newArgs); };\n";
    }
  }
  return code;
};

function buildFunctionPrototype(prefix, params) {
  var proto = prefix + "(";
  if (params) {
    for (var i = 0; i < params.length; i++) {
      if (i !== 0) {
        proto += ", ";
      }
      proto += params[i];
    }
  }
  return proto + ")";
}

/**
 * Generate a palette for the droplet editor based on some level data.
 */
exports.generateDropletPalette = function (codeFunctions, dropletConfig) {
  var mergedCategories = mergeCategoriesWithConfig(dropletConfig);
  var mergedFunctions = mergeFunctionsWithConfig(codeFunctions,
                                                 dropletConfig,
                                                 standardConfig);
  for (var i = 0; i < mergedFunctions.length; i++) {
    var cf = mergedFunctions[i];
    var block = cf.block;
    var expansion = null;
    if (!block) {
      var prefix = cf.blockPrefix || cf.func;
      var paletteParams = cf.paletteParams || cf.params;
      block = buildFunctionPrototype(prefix, paletteParams);
      if (paletteParams) {
        // If paletteParams were specified and used for the 'block', then use
        // the regular params for the 'expansion' which appears when the block
        // is dragged out of the palette:
        expansion = buildFunctionPrototype(prefix, cf.params);
      }
    }

    /**
     * Here we set the title attribute to the function shortname,
     * this is later used as a key for function documentation and tooltips
     */
    var blockPair = {
      block: block,
      expansion: expansion,
      title: cf.func
    };
    mergedCategories[cf.category].blocks.push(blockPair);
  }

  // Convert to droplet's expected palette format:
  var addedPalette = [];
  for (var category in mergedCategories) {
    if (mergedCategories[category].blocks.length > 0) {
      mergedCategories[category].name = category;
      addedPalette.push(mergedCategories[category]);
    }
  }

  return addedPalette;
};

function populateCompleterApisFromConfigBlocks(apis, configBlocks) {
  for (var i = 0; i < configBlocks.length; i++) {
    var block = configBlocks[i];
    if (!block.noAutocomplete) {
      apis.push({
        name: 'api',
        value: block.func,
        meta: block.category
      });
    }
  }
}

/**
 * Generate an Ace editor completer for a set of APIs based on some level data.
 *
 * If functionFilter is non-null, use it to filter the dropletConfig APIs to
 * be set in autocomplete and create no other autocomplete entries
 */
exports.generateAceApiCompleter = function (functionFilter, dropletConfig) {
  var apis = [];

  if (functionFilter) {
    var mergedBlocks = mergeFunctionsWithConfig(functionFilter, dropletConfig);
    populateCompleterApisFromConfigBlocks(apis, mergedBlocks);
  } else {
    populateCompleterApisFromConfigBlocks(apis, exports.dropletGlobalConfigBlocks);
    populateCompleterApisFromConfigBlocks(apis, exports.dropletBuiltinConfigBlocks);
    populateCompleterApisFromConfigBlocks(apis, dropletConfig.blocks);
  }

  return {
    getCompletions: function(editor, session, pos, prefix, callback) {
      if (prefix.length === 0) {
        callback(null, []);
        return;
      }
      callback(null, apis);
    }
  };
};

function populateModeOptionsFromConfigBlocks(modeOptions, config) {
  var mergedCategories = mergeCategoriesWithConfig(config);

  for (var i = 0; i < config.blocks.length; i++) {
    var newFunc = {};

    if (config.blocks[i].type === 'value') {
      newFunc.value = true;
    } else if (config.blocks[i].type === 'either') {
      newFunc.value = true;
      newFunc.command = true;
    }

    var category = mergedCategories[config.blocks[i].category];
    if (category) {
      newFunc.color = category.rgb || category.color;
    }

    newFunc.dropdown = config.blocks[i].dropdown;

    var modeOptionName = config.blocks[i].modeOptionName || config.blocks[i].func;

    modeOptions.functions[modeOptionName] = newFunc;
  }
}

function setTitlesToFuncNamesForDocumentedBlocks(modeOptions) {
  Object.keys(modeOptions.functions).forEach(function (funcName) {
    modeOptions.functions[funcName].title = funcName;
  });
}

/**
 * Generate modeOptions for the droplet editor based on some level data.
 */
exports.generateDropletModeOptions = function (dropletConfig, options) {
  var modeOptions = {
    functions: {
    },
    categories: {
      arithmetic: { color: COLOR_ORANGE },
      logic: { color: COLOR_ORANGE },
      conditionals: { color: COLOR_BLUE },
      loops: {
        color: COLOR_BLUE,
        beginner: options.beginnerMode || false
      },
      functions: { color: COLOR_GREEN },
      returns: { color: COLOR_BLUE },
      comments: { color: COLOR_WHITE },
      containers: { color: COLOR_PURPLE },
      value: { color: COLOR_PURPLE },
      command: { color: COLOR_GREEN },
      assignments: { color: COLOR_PURPLE },
      // errors: { },
    }
  };

  populateModeOptionsFromConfigBlocks(modeOptions, { blocks: exports.dropletGlobalConfigBlocks });
  populateModeOptionsFromConfigBlocks(modeOptions, { blocks: exports.dropletBuiltinConfigBlocks });
  populateModeOptionsFromConfigBlocks(modeOptions, dropletConfig);

  setTitlesToFuncNamesForDocumentedBlocks(modeOptions);

  return modeOptions;
};

/**
 * Returns a set of all blocks
 * @param {DropletConfig|null} dropletConfig custom configuration, may be null
 * @returns {DropletBlock[]} a list of all available Droplet blocks,
 *      including the given config's blocks
 */
exports.getAllAvailableDropletBlocks = function (dropletConfig) {
  var hasConfiguredBlocks = dropletConfig && dropletConfig.blocks;
  var configuredBlocks = hasConfiguredBlocks ? dropletConfig.blocks : [];
  return exports.dropletGlobalConfigBlocks
    .concat(exports.dropletBuiltinConfigBlocks)
    .concat(standardConfig.blocks)
    .concat(configuredBlocks);
};
