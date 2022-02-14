const path = require('path');
const fs = require('fs');
const axios = require('axios');
// const cheerio = require('cheerio');

// const txt = fs.readFileSync('./1.html', { encoding: 'utf-8' });
// const $ = cheerio.load(txt);
// const trList = $('tr').toArray();
// const res = trList.map((item, i) => {
//   // const tds = $(item).find('td').toArray();
//   const type = $(item).find('td').eq(0).text();
//   const name = $(item).find('td').eq(1).find('a').eq(1).text();
//   const level = $(item).find('td').eq(1).find('a').eq(1).attr('class').replace('item_', '');
//   const explicitMod = $(item).find('td').eq(2).find('.explicitMod').text();
//   const currencyList =$(item).find('td').eq(2).find('.currency').toArray().map(child => $(child).text());
//   const spe = $(item).find('td').eq(2).clone().children().remove().end().text().replace(/\s|\n/g, '');
//   const icon = $(item).find('td').eq(1).find('img').attr('src');
//   const formula = $(item).find('td').eq(3).find('a').toArray().map(c => $(c).text()).filter(t => t);
//   return {
//     id: i + 1, type, name, explicitMod, currencyList, spe, icon, formula, level
//   };
// });
// json = res.map(item => ({
//   ...item,
//   formula: item.formula.map(child => res.find(r => r.name === child).id)
// }))
// fs.writeFileSync('./data.json', JSON.stringify(json), {encoding: 'utf-8'})
// console.log(json);


// 下载图片

const t = fs.readFileSync('./data.json', { encoding: 'utf-8' });
const json = JSON.parse(t);

const downloadImage = async (url) => {
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });
  response.data.pipe(fs.createWriteStream(`./icon/${url.split(/\//)[url.split(/\//).length - 1]}`));

};

// json.forEach(el => {
//   downloadImage(el.icon);
// });
const res = json.map(item => ({
  ...item,
  localIcon: `./icon/${item.icon.split(/\//)[item.icon.split(/\//).length - 1]}`
}));


fs.writeFileSync('./data.json', JSON.stringify(res), {encoding: 'utf-8'})
