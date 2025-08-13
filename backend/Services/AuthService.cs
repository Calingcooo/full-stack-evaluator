using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using TaskManager.Models;
using TaskManager.Data;

namespace TaskManager.Services
{
    public interface IAuthService
    {
        Task<User> ValidateUser(string email, string password);
        string HashPassword(string password);
    }

    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly ILogger<IAuthService> _logger;

        public AuthService(
            ApplicationDbContext context, 
            IPasswordHasher<User> passwordHasher,
            ILogger<IAuthService> logger)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _logger = logger;
        }

        public async Task<User> ValidateUser(string email, string password)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
                    return null;

                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == email);

                if (user == null)
                    return null;

                var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
                return result == PasswordVerificationResult.Success ? user : null;
            }
            catch (Exception ex)
            {
                _logger.LogInformation(ex, "Unexpected error during login for email {Email} ", email);
                return null;
            }
        }

        public string HashPassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password) || password.Length < 8)
                throw new ArgumentException("Password must be at least 8 characters");

            var tempUser = new User();
            return _passwordHasher.HashPassword(tempUser, password);
        }
    }
}