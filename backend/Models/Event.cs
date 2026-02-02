namespace Backend.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public DateTime Date { get; set; }

        // Foreign key to Club
        public int ClubId { get; set; }
        public Club Club { get; set; } = null!;
    }
}