import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home as HomeIcon, 
  Calendar as CalendarIcon, 
  ClipboardCheck, 
  Wrench, 
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Plus
} from 'lucide-react';

// --- Types ---
type Screen = 'home' | 'calendar' | 'booking' | 'maintenance';

interface Booking {
  id: string;
  name: string;
  purpose: string;
  date: string;
  time: string;
}

interface MaintenanceItem {
  id: string;
  name: string;
  target: number;
  collected: number;
}

// --- Mock Data ---
const INITIAL_BOOKINGS: string[] = ['2026-05-10', '2026-05-15', '2026-05-20'];

const INITIAL_MAINTENANCE: MaintenanceItem[] = [
  { id: '1', name: 'Ceiling Fan', target: 500, collected: 300 },
  { id: '2', name: 'Plastic Chairs', target: 1000, collected: 200 },
  { id: '3', name: 'Sound System', target: 2000, collected: 850 },
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [bookedDates, setBookedDates] = useState<string[]>(INITIAL_BOOKINGS);
  const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceItem[]>(INITIAL_MAINTENANCE);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const handleAddBooking = (newBooking: Booking) => {
    setBookings([...bookings, newBooking]);
    setBookedDates([...bookedDates, newBooking.date]);
    setCurrentScreen('home');
  };

  const handleContribute = (id: string) => {
    setMaintenanceItems(items => items.map(item => 
      item.id === id ? { ...item, collected: Math.min(item.target, item.collected + 50) } : item
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 flex flex-col items-center">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Header */}
        <header className="px-6 pt-12 pb-6 bg-emerald-600 text-white rounded-b-3xl shadow-lg z-10">
          <div className="flex items-center gap-3 mb-2">
            {currentScreen !== 'home' && (
              <button 
                onClick={() => setCurrentScreen('home')}
                className="p-1 -ml-1 hover:bg-emerald-500 rounded-full transition-colors"
                id="back-button"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            <h1 className="text-2xl font-bold tracking-tight" id="app-title">Grama-Angana</h1>
          </div>
          <p className="text-emerald-100 text-sm italic">Community Space Manager</p>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto px-6 py-8">
          <AnimatePresence mode="wait">
            {currentScreen === 'home' && (
              <HomeScreen 
                onNavigate={setCurrentScreen} 
                bookedDates={bookedDates}
              />
            )}
            {currentScreen === 'calendar' && (
              <CalendarScreen bookedDates={bookedDates} />
            )}
            {currentScreen === 'booking' && (
              <BookingScreen 
                onAdd={handleAddBooking} 
                bookedDates={bookedDates} 
              />
            )}
            {currentScreen === 'maintenance' && (
              <MaintenanceScreen 
                items={maintenanceItems} 
                onContribute={handleContribute} 
              />
            )}
          </AnimatePresence>
        </main>

        {/* Navigation Bar (Optional, but useful for quick demo) */}
        {currentScreen === 'home' && (
          <nav className="bg-white border-t border-slate-100 p-4 flex justify-around items-center">
            <NavIcon icon={<CalendarIcon />} label="Calendar" active={false} onClick={() => setCurrentScreen('calendar')} id="nav-calendar" />
            <NavIcon icon={<Plus className="text-white" />} label="Book" active={true} onClick={() => setCurrentScreen('booking')} id="nav-book" isFab />
            <NavIcon icon={<Wrench />} label="Repair" active={false} onClick={() => setCurrentScreen('maintenance')} id="nav-maintenance" />
          </nav>
        )}
      </div>
    </div>
  );
}

// --- Sub-Screens ---

function HomeScreen({ onNavigate, bookedDates }: { onNavigate: (s: Screen) => void, bookedDates: string[] }) {
  const today = new Date().toISOString().split('T')[0];
  const isAvailable = !bookedDates.includes(today);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
      id="home-screen"
    >
      {/* Hero Status Card */}
      <section className={`p-6 rounded-3xl border shadow-sm ${isAvailable ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-slate-500 font-medium text-sm mb-1 uppercase tracking-wider">Hall Status</h2>
            <p className={`text-3xl font-bold ${isAvailable ? 'text-emerald-700' : 'text-rose-700'}`}>
              {isAvailable ? 'Available' : 'Booked'}
            </p>
          </div>
          {isAvailable ? (
            <CheckCircle2 className="text-emerald-500" size={40} />
          ) : (
            <XCircle className="text-rose-500" size={40} />
          )}
        </div>
        <p className="text-slate-600 text-sm">
          {isAvailable ? 'Feel free to request a booking for today or plan ahead.' : "Currently hosting Today's Event."}
        </p>
      </section>

      {/* Action Grid */}
      <div className="grid grid-cols-2 gap-4">
        <MenuButton 
          id="btn-view-calendar"
          onClick={() => onNavigate('calendar')}
          icon={<CalendarIcon className="text-blue-500" />}
          label="View Calendar"
          subtitle="Check dates"
        />
        <MenuButton 
          id="btn-request-booking"
          onClick={() => onNavigate('booking')}
          icon={<ClipboardCheck className="text-emerald-500" />}
          label="Book Hall"
          subtitle="Reserve space"
        />
        <MenuButton 
          id="btn-maintenance"
          onClick={() => onNavigate('maintenance')}
          icon={<Wrench className="text-amber-500" />}
          label="Contribution"
          subtitle="Maintenance"
          className="col-span-2"
        />
      </div>

      {/* Info Section */}
      <section className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
        <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <HomeIcon size={18} />
          About Grama-Angana
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Grama-Angana is your village's heart. We help manage community spaces efficiently for weddings, meetings, and local events.
        </p>
      </section>
    </motion.div>
  );
}

function CalendarScreen({ bookedDates }: { bookedDates: string[] }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const isBooked = bookedDates.includes(selectedDate);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
      id="calendar-screen"
    >
      <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
        <CalendarIcon className="text-emerald-600" />
        Availability View
      </h2>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <input 
          type="date" 
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full p-3 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-emerald-500 font-medium text-lg text-center"
          id="calendar-input"
        />
      </div>

      <div className={`p-8 rounded-3xl text-center border-2 transition-all duration-300 ${isBooked ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'}`}>
        <p className="text-sm uppercase tracking-widest font-bold mb-2">Selected Date Status</p>
        <p className="text-4xl font-black mb-4">
          {isBooked ? 'BOOKED' : 'AVAILABLE'}
        </p>
        <p className="text-sm opacity-80 italic">
          {isBooked ? 'Select a different date for your event.' : 'This date is open for new bookings!'}
        </p>
      </div>

      <div className="p-4 bg-slate-100 rounded-xl">
        <h3 className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-tighter">Existing Bookings</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
          {bookedDates.sort().map(d => (
            <div key={d} className="flex justify-between items-center bg-white p-2 px-3 rounded-lg border border-slate-200 text-sm">
              <span className="font-mono text-slate-700">{d}</span>
              <span className="text-rose-500 font-bold text-xs bg-rose-50 px-2 py-0.5 rounded-full">Occupied</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function BookingScreen({ onAdd, bookedDates }: { onAdd: (b: Booking) => void, bookedDates: string[] }) {
  const [formData, setFormData] = useState({
    name: '',
    purpose: 'Wedding',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM'
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.time) {
      setError('Please fill in all fields.');
      return;
    }
    if (bookedDates.includes(formData.date)) {
      setError('This date is already booked! Please select another.');
      return;
    }
    
    setError('');
    onAdd({
      id: Math.random().toString(),
      ...formData
    });
    alert('Booking request submitted successfully!');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
      id="booking-screen"
    >
      <h2 className="text-xl font-bold">Request Hall Booking</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Full Name</label>
          <input 
            type="text" 
            placeholder="Enter your name" 
            className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            id="input-name"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Purpose of Use</label>
          <select 
            className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
            value={formData.purpose}
            onChange={(e) => setFormData({...formData, purpose: e.target.value})}
            id="input-purpose"
          >
            <option>Wedding</option>
            <option>Sports Event</option>
            <option>Community Meeting</option>
            <option>Religious Ceremony</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Date</label>
            <input 
              type="date" 
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              id="input-date"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 ml-1 uppercase">Time</label>
            <input 
              type="text" 
              placeholder="e.g. 10:00 AM"
              className="w-full p-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
              value={formData.time}
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              id="input-time"
            />
          </div>
        </div>

        {error && <p className="text-rose-500 text-sm font-medium px-1">{error}</p>}

        <button 
          type="submit"
          className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 active:scale-[0.98] transition-all mt-4"
          id="btn-submit-booking"
        >
          Submit Booking Request
        </button>
      </form>
    </motion.div>
  );
}

function MaintenanceScreen({ items, onContribute }: { items: MaintenanceItem[], onContribute: (id: string) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
      id="maintenance-screen"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">Community Maintenance</h2>
        <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">Active Jars</span>
      </div>

      <div className="space-y-6">
        {items.map(item => {
          const progress = (item.collected / item.target) * 100;
          return (
            <div key={item.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">{item.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">₹{item.target} Goal</p>
                </div>
                <button 
                  onClick={() => onContribute(item.id)}
                  disabled={progress >= 100}
                  className={`p-3 rounded-2xl flex items-center gap-2 transition-all shadow-sm ${progress >= 100 ? 'bg-slate-100 text-slate-400' : 'bg-amber-50 text-amber-600 hover:bg-emerald-600 hover:text-white hover:scale-105 active:scale-95'}`}
                  id={`btn-contribute-${item.id}`}
                >
                  <Plus size={18} />
                  <span className="text-xs font-bold uppercase tracking-tight">Support</span>
                </button>
              </div>

              {/* Progress Bar Container */}
              <div className="space-y-1 relative z-10">
                <div className="flex justify-between text-[11px] font-bold text-slate-400 px-1">
                  <span>Progress</span>
                  <span className="text-slate-600">₹{item.collected} / ₹{item.target}</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className={`h-full rounded-full ${progress >= 100 ? 'bg-emerald-500' : 'bg-amber-400'}`}
                  />
                </div>
              </div>

              {/* Decoration background */}
              <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform">
                <Wrench size={100} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-emerald-50 rounded-2xl border border-dashed border-emerald-200 mt-4">
        <p className="text-xs text-emerald-700 text-center italic">
          "Together we build a better space for our village events."
        </p>
      </div>
    </motion.div>
  );
}

// --- Utils ---

function MenuButton({ icon, label, subtitle, onClick, className = '', id }: { icon: React.ReactNode, label: string, subtitle: string, onClick: () => void, className?: string, id: string }) {
  return (
    <button 
      onClick={onClick}
      className={`p-5 rounded-3xl bg-white border border-slate-100 shadow-sm flex flex-col items-start gap-1 hover:shadow-md hover:border-slate-200 active:scale-[0.98] transition-all text-left ${className}`}
      id={id}
    >
      <div className="mb-2 p-2 rounded-xl bg-slate-50">{icon}</div>
      <p className="font-bold text-slate-800 text-sm leading-tight">{label}</p>
      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">{subtitle}</p>
    </button>
  );
}

function NavIcon({ icon, label, active, onClick, id, isFab = false }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, id: string, isFab?: boolean }) {
  if (isFab) {
    return (
      <button 
        id={id}
        onClick={onClick}
        className="bg-emerald-600 p-4 rounded-full shadow-lg shadow-emerald-200 -mt-8 hover:bg-emerald-700 active:scale-90 transition-all border-4 border-white"
      >
        {icon}
      </button>
    );
  }

  return (
    <button 
      id={id}
      onClick={onClick} 
      className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-emerald-700' : 'text-slate-400'}`}
    >
      {React.cloneElement(icon as React.ReactElement, { size: 24, strokeWidth: active ? 2.5 : 2 })}
      <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
    </button>
  );
}
