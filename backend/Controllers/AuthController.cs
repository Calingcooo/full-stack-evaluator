using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

using TaskManager.Models;
using TaskManager.Models.DTOs;
using TaskManager.Data;
using TaskManager.Services;

namespace TaskManager.API
{
    [Route("auth")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(ApplicationDbContext context, IAuthService authService, ILogger<AuthController> logger) 
        {
            _context = context;
            _authService = authService;
            _logger = logger;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> CreateUser([FromBody] RegisterRequest request)
        {
            _logger.LogInformation("Registering new user: {Name}, {Email}", request.Name, request.Email);

            // Check if email exists
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            // Create User model from DTO
            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                PasswordHash = _authService.HashPassword(request.Password)
            };

            // Save to database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User created successfully", userId = user.Id });
        }

        [HttpPost("signin")]
        public async Task<IActionResult> LoginUser([FromBody] LoginRequest loginDto)
        {
            var user = await _authService.ValidateUser(loginDto.Email, loginDto.Password);

            _logger.LogInformation("found user: ", user);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            return Ok(new { message = "Login successful", userId = user.Id });
        }
    }
}