using DataAccessLayer;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers.DTO;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RatingController : ControllerBase
    {
        private readonly RatingRepository _repository;

        public RatingController(RatingRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        [Authorize(Roles = "User")]
        public IActionResult AddRating([FromBody] RatingDto ratingDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var rating = new Rating
            {
                HotelId = ratingDto.HotelId,
                UserId = ratingDto.UserId,
                Rating1 = ratingDto.Rating1,
                Review = ratingDto.Review
            };

            var result = _repository.AddRating(rating);

            if (!result)
                return BadRequest(new { message = "Failed to add rating" });

            return Ok(new { message = "Rating added successfully" });
        }

        
        [HttpGet("hotel/{hotelId}")]
        public IActionResult GetRatingsByHotel(int hotelId)
        {
            var ratings = _repository.GetRatingsByHotelId(hotelId);

            if (ratings == null || ratings.Count == 0)
                return NotFound(new { message = $"No ratings found for hotel ID {hotelId}" });

            return Ok(ratings);
        }

        
        [HttpGet("average/{hotelId}")]
        public IActionResult GetAverageRating(int hotelId)
        {
            var avg = _repository.GetAverageRating(hotelId);

            return Ok(new { hotelId, averageRating = avg });
        }
    }
}