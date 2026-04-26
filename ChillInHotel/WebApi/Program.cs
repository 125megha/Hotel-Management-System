using DataAccessLayer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WebApi.Services;

namespace WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<BookingRepository>();
            builder.Services.AddScoped<HotelRepository>();
            builder.Services.AddScoped<RoomRepository>();
            builder.Services.AddScoped<UserRepository>();
            builder.Services.AddScoped<RatingRepository>();
            builder.Services.AddScoped<PaymentRepository>();
            builder.Services.AddScoped<DashboardRepository>();

            var secretKey = builder.Configuration["Jwt:Key"];
            var expiryHours = int.Parse(builder.Configuration["Jwt:ExpiryHours"] ?? "2");

            builder.Services.AddSingleton(new JwtService(secretKey, expiryHours));

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            // Role-based Authorization
            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
                options.AddPolicy("UserOnly", policy => policy.RequireRole("User"));
            });

            // -------------------------------
            // Add CORS policy
            // -------------------------------
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // Important: Authentication before Authorization
            app.UseAuthentication();
            app.UseAuthorization();

            // Apply CORS globally
            app.UseCors("AllowAll");

            app.MapControllers();

            app.Run();
        }
    }
}