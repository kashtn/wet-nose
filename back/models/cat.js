import mongoose from 'mongoose';

const CatSchema = new mongoose.Schema({
  kind: { // порода животного
    type: String,
  },
  nickname: { // кличка животного
    type: String,
  },
  photo: [{ // фото животного
    type: String,
  }],
  description: { // описание животного
    type: String,
  },
  age: { // возраст животного
    type: Number,
  },
  pay: { // оплата животного  (платно-бесплатно)
    type: Boolean,
  },
  price: { // цена животного
    type: Number,
  },
  // размер взрослого животного (очень маленькое (хомяк и меньше),
  // маленькое (кошка), среднее (бульдог), , большое (сенбернар?), очень большое (лошадь и более)
  adultSize: {
    type: String,
  },
  adultweight: { // вес взрослого животного
    type: String,
  },
  possibleForAllergySufferers: Boolean, // возможно для аллергиков
  longHaired: Boolean, // длинношерстное
  specialConditionsOfDetention: Boolean, // специальные условия содержания
  childrenInTheHouse: Boolean, // дети в доме
  sellerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model('Cat', CatSchema);
