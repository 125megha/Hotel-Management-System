using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class PaymentRepository
    {
        private HotelBookingContext _context;
        public PaymentRepository()
        {
            _context = new HotelBookingContext();
        }

        public void updateRoomStatus(int roomId)
        {
            Room? room = _context.Rooms.FirstOrDefault(r => r.RoomId == roomId);
            room.Availability = true;
            _context.SaveChanges();

        }

        public string ProcessPayment(int bookingId, Payment payment)
        {
            string res = "";
            try
            {
                Booking? booking_exists = _context.Bookings.FirstOrDefault(b => b.BookingId == bookingId);

                if (booking_exists == null)
                {
                    res = "Booking doesn't exists for the given booking id";
                }
                else
                {
                    booking_exists.PaymentStatus = "Completed";
                    updateRoomStatus(booking_exists.RoomId);
                    _context.Payments.Add(payment);
                    _context.SaveChanges();
                    res = "Payment done";
                }
            } catch(Exception e)
            {
                res = e.Message;
            }
            return res;
        }
    }
}
