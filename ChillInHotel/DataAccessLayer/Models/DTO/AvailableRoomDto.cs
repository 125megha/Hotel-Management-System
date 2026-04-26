using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models.DTO
{
    public class AvailableRoomDto
    {
        public int? RoomId { get; set; }
        public string? Type { get; set; }
        public decimal? Price { get; set; }
    }
}
