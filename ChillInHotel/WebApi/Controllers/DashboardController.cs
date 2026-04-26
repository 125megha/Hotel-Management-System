using DataAccessLayer;
using DataAccessLayer.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly DashboardRepository _repository;

        public DashboardController(DashboardRepository repository)
        {
            _repository = repository;
        }

        
        [HttpGet("total-bookings")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetTotalBookings()
        {
            var totalBookings = _repository.GetTotalBookings();
            return Ok(new { totalBookings });
        }

        
        [HttpGet("total-revenue")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetTotalRevenue()
        {
            var totalRevenue = _repository.GetTotalRevenue();
            return Ok(new { totalRevenue });
        }

        
        [HttpGet("bookings-per-hotel")]
        [Authorize(Roles = "Admin")]
        public IActionResult GetBookingsPerHotel()
        {
            var bookingsPerHotel = _repository.GetBookingsPerHotel();

            if (bookingsPerHotel == null || bookingsPerHotel.Count == 0)
                return NotFound(new { message = "No bookings found for any hotel" });

            return Ok(bookingsPerHotel);
        }
    }
}