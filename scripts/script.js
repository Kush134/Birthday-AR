export const Diagnostics = require('Diagnostics');

// Load in modules
const Scene = require('Scene');
const Patches = require('Patches');
const NativeUI = require('NativeUI');
const Textures = require('Textures');
const sceneRoot = Scene.root;
const plane = sceneRoot.find('plane0');

Promise.all([
  Textures.findFirst('pinkCake'),
  Textures.findFirst('candyCake'),
  Textures.findFirst('fruitCake'),
]).then(onReady);

function onReady(assets) {

  Diagnostics.log('On Ready called.');

  const texture1 = assets[0];
  const texture2 = assets[1];
  const texture3 = assets[2];

  const planeTracker = assets[3];
  const placer = assets[4];

  // Store a reference to the picker
  const picker = NativeUI.picker;

  // Set a starting index (optional, will be 0 by default)
  const index = 0;
  const selection = 0;

  // Create a configuration object
  const configuration = {

    // The index of the selected item in the picker
    selectedIndex: index,

    // The image textures to use as the items in the picker
    items: [
      { image_texture: texture1 },
      { image_texture: texture2 },
      { image_texture: texture3 }
    ]

  };
  picker.configure(configuration);

  // Set the picker to be visible (visible is false by default)
  picker.visible = true;

  picker.selectedIndex.monitor().subscribe(function (index) {
    Patches.inputs.setScalar('selection', index.newValue);
  });
}


