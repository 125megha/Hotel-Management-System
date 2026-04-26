using DataAccessLayer;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers.DTO;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoomController : ControllerBase
    {
        private readonly RoomRepository _repository;

        public RoomController(RoomRepository repository)
        {
            _repository = repository;
        }

        
        [HttpGet("hotel/{hotelId}")]
        public IActionResult GetRoomsByHotel(int hotelId)
        {
            var rooms = _repository.GetRoomsByHotelId(hotelId);

            if (rooms == null || rooms.Count == 0)
                return NotFound($"No rooms found for hotel ID {hotelId}");

            return Ok(rooms);
        }

        [HttpGet("roomPrice/{hotelId}")]
        public IActionResult GetRoomPriceByHotelId(int hotelId)
        {
            decimal? price = _repository.GetRoomPriceByHotelId(hotelId);
            return Ok(price);
        }
        
        [HttpGet("{id}")]
        public IActionResult GetRoomById(int id)
        {
            var room = _repository.GetRoomById(id);

            if (room == null)
                return NotFound($"Room with ID {id} not found");

            return Ok(room);
        }

        
        [HttpPost("addRoom")]
        [Authorize(Roles = "Admin")]
        public IActionResult AddRoom([FromBody] RoomDto roomDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var room = new Room
            {
                HotelId = roomDto.HotelId,
                Type = roomDto.Type,
                Price = roomDto.Price,
                Availability = roomDto.Availability
            };

            var result = _repository.AddRoom(room);

            if (!result)
                return BadRequest("Failed to add room");

            return Ok(new { message = "Room added successfully" });
        }

        
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult UpdateRoom(int id, [FromBody] RoomUpdateDto roomDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingRoom = _repository.GetRoomById(id);
            if (existingRoom == null)
                return NotFound(new { message = $"Room with ID {id} not found" });

            
            existingRoom.Type = roomDto.Type;
            existingRoom.Price = roomDto.Price;
            existingRoom.Availability = roomDto.Availability;

            var result = _repository.UpdateRoom(existingRoom);
            if (!result)
                return BadRequest(new { message = "Failed to update room" });

            return NoContent(); 
        }

        
        [HttpDelete("deleteRoom/{id}")]
        [Authorize(Roles = "Admin")]
        public IActionResult DeleteRoom(int id)
        {
            var result = _repository.DeleteRoom(id);

            if (!result)
                return NotFound($"Room with ID {id} not found");

            return Ok(new { message = "Room deleted successfully" });
        }
    }
}