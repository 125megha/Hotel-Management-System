using System;
using System.Collections.Generic;

namespace DataAccessLayer.Models;

public partial class Room
{
    public int RoomId { get; set; }

    public int HotelId { get; set; }

    public string Type { get; set; } = null!;

    public decimal Price { get; set; }

    public bool? Availability { get; set; }

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();

    public virtual Hotel Hotel { get; set; } = null!;
}
