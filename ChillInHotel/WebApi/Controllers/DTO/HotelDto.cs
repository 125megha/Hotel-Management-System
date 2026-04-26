using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.DTO
{
    public class HotelDto
    {
        [Required]
        public string Name { get; set; } = null!;
        [Required]
        public string Location { get; set; } = null!;
        public string? Description { get; set; }
    }
}
