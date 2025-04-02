import { Restaurant } from '@generated/graphql';

// mockData.js
import { faker } from '@faker-js/faker';
import { format, setHours, setMinutes } from 'date-fns';

const generateOperatingHours = () => {
  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  return days.map((day) => {
    const baseDate = new Date('2025-01-01');

    const openDate = faker.date.between({
      from: setHours(setMinutes(baseDate, 0), 8),
      to: setHours(setMinutes(baseDate, 0), 12),
    });

    const closeDate = faker.date.between({
      from: setHours(setMinutes(baseDate, 0), 18),
      to: setHours(setMinutes(baseDate, 0), 23),
    });

    return {
      dayOfWeek: day,
      openTime: format(openDate, 'HH:mm'),
      closeTime: format(closeDate, 'HH:mm'),
      isClosed: faker.datatype.boolean({ probability: 0.1 }),
    };
  });
};

const generateMenuItems = (count = 1) => {
  return Array.from({ length: count }, () => ({
    name: faker.commerce.productName(),
    description: faker.lorem.sentence(4),
    price: parseFloat(faker.commerce.price({ min: 5, max: 50 })),
    imageUrl: faker.image.urlLoremFlickr({ category: 'food', width: 64, height: 64 }),
    isAvailable: faker.datatype.boolean({ probability: 0.9 }),
  }));
};

const generateReviews = (count = 1) => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    rating: faker.number.int({ min: 1, max: 5 }),
    comment: faker.lorem.paragraph(),
    helpful: faker.number.int({ min: 0, max: 50 }),
    avatarUrl: faker.image.avatar(),
    isPurchased: faker.datatype.boolean({ probability: 0.8 }),
    attachments: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () =>
      faker.image.urlLoremFlickr({ category: 'food' }),
    ),
    postedAt: faker.date.past().toISOString(),
    updatedAt: faker.datatype.boolean({ probability: 0.3 }) ? faker.date.recent().toISOString() : null,
  }));
};

const generateRatings = () => {
  const categories = ['Food Quality', 'Service', 'Ambiance'];
  return categories.map((category) => ({
    name: category,
    starCount: faker.number.int({ min: 1, max: 5 }),
    reviewCount: faker.number.int({ min: 10, max: 100 }),
  }));
};

const generateRestaurant = () => {
  const reviewCount = faker.number.int({ min: 5, max: 20 });
  const reviews = generateReviews(reviewCount);
  const ratings = generateRatings();

  return {
    id: faker.string.uuid(),
    name: faker.company.name() + ' Restaurant',
    slug: faker.helpers.slugify(faker.company.name() + '-restaurant').toLowerCase(),
    photos: Array.from({ length: 3 }, () =>
      faker.image.urlLoremFlickr({ category: 'restaurant', width: 800, height: 800 }),
    ),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    },
    cuisineType: faker.helpers.arrayElements(['Italian', 'Thai', 'Mexican', 'Chinese', 'Indian'], { min: 1, max: 3 }),
    phoneNumber: faker.phone.number(),
    email: faker.internet.email({ provider: 'example.com' }),
    website: faker.internet.url(),
    operatingHours: generateOperatingHours(),
    description: faker.lorem.paragraphs(4),
    subDescription: faker.lorem.paragraphs(1),
    ratings,
    reviews,
    totalRatings: parseFloat((reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1)),
    totalReviews: reviewCount,
    isActive: faker.datatype.boolean({ probability: 0.95 }),
    createdAt: faker.date.past({ years: 5 }).toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    recommendedMenus: generateMenuItems(5),
    facilities: faker.helpers.arrayElements(['Wi-Fi', 'Parking', 'Outdoor Seating', 'Air Conditioning'], {
      min: 2,
      max: 4,
    }),
    atmosphere: faker.helpers.arrayElements(['Casual', 'Romantic', 'Family-Friendly', 'Trendy'], { min: 1, max: 3 }),
    serviceLanguages: faker.helpers.arrayElements(['English', 'Spanish', 'Thai'], { min: 1, max: 3 }),
    paymentMethods: faker.helpers.arrayElements(['Cash', 'Credit Card', 'Mobile Payment'], { min: 2, max: 3 }),
    reservationUrl: faker.internet.url(),
    isVerified: faker.datatype.boolean({ probability: 0.9 }),
  };
};

const generateRestaurants = (count = 1) => Array.from({ length: count }, generateRestaurant) as Restaurant[];

export const mockRestaurants = generateRestaurants(3);

export const PUBLISH_OPTIONS = [
  {
    value: 'ACTIVE',
    label: 'Active',
  },
  {
    value: 'INACTIVE',
    label: 'In Active',
  },
];
