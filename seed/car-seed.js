const db = require("../config/database");
const Car = require("../models/Car");

let newCars = [
  new Car({
    type: "تويوتا",
    description: "تويوتا فورتشنر 2019 VX1 4*4",
    location: "الدمام",
    price: "135,884",
    img_URL:
      "https://drive.google.com/uc?export=view&id=19JlUj7rC1I9LZiBhuY93lZNQafsPaoJH",
    video_URL:
      "https://drive.google.com/uc?export=view&id=15flX3iToVsfwkW-CKZpNFIl0wNiWW_GU",
    created_at: Date.now(),
  }),
  // new Car({
  //   type: "شفروليه",
  //   description: "شفروليه سبارك 2020 FLEET",
  //   location: "الدمام",
  //   price: "37,950",
  //   img_URL:
  //     "https://drive.google.com/uc?export=view&id=1JrLE9LN073PhZ9Qs_OL3j7RhcR32DdRy",
  //   created_at: Date.now(),
  // }),
  // new Car({
  //   type: "هيونداي",
  //   description: "هيونداي سوناتا 2022 FLEET",
  //   location: "الرياض",
  //   price: "103,942",
  //   img_URL:
  //     "https://drive.google.com/uc?export=view&id=1cuRjrRNgN0Iq4aHAzGVR6nV_aiBJ3iJF",
  //   created_at: Date.now(),
  // }),
  // new Car({
  //   type: "فورد",
  //   description: " فورد توروس 2020 FLEET",
  //   location: "جدة",
  //   price: "91,500",
  //   img_URL:
  //     "https://drive.google.com/uc?export=view&id=1yImPt1x7kdrg47eRZ-3mkdWen1IYaa_C",
  //   created_at: Date.now(),
  // }),
];

newCars.forEach((car) => {
  car.save((err) => {
    if (err) {
      console.log(err);
    }
  });
});

// let car1 = new Car({
//   type: "for test",
//   description: "for test",
//   location: "for test",
//   price: "for test",
//   user_id: "for test",
//   created_at: Date.now(),
// });

// car1.save((err) => {
//   if (!err) {
//     console.log("The data has been added");
//   } else console.log(err);
// });
