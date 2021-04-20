using Entidades.Mapeo;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Objects;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public partial class ContextoPrincipal : DbContext
    {
        public ContextoPrincipal()
        {
        }

        public ContextoPrincipal(string connectionString)
            : base(connectionString)
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Configurations.Add(new ProcesoMasivoMapeo());
        }

        public virtual DbSet<ProcesoMasivo> ProcesoMasivo { get; set; }

        

    }
}
