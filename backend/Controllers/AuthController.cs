using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

using TaskManager.Models;
using TaskManager.Data;
using TaskManager.DTOs;

namespace TaskManager.API
{
    [Route("auth/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context) 
        {
            _context = context;
        }

        // [HttpPost("signin")]
        // public async Task<IActionResult> LoginUser([FromBody] CreateUserDto userDto)
        // {
        //     var user = await _context.Users
        //         .FirstOrDefaultAsync(u => u.Email == userDto.Email);

        //     if (user == null)
        //     {
        //       return Unauthorized(new { message = "Invalid email or password" });
        //     }

        //     var hasher = new PasswordHasher<User>();
        //     var result = hasher.VerifyHashedPassword(user, user.PasswordHash, userDto.Password);

        //     if (result == PasswordVerificationResult.Success)
        //     {
        //       var token = _jwtService.GenerateToken(user);
        //       return Ok(new { token  });
        //     }
            
        //     return Unauthorized("Invalid email or password.");
        // }

        [HttpPost("signup")]
        public async Task<IActionResult> CreateUser([FromBody] RegisterRequest userDto)
        {
            // Check if email exists
            if (await _context.Users.AnyAsync(u => u.Email == userDto.Email))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            // Create User model from DTO
            var user = new User
            {
                Email = userDto.Email,
            };

            // Hash the password and add to the user object
            var hasher = new PasswordHasher<User>();
            user.PasswordHash = hasher.HashPassword(user, userDto.Password);

            // Save to database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User created successfully", userId = user.Id });
        }

         private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }
    }


}