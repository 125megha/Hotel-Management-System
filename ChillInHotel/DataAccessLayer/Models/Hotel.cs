using System;
using System.Collections.Generic;

namespace DataAccessLayer.Models;

public partial class Hotel
{
    public int HotelId { get; set; }

    public string Name { get; set; } = null!;

    public string Location { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    public virtual ICollection<Room> Rooms { get; set; } = new List<Room>();
}
