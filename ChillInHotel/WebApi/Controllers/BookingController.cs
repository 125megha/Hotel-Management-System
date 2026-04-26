using DataAccessLayer;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers.DTO;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingController : ControllerBase
    {
        private readonly BookingRepository _repository;

        public BookingController(BookingRepository repository)
        {
            _repository = repository;
        }

        
        [HttpGet("GetAllBookings")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetAllBookings()
        {
            var bookings = _repository.GetAllBookings();
            return Ok(bookings);
        }

        
        [HttpGet("GetBooking/{id}")]
        [Authorize(Roles = "User")]
        public IActionResult GetBookingById(int id)
        {
            var booking = _repository.GetBookingById(id);
            if (booking == null)
                return NotFound($"Booking with ID {id} not found");
            return Ok(booking);
        }

        [HttpGet("user/{userId}")]
        [Authorize(Roles = "User")]
        public IActionResult GetBookingsByUser(int userId)
        {
            var bookings = _repository.GetBookingsByUser(userId);
            if (bookings == null || bookings.Count == 0)
                return NotFound($"No bookings found for user {userId}");
            return Ok(bookings);
        }

        [HttpGet("check")]
        [AllowAnonymous]
        public IActionResult CheckAvailability(int roomId, DateOnly checkIn, DateOnly checkOut)
        {
            var result = _repository.CheckAvailability(roomId, checkIn, checkOut);
            return Ok(new { message = result });
        }

       
        [HttpPost]
        [Authorize(Roles = "User")]
        public IActionResult BookRoom([FromBody] BookingDto bookingDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (bookingDto.CheckIn >= bookingDto.CheckOut)
                return BadRequest("Check-out date must be greater than check-in date");

            var booking = new Booking
            {
                UserId = bookingDto.UserId,
                RoomId = bookingDto.RoomId,
                CheckIn = bookingDto.CheckIn,
                CheckOut = bookingDto.CheckOut,
                PaymentStatus = bookingDto.PaymentStatus,
                TotalAmount = bookingDto.TotalAmount
            };

            var result = _repository.BookRoom(booking);
            return Ok(new { message = result });
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "User")]
        public IActionResult CancelBooking(int id)
        {
            var result = _repository.CancelBooking(id);
            if (result.Contains("doesn't exists"))
                return NotFound(result);
            return Ok(new { message = result });
        }
    }
}