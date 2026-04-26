using DataAccessLayer;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers.DTO;
using WebApi.Services;
using System.Linq;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserRepository _repository;
        private readonly JwtService _jwtService;

        public UserController(UserRepository repository, JwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }

       [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult RegisterUser([FromBody] UserDto userDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newUser = new User
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Password = userDto.Password,
                Role = string.IsNullOrEmpty(userDto.Role) ? "User" : userDto.Role
            };

            var result = _repository.RegisterUser(newUser);

            if (result.Contains("already exists"))
                return Conflict(new { message = result });

            if (result.Contains("Registered successfully"))
            {
                // Optionally generate JWT after registration
                var token = _jwtService.GenerateToken(newUser);
                return Ok(new { message = result, token, role = newUser.Role });
            }

            return BadRequest(new { message = result });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult LoginUser([FromBody] LoginDto loginDto)
        {
            var user = _repository.GetAllUsers()
                .FirstOrDefault(u => u.Email == loginDto.Email && u.Password == loginDto.Password);

            if (user == null)
                return Unauthorized(new { message = "Invalid credentials" });

            var token = _jwtService.GenerateToken(user);

            return Ok(new { token, role = user.Role, UserId = user.UserId, name=user.Name});
        }

       
        [Authorize(Roles = "Admin")]
        [HttpGet("getAll")]
        public IActionResult GetAllUsers()
        {
            var users = _repository.GetAllUsers();
            if (users == null || users.Count == 0)
                return NotFound(new { message = "No users found" });

            return Ok(users);
        }

        [Authorize(Roles = "Admin,User")]
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _repository.GetUserById(id);
            if (user == null)
                return NotFound(new { message = $"User with ID {id} not found" });

            // If role is User, allow only access to their own data
            var currentUserId = int.Parse(User.Claims.First(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier).Value);
            var currentUserRole = User.Claims.First(c => c.Type == System.Security.Claims.ClaimTypes.Role).Value;

            if (currentUserRole != "Admin" && currentUserId != id)
                return Forbid();

            return Ok(user);
        }
    }
}