using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
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

        public AuthService(
            ApplicationDbContext context, 
            IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        public async Task<User> ValidateUser(string email, string password)
        {
            try
            {
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Email == email);
                
                return user != null && 
                    _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password) 
                    == PasswordVerificationResult.Success ? user : null;
            }
            catch
            {
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