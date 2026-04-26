using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.DTO
{
    public class PaymentDto
    {
        [Required]
        public int BookingId { get; set; }

        [Required, Range(0,100000)]
        public decimal Amount { get; set; }

        [Required]
        public DateOnly PaymentDate { get; set; }

        [DefaultValue("Paid")]
        public string Status { get; set; } = null!;
    }
}
