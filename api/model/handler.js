const { Firestore } = require("../../config/firebase");
const autoBind = require("auto-bind");
const { loadModel, predict } = require("./ml");

// Inisialisasi Firestore client
const firestore = new Firestore();

class ModelHandler {
  constructor(validator) {
    this._validator = validator;
    autoBind(this);
  }

  async predictsHandler(request, h) {
    const model = await loadModel();
    console.log("model loaded!");
    try {
      // Mendapatkan hasil prediksi dari model
      const { image } = request.payload;
      const predictions = await predict(model, image);
      console.log(predictions);
      const [Celup, Insang, Kawung, Megamendung, Parang, Poleng, Truntum] =
        predictions;

      if (Celup) {
        // Jika prediksi adalah "celup", maka ambil informasi dari Firestore
        const docRef = firestore.collection("BatikIndonesia").doc("BatikCelup");
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
          console.log("Dokumen tidak ditemukan!");
          return { result: "defaultResult" };
        }

        // Mengambil data dari Firestore
        const celupData = docSnapshot.data();

        // Mengembalikan informasi dari item "BatikCelup"
        return {
          Nama: celupData.Nama,
          Asal: celupData.Asal,
          Pola: celupData.Pola,
          Makna: celupData.Makna,
        };
      }

      if (Insang) {
        const docRef = firestore
          .collection("BatikIndonesia")
          .doc("BatikInsang");
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
          console.log("Dokumen tidak ditemukan!");
          return { result: "defaultResult" };
        }

        const insangData = docSnapshot.data();

        return {
          Nama: insangData.Nama,
          Asal: insangData.Asal,
          Pola: insangData.Pola,
          Makna: insangData.Makna,
        };
      }

      if (Kawung) {
        const docRef = firestore
          .collection("BatikIndonesia")
          .doc("BatikKawung");
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
          console.log("Dokumen tidak ditemukan!");
          return { result: "defaultResult" };
        }

        const kawungData = docSnapshot.data();

        return {
          Nama: kawungData.Nama,
          Asal: kawungData.Asal,
          Pola: kawungData.Pola,
          Makna: kawungData.Makna,
        };
      }

      if (Megamendung) {
        const docRef = firestore
          .collection("BatikIndonesia")
          .doc("BatikMegamendung");
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
          console.log("Dokumen tidak ditemukan!");
          return { result: "defaultResult" };
        }

        const megamendungData = docSnapshot.data();

        return {
          Nama: megamendungData.Nama,
          Asal: megamendungData.Asal,
          Pola: megamendungData.Pola,
          Makna: megamendungData.Makna,
        };
      }

      if (Parang) {
        const docRef = firestore
          .collection("BatikIndonesia")
          .doc("BatikParang");
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
          console.log("Dokumen tidak ditemukan!");
          return { result: "defaultResult" };
        }

        const parangData = docSnapshot.data();

        return {
          Nama: parangData.Nama,
          Asal: parangData.Asal,
          Pola: parangData.Pola,
          Makna: parangData.Makna,
        };
      }

      if (Poleng) {
        const docRef = firestore
          .collection("BatikIndonesia")
          .doc("BatikPoleng");
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
          console.log("Dokumen tidak ditemukan!");
          return { result: "defaultResult" };
        }

        const polengData = docSnapshot.data();

        return {
          Nama: polengData.Nama,
          Asal: polengData.Asal,
          Pola: polengData.Pola,
          Makna: polengData.Makna,
        };
      }

      if (Truntum) {
        const docRef = firestore
          .collection("BatikIndonesia")
          .doc("BatikTruntum");
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
          console.log("Dokumen tidak ditemukan!");
          return { result: "defaultResult" };
        }

        const truntumData = docSnapshot.data();

        return {
          Nama: truntumData.Nama,
          Asal: truntumData.Asal,
          Pola: truntumData.Pola,
          Makna: truntumData.Makna,
        };
      }
    } catch (error) {
      console.error("Error accessing Firestore:", error);
      return { result: "error" };
    }
  }
}

module.exports = ModelHandler;
