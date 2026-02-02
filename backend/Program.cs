using Backend.Data;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Load environment variables (optional, still useful for other configs)
builder.Configuration.AddEnvironmentVariables();

// Use connection string directly (no password replacement)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Retry until SQL Server is ready
var maxRetries = 10;
var delay = TimeSpan.FromSeconds(5);

for (int i = 0; i < maxRetries; i++)
{
    try
    {
        using var connection = new SqlConnection(connectionString);
        connection.Open();
        Console.WriteLine("SQL Server is ready!");
        break;
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Waiting for SQL Server... {ex.Message}");
        await Task.Delay(delay);
    }
}

// Register DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// Add controllers and Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();


var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();