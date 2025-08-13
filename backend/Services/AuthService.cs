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
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);
            
            if (user == null) 
                return null;

            var result = _passwordHasher.VerifyHashedPassword(
                user, 
                user.PasswordHash, 
                password);
            
            return result == PasswordVerificationResult.Success 
                ? user 
                : null;
        }
    }
}