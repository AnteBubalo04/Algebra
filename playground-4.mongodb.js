//1
const database = 'Ispit';
use (database)

const collection = 'Student';
db.createCollection(collection);

//2
db.collection.insertOne({
  "Ime": "TvojeIme",
  "Prezime": "TvojePrezime",
  "Email": "emailadresa@mail.hr",
  "JMBAG": "001",
  "Grupa": "NazivGrupa"
});

//3
db.collection.updateOne({
  "JMBAG": "001"
}, {
  $set: {
    "Email": "ime.prezime@algebra.hr"
  }
})

//4
db.dropDatabase();