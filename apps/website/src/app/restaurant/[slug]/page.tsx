import { mockRestaurants } from '@src/_mock/restaurant';
import RestaurantDetailsView from '@src/sections/restaurant/view/restaurant-details-view';

export default function page() {
  const restaurant = mockRestaurants[0];
  return <RestaurantDetailsView restaurant={restaurant} slug={''} />;
}
