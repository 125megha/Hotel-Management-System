using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class UserRepository
    {
        private HotelBookingContext _context;

        public UserRepository()
        {
            _context = new HotelBookingContext();
        }

        public string RegisterUser(User newUser)
        {
            string res = "";
            try
            {
                bool isUserExists = _context.Users.Any(u => u.Email == newUser.Email);

                if (isUserExists == true)
                {
                    res = $"User with email {newUser.Email} already exists";
                }
                else
                {
                    _context.Users.Add(newUser);
                    _context.SaveChanges();
                    res = "Registered successfully";
                }
            } 
            catch (Exception e)
            {
                res = e.InnerException.Message;
            }
            return res;
        }

        public string LoginUser(string email, string password)
        {
            string res = "";
            try
            {
                User? is_user_exists = _context.Users.FirstOrDefault(u => u.Email == email && u.Password == password);

                res = is_user_exists == null ? "Invalid username or password": "Login Successful";
            } 
            catch(Exception e)
            {
                res = e.Message;
            }
            return res;
        }

        public List<User>? GetAllUsers()
        {
            try
            {
                return _context.Users.ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public User? GetUserById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.UserId == id);
        }

    }
}
