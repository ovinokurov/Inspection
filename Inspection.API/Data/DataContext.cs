﻿using Microsoft.EntityFrameworkCore;

namespace Inspection.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Inspection> Inspections { get; set; }  
        public DbSet<InspectionType> InspectionTypes { get; set; } 
        public DbSet<Status> Statuses { get; set; }



    }
}
