namespace Backend.Models
{
    public class Club
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;

        // Navigation property
        public List<Event> Events { get; set; } = new();
    }
}