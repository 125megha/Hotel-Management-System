using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.DTO
{
    public class RatingDto
    {
        [Required]
        public int HotelId { get; set; }

        [Required]
        public int UserId { get; set; }
        
        [Required, Range(1,5)]
        public int Rating1 { get; set; }

        [MinLength(5)]
        public string? Review { get; set; }
    }
}
