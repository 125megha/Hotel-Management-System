using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class RatingRepository
    {
        private HotelBookingContext _context;

        public RatingRepository()
        {
            _context = new HotelBookingContext();
        }

        public bool AddRating(Rating rating)
        {
            try
            {
                _context.Ratings.Add(rating);
                _context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public List<Rating>? GetRatingsByHotelId(int hotelId)
        {
            return _context.Ratings.Where(c => c.HotelId == hotelId).ToList();
        }

        public decimal GetAverageRating(int hotelId)
        {
            return _context.Ratings.Select(r => HotelBookingContext.fn_AverageRating(hotelId)).FirstOrDefault();
        }

    }
}
