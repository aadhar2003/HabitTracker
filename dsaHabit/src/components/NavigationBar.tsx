import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Plus, Bell} from 'lucide-react';

export function NavigationBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#1E1E1E] p-4">
      <ul className="flex justify-around">
        <NavItem to="/" icon={<Home className="w-6 h-6" />} label="Home" />
        <NavItem to="/add-question" icon={<Plus className="w-6 h-6" />} label="Add" />
        <NavItem to="/notifications" icon={<Bell className="w-6 h-6" />} label="Notifications" />
        {/* <NavItem to="/settings" icon={<Settings className="w-6 h-6" />} label="Settings" /> */}
      </ul>
    </nav>
  );
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <li>
      <Link to={to} className="flex flex-col items-center text-gray-400 hover:text-[#FFA500] transition-colors">
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </Link>
    </li>
  );
}

