using DataAccessLayer.Models;
using DataAccessLayer.Models.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class HotelRepository
    {
        HotelBookingContext _context;

        public HotelRepository()
        {
            _context = new HotelBookingContext();
        }

        public List<HotelDto> GetAllHotels()
        {
            return _context.Hotels
                .Select(h => new HotelDto
                {
                    HotelId = h.HotelId,
                    Name = h.Name,
                    Location = h.Location,
                    Description = h.Description,
                    price = h.Rooms.Any()
                        ? h.Rooms.Min(r => r.Price)
                        : 0
                })
                .ToList();
        }

        public List<Hotel>? GetHotelByLocation (string location)
        {
            try
            {
                return _context.Hotels.Where(c => c.Location.ToLower() == location.ToLower()).ToList();


            }
            catch (Exception)
            {
                return null;
            }
        }
        public Hotel? GetHotelById (int hotelId)
        {
            return _context.Hotels.FirstOrDefault(h => h.HotelId == hotelId);
        }

        public bool AddHotel(Hotel new_hotel)
        {
            try
            {
                _context.Hotels.Add(new_hotel);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool UpdateHotel(Hotel updated_hotel)
        {
            try
            {

                Hotel? existing_hotel = _context.Hotels.Find(updated_hotel.HotelId);

                if (existing_hotel == null) return false;

                existing_hotel.Name = updated_hotel.Name;
                existing_hotel.Location = updated_hotel.Location;
                existing_hotel.Description = updated_hotel.Description;
                _context.SaveChanges();
                
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool DeleteHotel(int hotelId)
        {
            try
            {
                Hotel? existing_hotel = GetHotelById(hotelId);

                if (existing_hotel == null) return false;

                _context.Remove(existing_hotel);
                _context.SaveChanges();
                return true;
            }

            catch (Exception)
            {
                return false;
            }
        }

        public List<AvailableRoomDto>? GetAvailabeRoomsInHotel(int hotelId, DateOnly checkIn, DateOnly checkOut)
        {
            try
            {
                return _context.fn_GetAvailableRooms(
    hotelId,
    checkIn.ToDateTime(TimeOnly.MinValue),
    checkOut.ToDateTime(TimeOnly.MinValue)
).ToList();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }
    }
}
