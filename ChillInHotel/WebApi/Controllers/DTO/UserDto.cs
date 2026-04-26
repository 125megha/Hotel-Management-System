using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.DTO
{
    public class UserDto
    {
        [Required, MinLength(3)]
        public string Name { get; set; } = null!;

        [Required, EmailAddress]
        public string Email { get; set; } = null!;

        [Required, MinLength(5)]
        public string Password { get; set; } = null!;

        [DefaultValue("User")]
        public string Role { get; set; } = "User";
    }
}