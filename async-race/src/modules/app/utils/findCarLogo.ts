export function findCarLogo(carName: string): string {
  const carBrands = [
    "alpina",
    "audi",
    "bmw",
    "citroen",
    "dodge",
    "ferrari",
    "fiat",
    "ford",
    "honda",
    "infiniti",
    "jeep",
    "kia",
    "lamborghini",
    "lexus",
    "lincoln",
    "mazda",
    "mercedes",
    "mini",
    "mitsubishi",
    "opel",
    "peugeot",
    "porsche",
    "rolls-royce",
    "skoda",
    "subaru",
    "suzuki",
    "tesla",
  ];

  //   const regex = new RegExp(`\\b${brand}\\b`, "i");
  //   if (regex.test(carName)) result = brand;

  const lowerInput = carName.toLowerCase();
  return carBrands.find((brand) => lowerInput.includes(brand.toLowerCase()));
}
