using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

using TaskManager.Models;
using TaskManager.Models.DTOs;
using TaskManager.Data;
using TaskManager.Services;

namespace TaskManager.API
{
    [Route("auth/[controller]")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IAuthService _authService;

        public AuthController(ApplicationDbContext context, IAuthService authService) 
        {
            _context = context;
            _authService = authService;
        }

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
                Name = userDto.Name,
                Email = userDto.Email,
                PasswordHash = _authService.HashPassword(userDto.Password)
            };

            // Save to database
            await _context.SaveChangesAsync();

            return Ok(new { message = "User created successfully", userId = user.Id });
        }

        [HttpPost("signin")]
        public async Task<IActionResult> LoginUser([FromBody] LoginRequest loginDto)
        {
            var user = await _authService.ValidateUser(loginDto.Email, loginDto.Password);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            return Ok(new { message = "Login successful", userId = user.Id });
        }
    }
}