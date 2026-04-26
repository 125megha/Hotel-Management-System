using System;
using System.Collections.Generic;

namespace DataAccessLayer.Models;

public partial class Booking
{
    public int BookingId { get; set; }

    public int UserId { get; set; }

    public int RoomId { get; set; }

    public DateOnly CheckIn { get; set; }

    public DateOnly CheckOut { get; set; }

    public string PaymentStatus { get; set; } = null!;

    public decimal? TotalAmount { get; set; }

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual Room Room { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
