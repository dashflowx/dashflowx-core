'use client';

import { useState } from 'react';

interface iCalendar {
  mode?: 'single' | 'multiple' | 'range';
  date?: any;
  setDate?: any;
  className?: string;
  showInput?: boolean;
  placeholder?: string;
  label?: string;
  description?: string;
  showValue?: boolean;
  fullWidth?: boolean;
  inputClassName?: string;
  variant?: 'default' | 'bordered' | 'filled' | 'outlined' | 'ghost' | 'gradient' | 'neon' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showToday?: boolean;
  showWeekNumbers?: boolean;
  showMonthNavigation?: boolean;
  showYearNavigation?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  highlightDates?: Date[];
}

type DateValue = Date | Date[] | { from: Date; to?: Date } | undefined;

function CalendarComponent({
  mode = 'single',
  date: externalDate,
  setDate: externalSetDate,
  className,
  showInput = true,
  placeholder = 'Select date...',
  label,
  description,
  showValue = true,
  fullWidth = true,
  inputClassName,
  variant = 'default',
  size = 'md',
  showToday = true,
  showWeekNumbers = false,
  showMonthNavigation = true,
  showYearNavigation = false,
  disabledDates = [],
  highlightDates = [],
}: iCalendar) {
  const [internalDate, setInternalDate] = useState<DateValue>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear()
  });
  
  const currentDate = externalDate !== undefined ? externalDate : internalDate;
  const now = new Date();
  
  // Navigation functions
  const navigateMonth = (direction: number) => {
    setCurrentView(prev => {
      let newMonth = prev.month + direction;
      let newYear = prev.year;
      
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      } else if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
      
      return { month: newMonth, year: newYear };
    });
  };

  const navigateYear = (direction: number) => {
    setCurrentView(prev => ({ ...prev, year: prev.year + direction }));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentView({ month: today.getMonth(), year: today.getFullYear() });
    
    // Also select today's date
    handleDateChange(today);
  };

  // Handle date selection
  const handleDateChange = (newDate: Date) => {
    let updatedDate: DateValue;
    
    if (mode === 'multiple') {
      const currentDates = Array.isArray(currentDate) ? currentDate : [];
      const dateExists = currentDates.some(date => date.getTime() === newDate.getTime());
      
      updatedDate = dateExists
        ? currentDates.filter(date => date.getTime() !== newDate.getTime())
        : [...currentDates, newDate].sort((a, b) => a.getTime() - b.getTime());
    } else if (mode === 'range') {
      if (!currentDate || !(currentDate as any).from) {
        updatedDate = { from: newDate, to: undefined };
      } else if (!(currentDate as any).to) {
        const fromDate = (currentDate as any).from;
        updatedDate = newDate.getTime() >= fromDate.getTime()
          ? { from: fromDate, to: newDate }
          : { from: newDate, to: fromDate };
      } else {
        updatedDate = { from: newDate, to: undefined };
      }
    } else {
      updatedDate = newDate;
    }
    
    if (externalSetDate) {
      externalSetDate(updatedDate);
    } else {
      setInternalDate(updatedDate);
    }
    
    if (mode === 'single') {
      setIsOpen(false);
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });
  };

  // Format display value
  const formatDisplayValue = () => {
    if (!currentDate) return '';
    
    if (mode === 'multiple' && Array.isArray(currentDate)) {
      if (currentDate.length === 0) return '';
      if (currentDate.length === 1) return formatDate(currentDate[0]);
      return `${currentDate.length} dates selected`;
    } else if (mode === 'range' && (currentDate as any).from) {
      if ((currentDate as any).to) {
        return `${formatDate((currentDate as any).from)} - ${formatDate((currentDate as any).to)}`;
      }
      return formatDate((currentDate as any).from);
    } else if (mode === 'single') {
      return formatDate(currentDate as Date);
    }
    
    return '';
  };

  // Calendar data
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const daysInMonth = new Date(currentView.year, currentView.month + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentView.year, currentView.month, 1).getDay();
  
  const days: (number | null)[] = [
    ...Array.from({ length: firstDayOfMonth }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1)
  ];

  // Check if date is selected
  const isDateSelected = (day: number) => {
    if (!currentDate) return false;
    
    const checkDate = new Date(currentView.year, currentView.month, day);
    
    if (mode === 'multiple' && Array.isArray(currentDate)) {
      return currentDate.some(date => 
        date.getDate() === day && 
        date.getMonth() === currentView.month && 
        date.getFullYear() === currentView.year
      );
    } else if (mode === 'range' && (currentDate as any).from) {
      const fromDate = (currentDate as any).from;
      const toDate = (currentDate as any).to || fromDate;
      
      return checkDate.getTime() >= fromDate.getTime() && 
             checkDate.getTime() <= toDate.getTime();
    } else if (mode === 'single') {
      return (currentDate as Date).getDate() === day && 
             (currentDate as Date).getMonth() === currentView.month && 
             (currentDate as Date).getFullYear() === currentView.year;
    }
    
    return false;
  };

  // Check if date is in range
  const isDateInRange = (day: number) => {
    if (mode !== 'range' || !(currentDate as any)?.from) return false;
    
    const checkDate = new Date(currentView.year, currentView.month, day);
    const fromDate = (currentDate as any).from;
    const toDate = (currentDate as any).to || fromDate;
    
    return checkDate.getTime() >= fromDate.getTime() && 
           checkDate.getTime() <= toDate.getTime();
  };

  // Styling functions
  const getVariantClasses = () => {
    const variants = {
      bordered: 'border-2 border-gray-300 bg-white',
      filled: 'bg-gray-50 border border-gray-200',
      outlined: 'border-2 border-blue-300 bg-white',
      ghost: 'border border-transparent bg-transparent',
      gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200',
      neon: 'bg-black border border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)]',
      glass: 'bg-white/20 backdrop-blur-md border border-white/30 shadow-lg',
      default: 'border border-gray-200 bg-white'
    };
    return variants[variant] || variants.default;
  };

  const getSizeClasses = () => {
    const sizes = {
      sm: 'p-2 text-xs',
      md: 'p-4 text-sm',
      lg: 'p-6 text-base',
      xl: 'p-8 text-lg'
    };
    return sizes[size] || sizes.md;
  };

  const getInputSizeClasses = () => {
    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-3 text-base',
      xl: 'px-5 py-4 text-lg'
    };
    return sizes[size] || sizes.md;
  };

  const getVariantSpecificClasses = () => {
    const variants = {
      bordered: {
        textColor: 'text-gray-800',
        headerBg: 'bg-transparent',
        dayHeaderColor: 'text-gray-500',
        todayColor: 'text-blue-600',
        selectedColor: 'bg-blue-500/80 text-white border-blue-500',
        rangeColor: 'bg-blue-100 text-blue-800 border border-blue-200',
        buttonClasses: 'hover:bg-gray-100 text-gray-500 hover:text-gray-700',
        todayButton: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
      },
      filled: {
        textColor: 'text-gray-800',
        headerBg: 'bg-transparent',
        dayHeaderColor: 'text-gray-500',
        todayColor: 'text-blue-600',
        selectedColor: 'bg-blue-500/80 text-white border-blue-500',
        rangeColor: 'bg-blue-100 text-blue-800 border border-blue-200',
        buttonClasses: 'hover:bg-gray-100 text-gray-500 hover:text-gray-700',
        todayButton: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
      },
      outlined: {
        textColor: 'text-gray-800',
        headerBg: 'bg-transparent',
        dayHeaderColor: 'text-gray-500',
        todayColor: 'text-blue-600',
        selectedColor: 'bg-blue-500/80 text-white border-blue-500',
        rangeColor: 'bg-blue-100 text-blue-800 border border-blue-200',
        buttonClasses: 'hover:bg-gray-100 text-gray-500 hover:text-gray-700',
        todayButton: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
      },
      ghost: {
        textColor: 'text-gray-800',
        headerBg: 'bg-transparent',
        dayHeaderColor: 'text-gray-500',
        todayColor: 'text-blue-600',
        selectedColor: 'bg-blue-500/80 text-white border-blue-500',
        rangeColor: 'bg-blue-100 text-blue-800 border border-blue-200',
        buttonClasses: 'hover:bg-gray-100 text-gray-500 hover:text-gray-700',
        todayButton: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
      },
      gradient: {
        textColor: 'text-gray-800',
        headerBg: 'bg-transparent',
        dayHeaderColor: 'text-gray-500',
        todayColor: 'text-blue-600',
        selectedColor: 'bg-blue-500/80 text-white border-blue-500',
        rangeColor: 'bg-blue-100 text-blue-800 border border-blue-200',
        buttonClasses: 'hover:bg-gray-100 text-gray-500 hover:text-gray-700',
        todayButton: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
      },
      neon: {
        textColor: 'text-cyan-400',
        headerBg: 'bg-black/80',
        dayHeaderColor: 'text-cyan-300',
        todayColor: 'text-cyan-400',
        selectedColor: 'bg-cyan-400/20 text-cyan-400 border-cyan-400',
        rangeColor: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/30',
        buttonClasses: 'hover:bg-cyan-400/20 text-cyan-400 hover:text-cyan-300',
        todayButton: 'bg-cyan-400/20 text-cyan-400 hover:bg-cyan-400/30 border border-cyan-400/50'
      },
      glass: {
        textColor: 'text-gray-800',
        headerBg: 'bg-white/30',
        dayHeaderColor: 'text-gray-600',
        todayColor: 'text-blue-600',
        selectedColor: 'bg-blue-500/80 text-white border-blue-500',
        rangeColor: 'bg-blue-100/50 text-blue-800 border-blue-200/50',
        buttonClasses: 'hover:bg-white/30 text-gray-600 hover:text-gray-800',
        todayButton: 'bg-blue-100/50 text-blue-700 hover:bg-blue-200/50 border border-blue-300/50'
      },
      default: {
        textColor: 'text-gray-800',
        headerBg: 'bg-transparent',
        dayHeaderColor: 'text-gray-500',
        todayColor: 'text-blue-600',
        selectedColor: 'bg-blue-500/80 text-white border border-blue-500',
        rangeColor: 'bg-blue-100 text-blue-800 border border-blue-200',
        buttonClasses: 'hover:bg-gray-100 text-gray-500 hover:text-gray-700',
        todayButton: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
      }
    };
    return variants[variant] || variants.default;
  };

  // CSS Classes
  const containerClasses = `${fullWidth ? 'w-full' : 'w-auto'} space-y-3 ${className || ''}`;
  const inputContainerClasses = `relative ${fullWidth ? 'w-full' : 'w-auto'}`;
  const inputClasses = `${fullWidth ? 'w-full' : 'w-auto'} ${getInputSizeClasses()} pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer ${inputClassName || ''}`;
  const calendarIconClasses = 'absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4';
  const calendarContainerClasses = `${getSizeClasses()} ${getVariantClasses()} rounded-lg shadow-lg`;
  const headerClasses = 'flex items-center justify-between mb-4';
  const monthClasses = 'text-lg font-semibold';
  const gridClasses = 'grid grid-cols-7 gap-1 w-full';
  const dayHeaderClasses = 'text-center text-sm font-medium py-2';
  const dayClasses = 'text-center p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors duration-150 min-w-[32px]';

  return (
    <div className={containerClasses}>
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      {description && <p className="text-sm text-gray-500">{description}</p>}

      {showInput && (
        <div className={inputContainerClasses}>
          <input
            type="text"
            value={formatDisplayValue()}
            placeholder={placeholder}
            onClick={() => setIsOpen(!isOpen)}
            className={inputClasses}
            readOnly
          />
          <svg className={calendarIconClasses} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          
          {isOpen && (
            <div className="absolute top-full left-0 z-[9999] mt-2 min-w-[280px]">
              <div className={calendarContainerClasses}>
                <div className={`${headerClasses} ${getVariantSpecificClasses().headerBg} rounded-t-lg p-2 -mx-4 -mt-4 mb-4`}>
                  <div className="flex items-center space-x-2">
                    {showMonthNavigation && (
                      <button
                        onClick={() => navigateMonth(-1)}
                        className={`p-1 rounded ${getVariantSpecificClasses().buttonClasses}`}
                        aria-label="Previous month"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="15,18 9,12 15,6"></polyline>
                        </svg>
                      </button>
                    )}
                    {showYearNavigation && (
                      <button
                        onClick={() => navigateYear(-1)}
                        className={`p-1 rounded ${getVariantSpecificClasses().buttonClasses}`}
                        aria-label="Previous year"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="15,18 9,12 15,6"></polyline>
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  <div className={`${monthClasses} ${getVariantSpecificClasses().textColor}`}>
                    {monthNames[currentView.month]} {currentView.year}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {showToday && (
                      <button
                        onClick={goToToday}
                        className={`px-2 py-1 text-xs rounded ${getVariantSpecificClasses().todayButton}`}
                        aria-label="Go to today"
                      >
                        Today
                      </button>
                    )}
                    {showMonthNavigation && (
                      <button
                        onClick={() => navigateMonth(1)}
                        className={`p-1 rounded ${getVariantSpecificClasses().buttonClasses}`}
                        aria-label="Next month"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9,18 15,12 9,6"></polyline>
                        </svg>
                      </button>
                    )}
                    {showYearNavigation && (
                      <button
                        onClick={() => navigateYear(1)}
                        className={`p-1 rounded ${getVariantSpecificClasses().buttonClasses}`}
                        aria-label="Next year"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9,18 15,12 9,6"></polyline>
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => setIsOpen(false)}
                      className={`p-1 rounded ${getVariantSpecificClasses().buttonClasses}`}
                      aria-label="Close calendar"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className={gridClasses}>
                  {dayNames.map(day => (
                    <div key={day} className={`${dayHeaderClasses} ${getVariantSpecificClasses().dayHeaderColor}`}>
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className={gridClasses}>
                  {days.map((day, index) => (
                    day ? (
                      <div
                        key={index}
                        className={`${dayClasses} ${
                          day === now.getDate() && currentView.month === now.getMonth() && currentView.year === now.getFullYear()
                            ? getVariantSpecificClasses().todayColor
                            : ''
                        } ${
                          isDateSelected(day)
                            ? getVariantSpecificClasses().selectedColor
                            : isDateInRange(day)
                            ? getVariantSpecificClasses().rangeColor
                            : ''
                        } ${
                          highlightDates.some(date => 
                            date.getDate() === day && 
                            date.getMonth() === currentView.month && 
                            date.getFullYear() === currentView.year
                          ) ? 'ring-2 ring-yellow-400 ring-offset-1' : ''
                        } ${
                          disabledDates.some(date => 
                            date.getDate() === day && 
                            date.getMonth() === currentView.month && 
                            date.getFullYear() === currentView.year
                          ) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={() => {
                          const isDisabled = disabledDates.some(date => 
                            date.getDate() === day && 
                            date.getMonth() === currentView.month && 
                            date.getFullYear() === currentView.year
                          );
                          
                          if (!isDisabled) {
                            handleDateChange(new Date(currentView.year, currentView.month, day));
                          }
                        }}
                      >
                        {day}
                      </div>
                    ) : (
                      <div key={index} className="p-2" />
                    )
                  ))}
                </div>
                
                {showWeekNumbers && (
                  <div className="mt-2 text-xs text-gray-500 text-center">
                    Week {Math.floor((days.length - 1 + firstDayOfMonth) / 7) + 1}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {showValue && currentDate && (
        <div className="text-sm text-gray-600">
          {mode === 'multiple' && Array.isArray(currentDate) && currentDate.length > 0 && (
            <div>Selected: {currentDate.map(date => formatDate(date)).join(', ')}</div>
          )}
          {mode === 'range' && (currentDate as any).from && (
            <div>
              {(currentDate as any).to 
                ? `Range: ${formatDate((currentDate as any).from)} to ${formatDate((currentDate as any).to)}`
                : `From: ${formatDate((currentDate as any).from)}`
              }
            </div>
          )}
          {mode === 'single' && (
            <div>Selected: {formatDate(currentDate as Date)}</div>
          )}
        </div>
      )}
    </div>
  );
}

export { CalendarComponent as Calendar };
