using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models.DTOs
{
    public class LoginRequest
    {
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}
