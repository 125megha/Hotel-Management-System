using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.DTO
{
    public class RoomUpdateDto
    {
        [Required]
        public string Type { get; set; }
        [Required]
        public decimal Price { get; set; }

        [Required]
        public bool Availability { get; set; }
    }
}
