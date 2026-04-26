using DataAccessLayer.Models;
using DataAccessLayer.Models.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class DashboardRepository
    {
        private HotelBookingContext  _context;
        public DashboardRepository()
        {
            _context = new HotelBookingContext();
        }

        public int GetTotalBookings()
        {
            return _context.Bookings.Count();
        }

        public decimal GetTotalRevenue()
        {
            return _context.Payments.ToList().Sum(c=>c.Amount);
        }

        public List<BookingPerHotelDto> GetBookingsPerHotel()
        {
            var result = _context.Bookings
                .GroupBy(b => b.Room.Hotel.Name) 
                .Select(g => new BookingPerHotelDto
                {
                    HotelName = g.Key,
                    BookingCount = g.Count()
                })
                .ToList();

            return result;
        }


    }
}
