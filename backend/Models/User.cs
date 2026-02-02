namespace Backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string Role { get; set; } = "Student"; // Student, ClubAdmin, PlatformAdmin
    }
}