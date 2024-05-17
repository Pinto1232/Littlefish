const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const products = [
  // Electronics
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise-cancellation and long battery life.',
    price: 99.99,
    category: { name: 'Electronics', description: 'Gadgets and devices' },
    attributes: [
      { name: 'Color', value: 'Black' },
      { name: 'Battery Life', value: '20 hours' }
    ]
  },
  {
    name: 'Smartphone',
    description: 'Latest model smartphone with high-resolution display and fast processor.',
    price: 699.99,
    category: { name: 'Electronics', description: 'Mobile devices' },
    attributes: [
      { name: 'Color', value: 'Silver' },
      { name: 'Storage', value: '128GB' }
    ]
  },
  {
    name: '4K Ultra HD Smart TV',
    description: '55-inch 4K Ultra HD Smart TV with HDR and built-in streaming apps.',
    price: 499.99,
    category: { name: 'Electronics', description: 'Home entertainment' },
    attributes: [
      { name: 'Screen Size', value: '55 inches' },
      { name: 'Resolution', value: '4K Ultra HD' }
    ]
  },
  {
    name: 'Laptop',
    description: 'Powerful laptop with Intel i7 processor, 16GB RAM, and 512GB SSD.',
    price: 1199.99,
    category: { name: 'Electronics', description: 'Computers' },
    attributes: [
      { name: 'Processor', value: 'Intel i7' },
      { name: 'RAM', value: '16GB' },
      { name: 'Storage', value: '512GB SSD' }
    ]
  },
  {
    name: 'Smartwatch',
    description: 'Feature-packed smartwatch with heart rate monitor, GPS, and long battery life.',
    price: 199.99,
    category: { name: 'Electronics', description: 'Wearable devices' },
    attributes: [
      { name: 'Color', value: 'Black' },
      { name: 'Battery Life', value: '7 days' }
    ]
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with powerful sound and waterproof design.',
    price: 49.99,
    category: { name: 'Electronics', description: 'Audio devices' },
    attributes: [
      { name: 'Color', value: 'Blue' },
      { name: 'Battery Life', value: '10 hours' }
    ]
  },
  {
    name: 'Digital Camera',
    description: 'High-resolution digital camera with 20MP sensor and 4K video recording.',
    price: 299.99,
    category: { name: 'Electronics', description: 'Cameras' },
    attributes: [
      { name: 'Resolution', value: '20MP' },
      { name: 'Video', value: '4K' }
    ]
  },
  {
    name: 'Gaming Console',
    description: 'Next-gen gaming console with 4K gaming and 1TB storage.',
    price: 499.99,
    category: { name: 'Electronics', description: 'Gaming' },
    attributes: [
      { name: 'Storage', value: '1TB' },
      { name: 'Resolution', value: '4K' }
    ]
  },
  {
    name: 'Tablet',
    description: '10-inch tablet with high-resolution display and 64GB storage.',
    price: 299.99,
    category: { name: 'Electronics', description: 'Tablets' },
    attributes: [
      { name: 'Screen Size', value: '10 inches' },
      { name: 'Storage', value: '64GB' }
    ]
  },
  {
    name: 'Wireless Earbuds',
    description: 'Compact wireless earbuds with noise-cancellation and long battery life.',
    price: 79.99,
    category: { name: 'Electronics', description: 'Audio devices' },
    attributes: [
      { name: 'Color', value: 'White' },
      { name: 'Battery Life', value: '15 hours' }
    ]
  },

  // Cars
  {
    name: 'Sedan',
    description: 'Comfortable and fuel-efficient sedan with advanced safety features.',
    price: 20000,
    category: { name: 'Cars', description: 'Passenger vehicles' },
    attributes: [
      { name: 'Color', value: 'Red' },
      { name: 'Engine', value: '2.0L' }
    ]
  },
  {
    name: 'SUV',
    description: 'Spacious SUV with all-wheel drive and advanced infotainment system.',
    price: 35000,
    category: { name: 'Cars', description: 'Passenger vehicles' },
    attributes: [
      { name: 'Color', value: 'Black' },
      { name: 'Engine', value: '3.0L' }
    ]
  },
  {
    name: 'Convertible',
    description: 'Stylish convertible with powerful engine and premium interior.',
    price: 45000,
    category: { name: 'Cars', description: 'Passenger vehicles' },
    attributes: [
      { name: 'Color', value: 'Blue' },
      { name: 'Engine', value: '3.5L' }
    ]
  },
  {
    name: 'Truck',
    description: 'Durable truck with high towing capacity and off-road capabilities.',
    price: 40000,
    category: { name: 'Cars', description: 'Utility vehicles' },
    attributes: [
      { name: 'Color', value: 'White' },
      { name: 'Engine', value: '5.0L' }
    ]
  },
  {
    name: 'Electric Car',
    description: 'Eco-friendly electric car with long-range battery and fast charging.',
    price: 35000,
    category: { name: 'Cars', description: 'Electric vehicles' },
    attributes: [
      { name: 'Color', value: 'Green' },
      { name: 'Battery', value: '75 kWh' }
    ]
  },
  {
    name: 'Hybrid Car',
    description: 'Fuel-efficient hybrid car with advanced technology and comfortable ride.',
    price: 30000,
    category: { name: 'Cars', description: 'Hybrid vehicles' },
    attributes: [
      { name: 'Color', value: 'Silver' },
      { name: 'Engine', value: '1.8L' }
    ]
  },
  {
    name: 'Luxury Car',
    description: 'Premium luxury car with high-end features and superior performance.',
    price: 60000,
    category: { name: 'Cars', description: 'Luxury vehicles' },
    attributes: [
      { name: 'Color', value: 'Black' },
      { name: 'Engine', value: '4.0L' }
    ]
  },
  {
    name: 'Sports Car',
    description: 'High-performance sports car with sleek design and powerful engine.',
    price: 70000,
    category: { name: 'Cars', description: 'Sports vehicles' },
    attributes: [
      { name: 'Color', value: 'Red' },
      { name: 'Engine', value: '3.8L' }
    ]
  },
  {
    name: 'Minivan',
    description: 'Family-friendly minivan with spacious interior and advanced safety features.',
    price: 30000,
    category: { name: 'Cars', description: 'Passenger vehicles' },
    attributes: [
      { name: 'Color', value: 'Blue' },
      { name: 'Engine', value: '3.5L' }
    ]
  },
  {
    name: 'Coupe',
    description: 'Stylish coupe with sporty design and advanced technology.',
    price: 40000,
    category: { name: 'Cars', description: 'Passenger vehicles' },
    attributes: [
      { name: 'Color', value: 'Yellow' },
      { name: 'Engine', value: '2.5L' }
    ]
  },

  // Baby
  {
    name: 'Baby Stroller',
    description: 'Lightweight and compact baby stroller with adjustable seat and canopy.',
    price: 150.00,
    category: { name: 'Baby', description: 'Baby gear' },
    attributes: [
      { name: 'Color', value: 'Gray' },
      { name: 'Weight Capacity', value: '50 lbs' }
    ]
  },
  {
    name: 'Baby Crib',
    description: 'Convertible baby crib with adjustable mattress height and sturdy construction.',
    price: 250.00,
    category: { name: 'Baby', description: 'Nursery furniture' },
    attributes: [
      { name: 'Color', value: 'White' },
      { name: 'Material', value: 'Wood' }
    ]
  },
  {
    name: 'Baby Monitor',
    description: 'Video baby monitor with night vision and two-way audio.',
    price: 100.00,
    category: { name: 'Baby', description: 'Baby safety' },
    attributes: [
      { name: 'Range', value: '1000 ft' },
      { name: 'Battery Life', value: '10 hours' }
    ]
  },
  {
    name: 'Baby High Chair',
    description: 'Adjustable high chair with removable tray and easy-to-clean design.',
    price: 75.00,
    category: { name: 'Baby', description: 'Feeding' },
    attributes: [
      { name: 'Color', value: 'Green' },
      { name: 'Weight Capacity', value: '40 lbs' }
    ]
  },
  {
    name: 'Baby Carrier',
    description: 'Ergonomic baby carrier with multiple carrying positions and padded straps.',
    price: 60.00,
    category: { name: 'Baby', description: 'Baby gear' },
    attributes: [
      { name: 'Color', value: 'Blue' },
      { name: 'Weight Capacity', value: '35 lbs' }
    ]
  },
  {
    name: 'Baby Swing',
    description: 'Electric baby swing with multiple speed settings and soothing music.',
    price: 120.00,
    category: { name: 'Baby', description: 'Baby gear' },
    attributes: [
      { name: 'Color', value: 'Pink' },
      { name: 'Weight Capacity', value: '25 lbs' }
    ]
  },
  {
    name: 'Baby Bath Tub',
    description: 'Portable baby bath tub with non-slip base and built-in thermometer.',
    price: 30.00,
    category: { name: 'Baby', description: 'Bathing' },
    attributes: [
      { name: 'Color', value: 'Blue' },
      { name: 'Material', value: 'Plastic' }
    ]
  },
  {
    name: 'Baby Diaper Bag',
    description: 'Spacious diaper bag with multiple compartments and changing pad.',
    price: 40.00,
    category: { name: 'Baby', description: 'Diapering' },
    attributes: [
      { name: 'Color', value: 'Black' },
      { name: 'Material', value: 'Polyester' }
    ]
  },
  {
    name: 'Baby Play Mat',
    description: 'Soft and colorful play mat with interactive toys and activities.',
    price: 50.00,
    category: { name: 'Baby', description: 'Playtime' },
    attributes: [
      { name: 'Color', value: 'Multicolor' },
      { name: 'Material', value: 'Foam' }
    ]
  },
  {
    name: 'Baby Bottle Warmer',
    description: 'Electric bottle warmer with fast heating and auto shut-off.',
    price: 25.00,
    category: { name: 'Baby', description: 'Feeding' },
    attributes: [
      { name: 'Color', value: 'White' },
      { name: 'Power', value: '150W' }
    ]
  },

  // Food
  {
    name: 'Organic Apples',
    description: 'Fresh organic apples, perfect for snacking and baking.',
    price: 3.99,
    category: { name: 'Food', description: 'Fruits' },
    attributes: [
      { name: 'Weight', value: '1 lb' },
      { name: 'Type', value: 'Organic' }
    ]
  },
  {
    name: 'Whole Wheat Bread',
    description: 'Healthy whole wheat bread, baked fresh daily.',
    price: 2.99,
    category: { name: 'Food', description: 'Bakery' },
    attributes: [
      { name: 'Weight', value: '1 loaf' },
      { name: 'Type', value: 'Whole Wheat' }
    ]
  },
  {
    name: 'Almond Milk',
    description: 'Unsweetened almond milk, perfect for smoothies and cereal.',
    price: 3.49,
    category: { name: 'Food', description: 'Dairy Alternatives' },
    attributes: [
      { name: 'Volume', value: '1 quart' },
      { name: 'Type', value: 'Unsweetened' }
    ]
  },
  {
    name: 'Greek Yogurt',
    description: 'Creamy Greek yogurt, rich in protein and probiotics.',
    price: 1.99,
    category: { name: 'Food', description: 'Dairy' },
    attributes: [
      { name: 'Weight', value: '6 oz' },
      { name: 'Flavor', value: 'Plain' }
    ]
  },
  {
    name: 'Organic Spinach',
    description: 'Fresh organic spinach, perfect for salads and smoothies.',
    price: 2.99,
    category: { name: 'Food', description: 'Vegetables' },
    attributes: [
      { name: 'Weight', value: '1 bunch' },
      { name: 'Type', value: 'Organic' }
    ]
  },
  {
    name: 'Free-Range Eggs',
    description: 'Fresh free-range eggs, rich in flavor and nutrients.',
    price: 4.99,
    category: { name: 'Food', description: 'Dairy' },
    attributes: [
      { name: 'Quantity', value: '12' },
      { name: 'Type', value: 'Free-Range' }
    ]
  },
  {
    name: 'Quinoa',
    description: 'Nutritious quinoa, perfect for salads and side dishes.',
    price: 5.99,
    category: { name: 'Food', description: 'Grains' },
    attributes: [
      { name: 'Weight', value: '1 lb' },
      { name: 'Type', value: 'Organic' }
    ]
  },
  {
    name: 'Salmon Fillets',
    description: 'Fresh salmon fillets, rich in omega-3 fatty acids.',
    price: 12.99,
    category: { name: 'Food', description: 'Seafood' },
    attributes: [
      { name: 'Weight', value: '1 lb' },
      { name: 'Type', value: 'Fresh' }
    ],
    imagePath: path.join(__dirname, 'images', 'salmon_fillets.jpg')
  },
  {
    name: 'Dark Chocolate',
    description: 'Rich and smooth dark chocolate, perfect for snacking and baking.',
    price: 2.99,
    category: { name: 'Food', description: 'Snacks' },
    attributes: [
      { name: 'Weight', value: '3.5 oz' },
      { name: 'Cocoa Content', value: '70%' }
    ],
    imagePath: path.join(__dirname, 'images', 'dark_chocolate.jpg')
  },
  {
    name: 'Olive Oil',
    description: 'Extra virgin olive oil, perfect for cooking and salads.',
    price: 9.99,
    category: { name: 'Food', description: 'Pantry' },
    attributes: [
      { name: 'Volume', value: '16.9 oz' },
      { name: 'Type', value: 'Extra Virgin' }
    ],
    imagePath: path.join(__dirname, 'images', 'olive_oil.jpg')
  },
  {
    name: 'Organic Honey',
    description: 'Pure organic honey, perfect for sweetening and baking.',
    price: 7.99,
    category: { name: 'Food', description: 'Pantry' },
    attributes: [
      { name: 'Weight', value: '12 oz' },
      { name: 'Type', value: 'Organic' }
    ],
    imagePath: path.join(__dirname, 'images', 'organic_honey.jpg')
  },

  // Fashion & Apparel
  {
    name: 'Men\'s T-Shirt',
    description: 'Comfortable and stylish men\'s t-shirt, perfect for casual wear.',
    price: 19.99,
    category: { name: 'Fashion & Apparel', description: 'Men\'s Clothing' },
    attributes: [
      { name: 'Color', value: 'Black' },
      { name: 'Size', value: 'L' }
    ],
    imagePath: path.join(__dirname, 'images', 'mens_tshirt.jpg')
  },
  {
    name: 'Women\'s Dress',
    description: 'Elegant and fashionable women\'s dress, perfect for special occasions.',
    price: 49.99,
    category: { name: 'Fashion & Apparel', description: 'Women\'s Clothing' },
    attributes: [
      { name: 'Color', value: 'Red' },
      { name: 'Size', value: 'M' }
    ],
    imagePath: path.join(__dirname, 'images', 'womens_dress.jpg')
  },
  {
    name: 'Men\'s Jeans',
    description: 'Durable and stylish men\'s jeans, perfect for everyday wear.',
    price: 39.99,
    category: { name: 'Fashion & Apparel', description: 'Men\'s Clothing' },
    attributes: [
      { name: 'Color', value: 'Blue' },
      { name: 'Size', value: '32' }
    ],
    imagePath: path.join(__dirname, 'images', 'mens_jeans.jpg')
  },
  {
    name: 'Women\'s Handbag',
    description: 'Chic and versatile women\'s handbag, perfect for any outfit.',
    price: 59.99,
    category: { name: 'Fashion & Apparel', description: 'Accessories' },
    attributes: [
      { name: 'Color', value: 'Brown' },
      { name: 'Material', value: 'Leather' }
    ],
    imagePath: path.join(__dirname, 'images', 'womens_handbag.jpg')
  },
  {
    name: 'Men\'s Sneakers',
    description: 'Comfortable and stylish men\'s sneakers, perfect for casual wear.',
    price: 69.99,
    category: { name: 'Fashion & Apparel', description: 'Footwear' },
    attributes: [
      { name: 'Color', value: 'White' },
      { name: 'Size', value: '10' }
    ],
    imagePath: path.join(__dirname, 'images', 'mens_sneakers.jpg')
  },
  {
    name: 'Women\'s Sandals',
    description: 'Comfortable and stylish women\'s sandals, perfect for summer.',
    price: 29.99,
    category: { name: 'Fashion & Apparel', description: 'Footwear' },
    attributes: [
      { name: 'Color', value: 'Black' },
      { name: 'Size', value: '8' }
    ],
    imagePath: path.join(__dirname, 'images', 'womens_sandals.jpg')
  },
  {
    name: 'Men\'s Watch',
    description: 'Elegant and stylish men\'s watch, perfect for any occasion.',
    price: 199.99,
    category: { name: 'Fashion & Apparel', description: 'Accessories' },
    attributes: [
      { name: 'Color', value: 'Silver' },
      { name: 'Material', value: 'Stainless Steel' }
    ],
    imagePath: path.join(__dirname, 'images', 'mens_watch.jpg')
  },
  {
    name: 'Women\'s Scarf',
    description: 'Soft and stylish women\'s scarf, perfect for any season.',
    price: 19.99,
    category: { name: 'Fashion & Apparel', description: 'Accessories' },
    attributes: [
      { name: 'Color', value: 'Red' },
      { name: 'Material', value: 'Wool' }
    ],
    imagePath: path.join(__dirname, 'images', 'womens_scarf.jpg')
  },
  {
    name: 'Men\'s Jacket',
    description: 'Warm and stylish men\'s jacket, perfect for cold weather.',
    price: 99.99,
    category: { name: 'Fashion & Apparel', description: 'Men\'s Clothing' },
    attributes: [
      { name: 'Color', value: 'Black' },
      { name: 'Size', value: 'L' }
    ],
    imagePath: path.join(__dirname, 'images', 'mens_jacket.jpg')
  },
  {
    name: 'Women\'s Blouse',
    description: 'Elegant and comfortable women\'s blouse, perfect for office wear.',
    price: 29.99,
    category: { name: 'Fashion & Apparel', description: 'Women\'s Clothing' },
    attributes: [
      { name: 'Color', value: 'White' },
      { name: 'Size', value: 'M' }
    ],
    imagePath: path.join(__dirname, 'images', 'womens_blouse.jpg')
  }
];

const uploadProduct = async (product) => {
  const form = new FormData();
  form.append('name', product.name);
  form.append('description', product.description);
  form.append('price', product.price);
  form.append('category[name]', product.category.name);
  form.append('category[description]', product.category.description);
  product.attributes.forEach((attr, index) => {
    form.append(`attributes[${index}][name]`, attr.name);
    form.append(`attributes[${index}][value]`, attr.value);
  });

  // Generate image path based on product name
  const imageName = product.name.toLowerCase().replace(/ /g, '_') + '.jpg';
  const imagePath = path.join(__dirname, 'images', imageName);
  if (fs.existsSync(imagePath)) {
    form.append('image', fs.createReadStream(imagePath));
  } else {
    console.error(`Image not found for product ${product.name}: ${imagePath}`);
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/api/products', form, {
      headers: {
        ...form.getHeaders(),
      },
    });
    console.log(`Product ${product.name} created successfully:`, response.data);
  } catch (error) {
    console.error(`Error creating product ${product.name}:`, error.response ? error.response.data : error.message);
  }
};

const uploadProducts = async () => {
  for (const product of products) {
    await uploadProduct(product);
  }
};

uploadProducts();