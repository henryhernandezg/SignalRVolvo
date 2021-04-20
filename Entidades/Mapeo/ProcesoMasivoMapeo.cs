using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades.Mapeo
{
    public class ProcesoMasivoMapeo : EntityTypeConfiguration<ProcesoMasivo>
    {

        public ProcesoMasivoMapeo()
        {
            this.HasKey(t => t.Id);
            this.Property(t => t.Id)
                    .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity).IsRequired();

            this.Property(t => t.Id).HasColumnName("ProcesoMasivoId");
            this.Property(t => t.ProcesoMasivoNumeroHilo).HasColumnName("ProcesoMasivoNumeroHilo");
            this.Property(t => t.ProcesoMasivoFechaInicio).HasColumnName("ProcesoMasivoFechaInicio");
            this.Property(t => t.ProcesoMasivoFechaFin).HasColumnName("ProcesoMasivoFechaFin");
            this.Property(t => t.ProcesoMasivoFechaActualizacion).HasColumnName("ProcesoMasivoFechaActualizacion");
            this.Property(t => t.ProcesoMasivoTipo).HasColumnName("ProcesoMasivoTipo");
            this.Property(t => t.ProcesoMasivoParametros).HasColumnName("ProcesoMasivoParametros");
            this.Property(t => t.ProcesoMasivoError).HasColumnName("ProcesoMasivoError");
            this.Property(t => t.ProcesoMasivoDefinitivo).HasColumnName("ProcesoMasivoDefinitivo");
            this.Property(t => t.EstadoProcesoMasivoId).HasColumnName("EstadoProcesoMasivoId");
            this.Property(t => t.TipoProcesoMasivoId).HasColumnName("TipoProcesoMasivoId");
            this.Property(t => t.UsuarioId).HasColumnName("UsuarioId");
            this.Property(t => t.ProcesoMasivoCiclico).HasColumnName("ProcesoMasivoCiclico");

        }

    }
}
