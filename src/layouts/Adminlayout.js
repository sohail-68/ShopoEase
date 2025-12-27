import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  ShoppingBag, 
  Settings,
  PieChart,
  FileText,
  Mail,
  Calendar,
  LogOut,
  ChevronDown,
  Bell,
  Search,
  Menu
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location]);

  // Responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:relative z-30 
          ${sidebarOpen ? 'w-64' : 'w-20'} 
           bg-[#0F172A] text-white transition-all duration-300 ease-in-out
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col h-full shadow-xl
        `}
      >
        <div className="p-4 flex items-center justify-between border-b border-[#1E2B4D]">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold whitespace-nowrap flex items-center">
              <span className="bg-[#FCA311] text-[#14213D] rounded-lg p-1 mr-2">
                <PieChart size={20} />
              </span>
              AdminPro
            </h1>
          ) : (
            <span className="text-xl font-bold flex justify-center w-full">
              <span className="bg-[#FCA311] text-[#14213D] rounded-lg p-1">
                <PieChart size={20} />
              </span>
            </span>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-lg hover:bg-[#1E2B4D] transition-colors"
          >
            {sidebarOpen ? '«' : '»'}
          </button>
        </div>
        
        <nav className="flex-1 py-2 overflow-hidden">
          <div className="space-y-1 px-2">
            <SidebarItem 
            isActive={location.pathname === '/admin'}
              to="/admin" 
              icon={<Home size={20} />} 
              title="menu" 
              sidebarOpen={sidebarOpen} 
              exact
            />
            <SidebarItem 
              to="/admin/profile" 
              icon={<Users size={20} />} 
              title="Users" 
              sidebarOpen={sidebarOpen} 
              badge={12}
            />
            <SidebarItem 
              to="/admin/media" 
              icon={<ShoppingBag size={20} />} 
              title="media" 
              sidebarOpen={sidebarOpen} 
            />
            {/* <SidebarItem 
              to="/admin/blog" 
              icon={<PieChart size={20} />} 
              title="blog" 
              sidebarOpen={sidebarOpen} 
            /> */}
            <SidebarItem 
              to="/admin/getblog" 
              icon={<FileText size={20} />} 
              title="Invoices" 
              sidebarOpen={sidebarOpen} 
              badge={3}
            />
            <SidebarItem 
              to="/admin/slider" 
              icon={<Mail size={20} />} 
              title="slider" 
              sidebarOpen={sidebarOpen} 
              badge={5}
            />
            <SidebarItem 
              to="/admin/getcampign" 
              icon={<Calendar size={20} />} 
              title="getcampign" 
              sidebarOpen={sidebarOpen} 
            />
              <SidebarItem 
              to="/admin/team" 
              icon={<Calendar size={20} />} 
              title="Team" 
              sidebarOpen={sidebarOpen} 
            />
               <SidebarItem 
              to="/admin/teammember" 
              icon={<Calendar size={20} />} 
              title="teammember" 
              sidebarOpen={sidebarOpen} 
            />
             <SidebarItem 
              to="/admin/allpages" 
              icon={<Calendar size={20} />} 
              title="allpages" 
              sidebarOpen={sidebarOpen} 
            />
          </div>

          <div className="px-2 mt-6 border-t border-[#1E2B4D] pt-4">
            <SidebarItem 
              to="/admin/settings" 
              icon={<Settings size={20} />} 
              title="Settings" 
              sidebarOpen={sidebarOpen} 
            />
          </div>
        </nav>

        <div className="p-2 border-t border-[#1E2B4D]">
          <button 
            className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-[#1E2B4D] transition-colors"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="flex items-center">
              <img 
                src="https://randomuser.me/api/portraits/men/1.jpg" 
                alt="User" 
                className="w-8 rounded-full"
              />
              {sidebarOpen && (
                <div className="ml-3 text-left">
                  <p className=" text-md font-sans">John Doe</p>
                  <p className="text-md font-sans">Admin</p>
                </div>
              )}
            </div>
            {sidebarOpen && <ChevronDown className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} size={16} />}
          </button>
          
          {dropdownOpen && sidebarOpen && (
            <div className="mt-2 bg-[#1E2B4D] rounded-lg p-2 shadow-lg">
              <button className="flex items-center w-full p-2 rounded-lg hover:bg-[#14213D] transition-colors text-md">
                <Settings className="mr-2 text-md font-sans" size={16} />
              <span className='mr-2 text-md font-sans'>Profile Settings</span>  
              </button>
              <button className="flex items-center w-full p-2 rounded-lg hover:bg-[#14213D] transition-colors text-md">
                <LogOut className="mr-2" size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-[#1E293B] shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <button 
                className="lg:hidden p-2 rounded-lg bg-gray-100 mr-2"
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              >
                <Menu size={20} />
              </button>
              <div className="relative lg:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-sans "  size={18} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FCA311]/50 focus:border-[#FCA311]"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 relative">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              
              <div className="hidden md:flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
                <img 
                  src="https://randomuser.me/api/portraits/men/1.jpg" 
                  alt="User" 
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumbs */}
        {/* <div className="bg-white px-6 py-3 flex items-center text-sm">
          <Link to="/admin" className="text-[#FCA311] hover:underline">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600 capitalize">{location.pathname.split('/').pop() || 'Dashboard'}</span>
        </div> */}

        {/* Content */}
        <main className="flex-1 overflow-auto bg-[#ffffff]">
          <div className="">
            <div className=" rounded-xl shadow-sm p-2 md:p-6">
              <Outlet />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white ">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left text-gray-600 text-sm">
              © {new Date().getFullYear()} AdminPro - Version 1.0.0
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-[#FCA311] text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-[#FCA311] text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-[#FCA311] text-sm">Help Center</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
const SidebarItem = ({ to, icon, title, sidebarOpen, badge, exact = false }) => {
  const location = useLocation();
  return (
    <NavLink
      to={to}
      end={exact}
      className={({ isActive }) => 
        `flex items-center p-3 rounded-lg font-sans transition-colors 
        ${to===location.pathname ? 'bg-[#1E2B4D] text-[#fff] ' : 'hover:bg-[#1E2B4D]'}`
      }
    >
      <div className="relative">
        {icon}
        {badge && (
          <span className={`absolute -top-2 -right-2 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center
            ${badge > 9 ? 'px-1 text-[10px]' : ''}
            ${badge > 0 && badge < 4 ? 'bg-green-500' : 
              badge >= 4 && badge < 8 ? 'bg-yellow-500' : 'bg-red-500'}
          `}>
            {badge > 9 ? '9+' : badge}
          </span>
        )}
      </div>
      {sidebarOpen && <span className="ml-3 font-sans text-lg ">{title}</span>}
    </NavLink>
  );
};

export default AdminLayout;