import { JwtLoginView } from '@src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Restaurant: The starting point for your next project',
};

export default function HomePage() {
  return <JwtLoginView />;
}
