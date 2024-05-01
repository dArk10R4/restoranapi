const RestaurantModel = require("../models/Restaurant");

class Restaurant {
  constructor() {
    this.RestaurantModel = RestaurantModel;
  }

  async getAllRestaurants() {
    try {
      return await this.RestaurantModel.find();
    } catch (error) {
      throw error;
    }
  }

  async getRestaurantById(id) {
    try {
      return await this.RestaurantModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async filterRestaurants(data) {
    console.log("repository", data);
    let pipeline = [];
    try {
      // if (data.name) {
      //     pipeline.push({ $match: { name: data.name } });
      // }

      if (data.rating) {
        pipeline.push({ $match: { rating: { $gte: data.rating } } });
      }
      // console.log(pipeline,(data.rating))
      // if (data.location) {
      //     pipeline.push({ $near: { type: "Point", coordinates: data.location }, $maxDistance: 1000 });
      // }
      // }
      if (data.bounds) {
        // console.log(data.bounds, "bounds")
        pipeline.push({
          $match: {
            location: {
              $geoWithin: {
                $geometry: {
                  type: "Polygon",
                  coordinates: [
                    [
                      [data.bounds.south, data.bounds.west],
                      [data.bounds.south, data.bounds.east],
                      [data.bounds.north, data.bounds.east],
                      [data.bounds.north, data.bounds.west],
                      [data.bounds.south, data.bounds.west], // Closing the polygon
                    ],
                  ],
                },
              },
            },
          },
        });
      }

      if (data.price) {
        pipeline.push({
          $match: {
            minprice: { $gte: data.price[0] },
            maxprice: { $lte: data.price[1] },
          },
        });

        if (data.sets && data.sets.length > 0) {
          pipeline.push({
            $match: {
              "sets.name": { $in: data.sets },
            },
          });
        }

        if (data.meals && data.meals.length > 0) {
          pipeline.push({
            $match: {
              "meals.name": { $in: data.meals },
            },
          });
        }
      }

      if (pipeline.length === 0) {
        return await this.RestaurantModel.find();
      }

      return await this.RestaurantModel.aggregate(pipeline).exec();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

async function a() {
  let example = [
    {
      name: "Ocakbaşı 62",
      location: {
        type: "Point",
        coordinates: [40.37206, 49.83798],
      },
      rating: 4.5,
      menu: "https://www.instagram.com/stories/highlights/18068989060467625/",

      minprice: 3,
      maxprice: 145,
      phone: "+994 50 877 00 62",
      mealType: ["breakfast", "lunch", "dinner", "dessert"],
      meals: [
        { name: "Qəlyanaltılar", price: 5 },
        { name: "Kabablar", price: 18 },
        { name: "Şirniyyatlar", price: 7 },
        { name: "Məzələr", price: 4 },
        { name: "Qarnir", price: 5 },
        { name: "Salatlar", price: 10 },
        { name: "Soba yeməkləri", price: 3 },
        { name: "Steyk", price: 17 },
        { name: "Şorbalar", price: 5 },
      ],
      sets: [
        { name: "Kabab Seti", price: 40 },
        { name: "Səhər Yeməyi", price: 30 },
      ],
      image: "/ocak_basi.png",
    },
    {
      name: "Qış parkı Özsüt Baku",
      location: {
        type: "Point",
        coordinates: [40.37707, 49.83815],
      },
      rating: 4,
      menu: "https://ozsut.az/menyu",

      minprice: 1,
      maxprice: 80,
      phone: "+994(77) 341-00-11",
      mealType: ["breakfast", "lunch", "dinner", "dessert"],
      meals: [
        { name: "Fast Food", price: 7 },
        { name: "Dondurma", price: 9 },
        { name: "Dürümlər", price: 12 },
        { name: "Dəniz məhsulları", price: 19 },
        { name: "Kokteyllər", price: 6 },
        { name: "Meyvə", price: 8 },
        { name: "Pizza", price: 12 },
        { name: "Qəlyanaltılar", price: 5 },
        { name: "Salatlar", price: 10 },
        { name: "Seçməli səhər yeməyi", price: 1 },
        { name: "Souslar", price: 1 },
        { name: "Soyuq Qəhvələr", price: 7 },
        { name: "Səhər Yeməyi", price: 5 },
        { name: "Top dondurma", price: 2 },
        { name: "Toyuq ətli yeməklər", price: 14 },
        { name: "Xəmir yeməkləri", price: 12 },
        { name: "Çay", price: 3 },
        { name: "İsti qəhvələr", price: 2 },
        { name: "Şirniyyatlar", price: 0 },
        { name: "Şorbalar", price: 6 },
        { name: "Ətli yeməklər", price: 17 },
      ],
      sets: [{ name: "Səhər Yeməyi Seti", price: 14 }],
      image: "/oz_sut_qis_parki.png",
    },

    {
      name: "Elmlər Özsüt Baku",
      location: {
        type: "Point",
        coordinates: [40.40212, 49.85038],
      },
      rating: 4.5,
      menu: "https://ozsut.az/menyu",

      minprice: 1,
      maxprice: 80,
      phone: "+994 50 877 00 62",
      mealType: ["breakfast", "lunch", "dinner", "dessert"],
      meals: [
        { name: "Fast Food", price: 7 },
        { name: "Dondurma", price: 9 },
        { name: "Dürümlər", price: 12 },
        { name: "Dəniz məhsulları", price: 19 },
        { name: "Kokteyllər", price: 6 },
        { name: "Meyvə", price: 8 },
        { name: "Pizza", price: 12 },
        { name: "Qəlyanaltılar", price: 5 },
        { name: "Salatlar", price: 10 },
        { name: "Seçməli səhər yeməyi", price: 1 },
        { name: "Souslar", price: 1 },
        { name: "Soyuq Qəhvələr", price: 7 },
        { name: "Səhər Yeməyi", price: 5 },
        { name: "Dondurma", price: 2 },
        { name: "Toyuq yeməkləri", price: 14 },
        { name: "Xəmir yeməkləri", price: 12 },
        { name: "Çay", price: 3 },
        { name: "İsti qəhvələr", price: 2 },
        { name: "Şirniyyatlar", price: 0 },
        { name: "Şorbalar", price: 6 },
        { name: "Ətli yeməklər", price: 17 },
      ],
      sets: [{ name: "Səhər Yeməyi Seti", price: 14 }],
      image: "/oz_sut_elimler.png",
    },
    {
      name: "CafeCity Fəvvarələr",
      location: {
        type: "Point",
        coordinates: [40.37388, 49.84712],
      },
      rating: 4.5,
      menu: "https://cafecity.az/en/restaurant/menu/cafecity",

      minprice: 3,
      maxprice: 80,
      phone: "(050) 598 86 86",
      mealType: ["breakfast", "lunch", "dinner", "dessert"],
      meals: [
        { name: "Kokteyllər", price: 5 },
        { name: "Kofe", price: 2 },
        { name: "Şirniyyatlar", price: 3 },
        { name: "Sıxılmış Şirələr", price: 4 },
        { name: "Konyak", price: 9 },
        { name: "Limonadlar", price: 4 },
        { name: "Milli mətbəx", price: 3 },
        { name: "Pastalar", price: 7 },
        { name: "Pizzalar", price: 9 },
        { name: "Qəlyanaltılar", price: 6 },
        { name: "Salatlar", price: 7 },
        { name: "Sendviç və burgerlər", price: 12 },
        { name: "Sadə içkilər", price: 1 },
        { name: "Souslar", price: 1 },
        { name: "Pivələr", price: 3 },
        { name: "Səhər yeməyi", price: 4 },
        { name: "Viski", price: 6 },
        { name: "Vodka", price: 6 },
        { name: "Çay", price: 4 },
        { name: "Şorbalar", price: 4 },
        { name: "Əsas yeməklər", price: 7 },
        { name: "Текila", price: 6 },
      ],
      sets: [{ name: "Səhər Yeməyi Seti", price: 38 }],
      image: "/kafe_city.png",
    },
    {
      name: "Calipso",
      location: {
        type: "Point",
        coordinates: [40.37596, 49.84496],
      },
      rating: 5,
      menu: "https://monyo.az/?r=Calipso",

      minprice: 3,
      maxprice: 80,
      phone: "050 221 12 42",
      mealType: ["breakfast", "lunch", "dinner", "dessert"],
      meals: [
        { name: "Kokteyllər", price: 7 },
        { name: "Araq", price: 5 },
        { name: "Balıq", price: 20 },
        { name: "Çaxırlar", price: 9 },
        { name: "Çay", price: 1 },
        { name: "Şirniyyatlar", price: 5 },
        { name: "Kofe", price: 4 },
        { name: "Konyak", price: 10 },
        { name: "Pizzalar", price: 10 },
        { name: "Pivələr", price: 5 },
        { name: "Qarnir", price: 4 },
        { name: "Qəlyan", price: 30 },
        { name: "Salatlar", price: 5 },
        { name: "Sıxılmış Şirələr", price: 3 },
        { name: "Sadə içkilər", price: 3 },
        { name: "Qəlyanaltılar", price: 1 },
        { name: "Səhər yeməyi", price: 2 },
        { name: "Tekila", price: 8 },
        { name: "Təndir və Manqal", price: 4 },
        { name: "Viski", price: 7 },
        { name: "Xəmir yeməkləri", price: 6 },
        { name: "Pastalar", price: 10 },
        { name: "Şorbalar", price: 5 },
        { name: "Əsas Yeməklər", price: 8 },
      ],
      sets: [
        { name: "Kabab Seti", price: 65 },
        { name: "Səhər Yeməyi", price: 30 },
        { name: "Sac Seti", price: 69 },
        { name: "Balıq Seti", price: 55 },
      ],
      image: "/calipso.png",
    },
    {
      name: "Chinar Restaurant Lounge",
      location: {
        type: "Point",
        coordinates: [40.67992, 46.36092],
      },
      rating: 4.5,
      menu: "https://chinar-dining.az/",

      minprice: 3,
      maxprice: 60,
      phone: "051 404 82 11",
      mealType: ["breakfast", "lunch", "dinner", "dessert"],
      meals: [
        { name: "Kokteyllər", price: 5 },
        { name: "Fast Food", price: 6 },
        { name: "Dəniz Məhsulları", price: 10 },
        { name: "Sıxılmış Şirələr", price: 4 },
        { name: "Kabablar", price: 5 },
        { name: "Lahmacun", price: 4 },
        { name: "Milli Mətbəx", price: 8 },
        { name: "Pastalar", price: 8 },
        { name: "Pide", price: 6 },
        { name: "Pizzalar", price: 8 },
        { name: "Qarnir", price: 3 },
        { name: "Salatlar", price: 3 },
        { name: "Kofe", price: 3 },
        { name: "Sadə içkilər", price: 2 },
        { name: "Steak", price: 17 },
        { name: "Şorbalar", price: 3 },
        { name: "Suşi", price: 7 },
        { name: "Səhər Yeməyi", price: 10 },
        { name: "Çay", price: 2 },
        { name: "Qəlyanaltılar", price: 2 },
        { name: "Toyuq yeməkləri", price: 10 },
        { name: "Ətli yeməklər", price: 14 },
        { name: "Şirniyyatlar", price: 2 },
      ],
      sets: [{ name: "Səhər Yeməyi Seti", price: 12 }],
      image: "/chinar_restaurant.png",
    },
    {
      name: "Hərbi Muzey Restoran 1920-1991",
      location: {
        type: "Point",
        coordinates: [40.375, 49.84022],
      },
      rating: 4.5,
      menu: "https://monyo.az/?r=partizan_restaurant",

      minprice: 3,
      maxprice: 70,
      phone: "077 619 41 45",
      mealType: ["breakfast", "lunch", "dinner", "dessert"],
      meals: [
        { name: "Sadə içkilər", price: 2 },
        { name: "Araq", price: 20 },
        { name: "Şirniyyatlar", price: 5 },
        { name: "Fast Food", price: 5 },
        { name: "Limonadlar", price: 6 },
        { name: "Pastalar", price: 12 },
        { name: "Məzələr", price: 3 },
        { name: "Pivələr", price: 2 },
        { name: "Qarnir", price: 3 },
        { name: "Qəlyanaltılar", price: 2 },
        { name: "Qəlyan", price: 20 },
        { name: "Salatlar", price: 4 },
        { name: "Steyk", price: 20 },
        { name: "Tekila", price: 5 },
        { name: "Viski", price: 5 },
        { name: "Əsas yeməklər", price: 10 },
        { name: "Kofe", price: 6 },
        { name: "Çay", price: 6 },
        { name: "Şorbalar", price: 3 },
        { name: "Şərablar", price: 4 },
      ],
      sets: [],
      image: "/herbi_muzey_restoran.png",
    },
    {
      name: "Zühtü Baku",
      location: {
        type: "Point",
        coordinates: [40.36968, 49.83934],
      },
      rating: 0,
      menu: "https://monyo.az/?r=zuhtu_baku",

      minprice: 3,
      maxprice: 40,
      phone: "055 655 19 00",
      mealType: ["breakfast", "lunch", "dinner", "dessert"],
      meals: [
        { name: "Qəlyanaltılar", price: 3 },
        { name: "Kofe", price: 3 },
        { name: "Çay", price: 3 },
        { name: "Kabablar", price: 11 },
        { name: "Məzələr", price: 4 },
        { name: "Salatalar", price: 7 },
        { name: "Sadə içkilər", price: 2 },
        { name: "Şirniyyatlar", price: 8 },
        { name: "Şorbalar", price: 4 },
      ],
      sets: [
        { name: "Kabab Seti", price: 0 },
        { name: "Səhər Yeməyi Seti", price: 25 },
        { name: "Sac Seti", price: 0 },
        { name: "Balıq Seti", price: 0 },
      ],
      image: "/zuhtu_baku.png",
    },
  ];

  RestaurantModel.insertMany(example)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// a();

module.exports = new Restaurant();

filters = {
  yemekler: ["dfs", "seher yemeyi", "isti yemekler"],
  ickiler: ["kofe"],
};
