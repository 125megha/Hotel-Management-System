using DataAccessLayer.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace DataAccessLayer
{
    public class BookingRepository
    {

        private HotelBookingContext _context;

        public BookingRepository()
        {
            _context = new HotelBookingContext();
        }

        public List<Booking>? GetBookingsByUser(int userId)
        {
            return _context.Bookings.Where(u => u.UserId == userId).ToList();
        }

        public Booking? GetBookingById(int bookingId)
        {
            return _context.Bookings.FirstOrDefault(u => u.BookingId == bookingId);
        }

        public List<Booking>? GetAllBookings()
        {
            return _context.Bookings.ToList();
        }

        public string BookRoom(Booking new_booking)
        {
            string res = "";

            try
            {
                SqlParameter p_UserId = new SqlParameter("@UserId", new_booking.UserId);
                SqlParameter p_RoomId = new SqlParameter("@RoomId", new_booking.RoomId);
                SqlParameter p_CheckIn = new SqlParameter("@CheckIn", new_booking.CheckIn);
                SqlParameter p_CheckOut = new SqlParameter("@CheckOut", new_booking.CheckOut);
                SqlParameter p_PaymentStatus = new SqlParameter("@PaymentStatus", new_booking.PaymentStatus);
                SqlParameter p_TotalAmount = new SqlParameter("@TotalAmount", new_booking.TotalAmount);
                SqlParameter p_Result = new SqlParameter("@Result", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };

                _context.Database.ExecuteSqlRaw("EXEC usp_BookRoom @UserId, @RoomId, @CheckIn, @CheckOut, @PaymentStatus, @TotalAmount, @Result OUTPUT", p_UserId, p_RoomId, p_CheckIn, p_CheckOut, p_PaymentStatus, p_TotalAmount, p_Result);

                res = p_Result.Value switch
                {
                    1 => "Room Booked",
                    -2 => "Room Not Available",
                    -3 => "Invalid Dates",
                    -99 => "Unexpected error",
                    _ => "Something went wrong"
                };

            }
            catch (Exception e)
            {
                res = e.Message;
            }
            return res;
        }

        public string CheckAvailability(int roomId, DateOnly checkIn, DateOnly checkOut)
        {
            try
            {
                if (checkIn >= checkOut)
                    return "Invalid date range";

                if (!_context.Rooms.Any(r => r.RoomId == roomId))
                    return $"Room with given id {roomId} doesn't exist";

                bool bookingExists = _context.Bookings.Any(r =>
                    r.RoomId == roomId &&
                    r.CheckIn < checkOut &&
                    r.CheckOut > checkIn
                );

                return bookingExists
                    ? "Room Not Available"
                    : "Room Available for given dates";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }


        public string CancelBooking(int bookingId)
        {
            string res = "";

            try
            {
                Booking? booking_exists = GetBookingById(bookingId);
                if (booking_exists == null)
                {
                    res = $"Booking doesn't exists with Id {bookingId}";
                }
                else
                {
                    _context.Bookings.Remove(booking_exists);
                    _context.SaveChanges();
                    res = "Booking cancelled susccessfully";
                }
            } 
            catch(Exception e)
            {
                res = e.Message;
            }
            return res;

        }

    }
}


