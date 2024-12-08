
import { QuickSummary } from '../components/QuickSummary';
import { UpcomingNotifications } from '../components/UpcomingNotifications';
import { Button } from '../components/ui/button.tsx';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Welcome back, Aadhar! 🎯</h1>
      
      <QuickSummary />
      
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Upcoming Reviews</h2>
        <UpcomingNotifications />
      </section>
      
      <Link to="/add-question">
        <Button className="mt-8 bg-[#FFA500] hover:bg-[#FF8C00] text-black font-bold py-2 px-4 rounded-full">
          <Plus className="w-5 h-5 mr-2" />
          Add Question
        </Button>
      </Link>
    </div>
  );
}

