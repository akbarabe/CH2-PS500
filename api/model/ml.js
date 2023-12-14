const tfjs = require("@tensorflow/tfjs-node");

// Disesuaikan dengan model ML kelompok (di bawah masih contoh)
function loadModel() {
  const modelUrl = `model.json`;
  return tfjs.loadLayersModel(modelUrl);
}

// Disesuaikan dengan model ML kelompok (di bawah masih contoh)
function predict(model, imageBuffer) {
  const tensor = tfjs.node
    .decodeJpeg(imageBuffer)
    .resizeNearestNeighbor([224, 224])
    .expandDims()
    .toFloat();

  return model.predict(tensor).data();
}

module.exports = { loadModel, predict };
