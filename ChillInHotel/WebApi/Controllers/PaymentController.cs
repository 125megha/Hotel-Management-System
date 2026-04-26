using DataAccessLayer;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers.DTO;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly PaymentRepository _repository;

        public PaymentController(PaymentRepository repository)
        {
            _repository = repository;
        }

        [HttpPost("{bookingId}")]
        [Authorize(Roles = "User")]
        public IActionResult ProcessPayment(int bookingId, [FromBody] PaymentDto paymentDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var payment = new Payment
            {
                BookingId = bookingId,
                Amount = paymentDto.Amount,
                PaymentDate = paymentDto.PaymentDate,
                Status = string.IsNullOrWhiteSpace(paymentDto.Status) ? "Paid" : paymentDto.Status
            };

            var result = _repository.ProcessPayment(bookingId, payment);

            if (result == "Payment done")
                return Ok(new { message = result });

            return BadRequest(new { message = result });
        }
    }
}