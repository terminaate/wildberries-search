export default (query: string) =>
  encodeURI(
    `https://search.wb.ru/exactmatch/ru/common/v4/search?appType=1&couponsGeo=2,7,3,6,19,21,8&curr=rub&dest=-1059500,-108082,-365233,-1116490&emp=0&lang=ru&locale=ru&pricemarginCoeff=1.0&query=${query}&reg=0&regions=80,64,83,4,38,33,70,68,69,86,30,40,48,1,66,31,22&resultset=catalog&sort=popular&spp=0&suppressSpellcheck=false`,
  );
