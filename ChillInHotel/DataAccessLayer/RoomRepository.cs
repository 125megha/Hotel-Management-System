using DataAccessLayer.Models;

namespace DataAccessLayer
{
    public class RoomRepository
    {
        private HotelBookingContext _context;
        public RoomRepository()
        {
            _context = new HotelBookingContext();
        }

        public List<Room> GetRoomsByHotelId(int hotelId)
        {
            return _context.Rooms
                           .Where(r => r.HotelId == hotelId)
                           .ToList();
        }

        public decimal? GetRoomPriceByHotelId(int hotelId)
        {
            var rooms = GetRoomsByHotelId(hotelId);

            if (rooms == null || !rooms.Any())
                return null;

            return rooms.Min(r => r.Price);
        }

        public Room? GetRoomById(int roomId)
        {
            try
            {
                return _context.Rooms.FirstOrDefault(r => r.RoomId == roomId);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public bool AddRoom(Room new_room)
        {
            try
            {
                _context.Rooms.Add(new_room);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UpdateRoom(Room room)
        {
            try
            {
                Room? existing_room = GetRoomById(room.RoomId);

                if (existing_room == null) return false;

                existing_room.HotelId = room.HotelId;
                existing_room.Type = room.Type;
                existing_room.Price = room.Price;

                _context.SaveChanges();
                return true;

            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool DeleteRoom(int roomId)
        {
            try
            {
                Room? existing_room = GetRoomById(roomId);

                if (existing_room == null) return false;
                _context.Rooms.Remove(existing_room);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

    }
}
