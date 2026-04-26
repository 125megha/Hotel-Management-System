using DataAccessLayer;
using DataAccessLayer.Models;
using DataAccessLayer.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelController : ControllerBase
    {
        private readonly HotelRepository _repository;

        public HotelController(HotelRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("all")]
        [AllowAnonymous]
        public IActionResult GetAllHotels()
        {
            var hotels = _repository.GetAllHotels();
            return Ok(hotels);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult GetHotelById(int id)
        {
            var hotel = _repository.GetHotelById(id);
            if (hotel == null)
                return NotFound($"Hotel with ID {id} not found");
            return Ok(hotel);
        }

        [HttpGet("by-location/{location}")]
        [AllowAnonymous]
        public IActionResult GetHotelsByLocation(string location)
        {
            var hotels = _repository.GetHotelByLocation(location);
            if (hotels == null || hotels.Count == 0)
                return NotFound($"No hotels found in {location}");
            return Ok(hotels);
        }

        [HttpGet("{hotelId}/available-rooms")]
        [AllowAnonymous]
        public IActionResult GetAvailableRooms(int hotelId, DateOnly checkIn, DateOnly checkOut)
        {
            if (checkIn >= checkOut)
                return BadRequest("Check-out date must be greater than check-in date");

            var rooms = _repository.GetAvailabeRoomsInHotel(hotelId, checkIn, checkOut);
            if (rooms == null || rooms.Count == 0)
                return NotFound("No available rooms found");

            return Ok(rooms);
        }


        [HttpPost("add")]
        [Authorize(Roles = "Admin")]
        public IActionResult AddHotel([FromBody] HotelDto hotelDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var hotel = new Hotel
            {
                Name = hotelDto.Name,
                Location = hotelDto.Location,
                Description = hotelDto.Description
            };

            var result = _repository.AddHotel(hotel);
            if (!result)
                return BadRequest("Failed to add hotel");

            return Ok(new { message = "Hotel added successfully" });
        }

        [HttpPut("update/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateHotel(int id, [FromBody] HotelDto hotelDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingHotel = _repository.GetHotelById(id);
            if (existingHotel == null)
                return NotFound($"Hotel with ID {id} not found");

            existingHotel.Name = hotelDto.Name;
            existingHotel.Location = hotelDto.Location;
            existingHotel.Description = hotelDto.Description;

            var result = _repository.UpdateHotel(existingHotel);
            if (!result)
                return BadRequest("Failed to update hotel");

            return Ok(new { message = "Hotel updated successfully" });
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteHotel(int id)
        {
            var result = _repository.DeleteHotel(id);
            if (!result)
                return NotFound($"Hotel with ID {id} not found");

            return Ok(new { message = "Hotel deleted successfully" });
        }
    }
}