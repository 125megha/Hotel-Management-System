using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models.DTO
{
    public class BookingPerHotelDto
    {
        public string? HotelName { get; set; }
        public int? BookingCount { get; set; }

    }
}
