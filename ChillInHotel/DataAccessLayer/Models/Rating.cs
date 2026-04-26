using System;
using System.Collections.Generic;

namespace DataAccessLayer.Models;

public partial class Rating
{
    public int RatingId { get; set; }

    public int HotelId { get; set; }

    public int UserId { get; set; }

    public int? Rating1 { get; set; }

    public string? Review { get; set; }

    public virtual Hotel Hotel { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
