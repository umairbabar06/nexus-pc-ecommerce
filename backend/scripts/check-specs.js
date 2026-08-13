require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  // CPU socket coverage
  const cpuWithSocket = await Product.countDocuments({category:'cpu', 'specs.socket':{$exists:true,$ne:''}, deleted_at:null});
  const cpuTotal = await Product.countDocuments({category:'cpu', deleted_at:null});
  console.log('CPUs with socket:', cpuWithSocket, '/', cpuTotal);
  
  const cpuSamples = await Product.find({category:'cpu', deleted_at:null}).select('name specs.socket brand').limit(10).lean();
  cpuSamples.forEach(p => console.log(p.brand, '|', p.name, '| socket:', p.specs?.socket || 'NONE'));
  
  console.log();
  const moboFF = await Product.distinct('specs.formFactor', {category:'mobo', deleted_at:null});
  console.log('Mobo form factors:', moboFF);
  const casingFF = await Product.distinct('specs.formFactor', {category:'casing', deleted_at:null});
  console.log('Case form factors:', casingFF);
  const coolerSockets = await Product.distinct('specs.socket', {category:'cooler', deleted_at:null});
  console.log('Cooler sockets:', coolerSockets);
  const psuWattage = await Product.distinct('specs.wattage', {category:'psu', deleted_at:null});
  console.log('PSU wattages:', psuWattage);
  
  // Count each category
  const categories = ['cpu','mobo','ram','gpu','ssd','hdd','psu','casing','cooler'];
  for (const cat of categories) {
    const c = await Product.countDocuments({category: cat, deleted_at: null});
    console.log(cat + ':', c, 'products');
  }
  
  mongoose.disconnect();
});
