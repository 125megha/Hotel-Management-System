using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models.DTO
{
    public class HotelDto
    {
        public int? HotelId { get; set; }
        public string? Name { get; set; }
        public string? Location { get; set; }
        public string? Description { get; set; }
        public decimal price { get; set; }
    }
}
