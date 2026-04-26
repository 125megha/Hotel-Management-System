using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.DTO
{
    public class RoomDto
    {
        [Required]
        public int HotelId { get; set; }
        [Required]
        public string Type { get; set; } = null!;

        [Required, Range(0,100000)]
        public decimal Price { get; set; }
       
        public bool Availability { get; set; } = true;

    }
}
