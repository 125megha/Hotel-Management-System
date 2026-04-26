using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.DTO
{
    public class BookingDto
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public int RoomId { get; set; }
        [Required]
        public DateOnly CheckIn { get; set; }

        [Required]
        public DateOnly CheckOut { get; set; }

        [Required]
        public string PaymentStatus { get; set; } = null!;

        [Required]
        public decimal TotalAmount { get; set; }
    }
}
