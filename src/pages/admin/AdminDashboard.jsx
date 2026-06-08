import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { FiGrid, FiShoppingBag, FiMap, FiUsers, FiStar, FiCreditCard, FiFileText, FiBell, FiSettings } from 'react-icons/fi';
import Overview from './Overview';
import BookingsManagement from './BookingsManagement';
import PackagesManagement from './PackagesManagement';
import DestinationsManagement from './DestinationsManagement';
import UsersManagement from './UsersManagement';
import ReviewsManagement from './ReviewsManagement';
import PaymentsManagement from './PaymentsManagement';
import BlogsManagement from './BlogsManagement';
import NotificationsManagement from './NotificationsManagement';
import SettingsPage from './SettingsPage';

const sidebarLinks = [
  { path: '/superadmin/dashboard', label: 'Dashboard', icon: FiGrid },
  { path: '/superadmin/dashboard/bookings', label: 'Bookings', icon: FiShoppingBag },
  { path: '/superadmin/dashboard/packages', label: 'Packages', icon: FiShoppingBag },
  { path: '/superadmin/dashboard/destinations', label: 'Destinations', icon: FiMap },
  { path: '/superadmin/dashboard/users', label: 'Users', icon: FiUsers },
  { path: '/superadmin/dashboard/reviews', label: 'Reviews', icon: FiStar },
  { path: '/superadmin/dashboard/payments', label: 'Payments', icon: FiCreditCard },
  { path: '/superadmin/dashboard/blogs', label: 'Blogs', icon: FiFileText },
  { path: '/superadmin/dashboard/notifications', label: 'Notifications', icon: FiBell },
  { path: '/superadmin/dashboard/settings', label: 'Settings', icon: FiSettings }
];

export default function AdminDashboard() {
  return (
    <DashboardLayout sidebarLinks={sidebarLinks}>
      <Routes>
        <Route index element={<Overview />} />
        <Route path="bookings" element={<BookingsManagement />} />
        <Route path="packages" element={<PackagesManagement />} />
        <Route path="destinations" element={<DestinationsManagement />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="reviews" element={<ReviewsManagement />} />
        <Route path="payments" element={<PaymentsManagement />} />
        <Route path="blogs" element={<BlogsManagement />} />
        <Route path="notifications" element={<NotificationsManagement />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    </DashboardLayout>
  );
}
