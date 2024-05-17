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
    ],
    stock: 50,
    brand: 'BrandX',
    ratings: [5, 4, 4],
    isAvailable: true,
    discount: 10,
    tags: ['wireless', 'bluetooth', 'headphones'],
    weight: 0.5,
    dimensions: { length: 10, width: 8, height: 4 },
    manufacturer: 'ManufacturerX',
    warranty: '1 year',
    reviews: [
      { user: 'user1', comment: 'Great headphones!' },
      { user: 'user2', comment: 'Good value for money.' }
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
    ],
    stock: 30,
    brand: 'BrandY',
    ratings: [5, 5, 4],
    isAvailable: true,
    discount: 5,
    tags: ['smartphone', 'mobile', 'device'],
    weight: 0.2,
    dimensions: { length: 6, width: 3, height: 0.3 },
    manufacturer: 'ManufacturerY',
    warranty: '2 years',
    reviews: [
      { user: 'user3', comment: 'Amazing phone!' },
      { user: 'user4', comment: 'Very fast and reliable.' }
    ]
  },
  // Add other products similarly...

  // Cars
  {
    name: 'Sedan',
    description: 'Comfortable and fuel-efficient sedan with advanced safety features.',
    price: 20000,
    category: { name: 'Cars', description: 'Passenger vehicles' },
    attributes: [
      { name: 'Color', value: 'Red' },
      { name: 'Engine', value: '2.0L' }
    ],
    stock: 10,
    brand: 'BrandA',
    ratings: [4, 4, 3],
    isAvailable: true,
    discount: 0,
    tags: ['sedan', 'car', 'vehicle'],
    weight: 1500,
    dimensions: { length: 180, width: 70, height: 55 },
    manufacturer: 'ManufacturerA',
    warranty: '3 years',
    reviews: [
      { user: 'user5', comment: 'Very comfortable.' },
      { user: 'user6', comment: 'Great fuel efficiency.' }
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
    ],
    stock: 5,
    brand: 'BrandB',
    ratings: [5, 5, 4],
    isAvailable: true,
    discount: 0,
    tags: ['suv', 'car', 'vehicle'],
    weight: 2000,
    dimensions: { length: 190, width: 75, height: 65 },
    manufacturer: 'ManufacturerB',
    warranty: '4 years',
    reviews: [
      { user: 'user7', comment: 'Very spacious.' },
      { user: 'user8', comment: 'Great for family trips.' }
    ]
  },
  // Add other products similarly...

  // Baby
  {
    name: 'Baby Stroller',
    description: 'Lightweight and compact baby stroller with adjustable seat and canopy.',
    price: 150.00,
    category: { name: 'Baby', description: 'Baby gear' },
    attributes: [
      { name: 'Color', value: 'Gray' },
      { name: 'Weight Capacity', value: '50 lbs' }
    ],
    stock: 20,
    brand: 'BrandC',
    ratings: [4, 4, 5],
    isAvailable: true,
    discount: 0,
    tags: ['baby', 'stroller', 'gear'],
    weight: 10,
    dimensions: { length: 40, width: 20, height: 40 },
    manufacturer: 'ManufacturerC',
    warranty: '1 year',
    reviews: [
      { user: 'user9', comment: 'Very convenient.' },
      { user: 'user10', comment: 'Easy to use.' }
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
    ],
    stock: 15,
    brand: 'BrandD',
    ratings: [5, 5, 4],
    isAvailable: true,
    discount: 0,
    tags: ['baby', 'crib', 'furniture'],
    weight: 30,
    dimensions: { length: 60, width: 30, height: 40 },
    manufacturer: 'ManufacturerD',
    warranty: '2 years',
    reviews: [
      { user: 'user11', comment: 'Very sturdy.' },
      { user: 'user12', comment: 'Great quality.' }
    ]
  },
  // Add other products similarly...

  // Food
  {
    name: 'Organic Apples',
    description: 'Fresh organic apples, perfect for snacking and baking.',
    price: 3.99,
    category: { name: 'Food', description: 'Fruits' },
    attributes: [
      { name: 'Weight', value: '1 lb' },
      { name: 'Type', value: 'Organic' }
    ],
    stock: 100,
    brand: 'BrandE',
    ratings: [5, 4, 4],
    isAvailable: true,
    discount: 0,
    tags: ['organic', 'apples', 'fruit'],
    weight: 1,
    dimensions: { length: 4, width: 4, height: 4 },
    manufacturer: 'ManufacturerE',
    warranty: 'N/A',
    reviews: [
      { user: 'user13', comment: 'Very fresh.' },
      { user: 'user14', comment: 'Great taste.' }
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
    ],
    stock: 50,
    brand: 'BrandF',
    ratings: [4, 4, 5],
    isAvailable: true,
    discount: 0,
    tags: ['whole wheat', 'bread', 'bakery'],
    weight: 1,
    dimensions: { length: 10, width: 5, height: 4 },
    manufacturer: 'ManufacturerF',
    warranty: 'N/A',
    reviews: [
      { user: 'user15', comment: 'Very healthy.' },
      { user: 'user16', comment: 'Great taste.' }
    ]
  },
  // Add other products similarly...

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
    stock: 100,
    brand: 'BrandG',
    ratings: [4, 4, 4],
    isAvailable: true,
    discount: 0,
    tags: ['men', 't-shirt', 'clothing'],
    weight: 0.2,
    dimensions: { length: 30, width: 20, height: 1 },
    manufacturer: 'ManufacturerG',
    warranty: 'N/A',
    reviews: [
      { user: 'user17', comment: 'Very comfortable.' },
      { user: 'user18', comment: 'Great fit.' }
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
    stock: 50,
    brand: 'BrandH',
    ratings: [5, 4, 5],
    isAvailable: true,
    discount: 0,
    tags: ['women', 'dress', 'clothing'],
    weight: 0.3,
    dimensions: { length: 40, width: 30, height: 1 },
    manufacturer: 'ManufacturerH',
    warranty: 'N/A',
    reviews: [
      { user: 'user19', comment: 'Very elegant.' },
      { user: 'user20', comment: 'Perfect for special occasions.' }
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
    stock: 75,
    brand: 'BrandI',
    ratings: [4, 4, 4],
    isAvailable: true,
    discount: 0,
    tags: ['men', 'jeans', 'clothing'],
    weight: 0.8,
    dimensions: { length: 40, width: 30, height: 1 },
    manufacturer: 'ManufacturerI',
    warranty: 'N/A',
    reviews: [
      { user: 'user21', comment: 'Very durable.' },
      { user: 'user22', comment: 'Great fit.' }
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
    stock: 40,
    brand: 'BrandJ',
    ratings: [5, 5, 4],
    isAvailable: true,
    discount: 0,
    tags: ['women', 'handbag', 'accessories'],
    weight: 1.0,
    dimensions: { length: 15, width: 10, height: 5 },
    manufacturer: 'ManufacturerJ',
    warranty: '1 year',
    reviews: [
      { user: 'user23', comment: 'Very chic.' },
      { user: 'user24', comment: 'Perfect for any outfit.' }
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
    stock: 60,
    brand: 'BrandK',
    ratings: [4, 4, 5],
    isAvailable: true,
    discount: 0,
    tags: ['men', 'sneakers', 'footwear'],
    weight: 1.2,
    dimensions: { length: 12, width: 8, height: 5 },
    manufacturer: 'ManufacturerK',
    warranty: '1 year',
    reviews: [
      { user: 'user25', comment: 'Very comfortable.' },
      { user: 'user26', comment: 'Great for casual wear.' }
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
    stock: 80,
    brand: 'BrandL',
    ratings: [4, 4, 4],
    isAvailable: true,
    discount: 0,
    tags: ['women', 'sandals', 'footwear'],
    weight: 0.5,
    dimensions: { length: 10, width: 6, height: 2 },
    manufacturer: 'ManufacturerL',
    warranty: 'N/A',
    reviews: [
      { user: 'user27', comment: 'Very comfortable.' },
      { user: 'user28', comment: 'Perfect for summer.' }
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
    stock: 30,
    brand: 'BrandM',
    ratings: [5, 5, 4],
    isAvailable: true,
    discount: 0,
    tags: ['men', 'watch', 'accessories'],
    weight: 0.3,
    dimensions: { length: 8, width: 2, height: 0.5 },
    manufacturer: 'ManufacturerM',
    warranty: '2 years',
    reviews: [
      { user: 'user29', comment: 'Very elegant.' },
      { user: 'user30', comment: 'Perfect for any occasion.' }
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
    stock: 100,
    brand: 'BrandN',
    ratings: [4, 4, 4],
    isAvailable: true,
    discount: 0,
    tags: ['women', 'scarf', 'accessories'],
    weight: 0.2,
    dimensions: { length: 60, width: 10, height: 0.5 },
    manufacturer: 'ManufacturerN',
    warranty: 'N/A',
    reviews: [
      { user: 'user31', comment: 'Very soft.' },
      { user: 'user32', comment: 'Perfect for any season.' }
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
    stock: 50,
    brand: 'BrandO',
    ratings: [5, 4, 4],
    isAvailable: true,
    discount: 0,
    tags: ['men', 'jacket', 'clothing'],
    weight: 1.5,
    dimensions: { length: 40, width: 30, height: 2 },
    manufacturer: 'ManufacturerO',
    warranty: '1 year',
    reviews: [
      { user: 'user33', comment: 'Very warm.' },
      { user: 'user34', comment: 'Perfect for cold weather.' }
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
    stock: 70,
    brand: 'BrandP',
    ratings: [4, 4, 4],
    isAvailable: true,
    discount: 0,
    tags: ['women', 'blouse', 'clothing'],
    weight: 0.3,
    dimensions: { length: 30, width: 20, height: 1 },
    manufacturer: 'ManufacturerP',
    warranty: 'N/A',
    reviews: [
      { user: 'user35', comment: 'Very elegant.' },
      { user: 'user36', comment: 'Perfect for office wear.' }
    ],
    imagePath: path.join(__dirname, 'images', 'womens_blouse.jpg')
  }
];


const uploadProduct = async (product) => {
  const form = new FormData();
  form.append('name', product.name);
  form.append('description', product.description);
  form.append('price', product.price.toString()); // Ensure price is a string
  form.append('category[name]', product.category.name);
  form.append('category[description]', product.category.description);
  product.attributes.forEach((attr, index) => {
    form.append(`attributes[${index}][name]`, attr.name);
    form.append(`attributes[${index}][value]`, attr.value);
  });
  form.append('stock', product.stock.toString()); // Ensure stock is a string
  form.append('brand', product.brand);
  product.ratings.forEach((rating, index) => {
    form.append(`ratings[${index}]`, rating.toString()); // Ensure ratings are strings
  });
  form.append('isAvailable', product.isAvailable.toString()); // Ensure isAvailable is a string
  form.append('discount', product.discount.toString()); // Ensure discount is a string
  product.tags.forEach((tag, index) => {
    form.append(`tags[${index}]`, tag);
  });
  form.append('weight', product.weight.toString()); // Ensure weight is a string
  form.append('dimensions[length]', product.dimensions.length.toString()); // Ensure dimensions are strings
  form.append('dimensions[width]', product.dimensions.width.toString());
  form.append('dimensions[height]', product.dimensions.height.toString());
  form.append('manufacturer', product.manufacturer);
  form.append('warranty', product.warranty);
  product.reviews.forEach((review, index) => {
    form.append(`reviews[${index}][user]`, review.user);
    form.append(`reviews[${index}][comment]`, review.comment);
  });

  // Generate image path based on product name
  const imageName = product.name.toLowerCase().replace(/ /g, '_').replace(/'/g, '') + '.jpg';
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