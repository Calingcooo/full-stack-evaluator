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
            // Validate register input
            var existingUser = await _authService.ValidateRegisterRequest(request.Name, request.Email, request.Password);
            
            _logger.LogInformation("Found user with Id: {Id} and Email: {Email}", existingUser.Id, existingUser.Email);

            // Check if email exists
            if (existingUser != null)
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
            var user = await _authService.ValidateLoginRequest(loginDto.Email, loginDto.Password);

            _logger.LogInformation("found user: {@User}", user);

            if (user == null)
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }

            return Ok(new { message = "Login successful", userId = user.Id });
        }
    }
}