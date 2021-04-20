using System;

public class DataVolvo
{
    public string VehicleExternalId { get; set; }
    public Nullable<DateTime> VehicleTimestamp { get; set; }
    public Nullable<Double> Heading { get; set; }
    public Nullable<Double> Hdop { get; set; }
    public Nullable<Double> Vdop { get; set; }
    public Nullable<Double> Speed { get; set; }
    public Nullable<Double> Latitude { get; set; }
    public Nullable<Double> Longitude { get; set; }
    public Nullable<Double> Altitude { get; set; }
    public string AnyDoorOpen { get; set; }
    public string Axle1Weight { get; set; }
    public string Axle2Weight { get; set; }
    public string BatteryVoltage { get; set; }
    public string CurrentGear { get; set; }
    public string EngineCoolantTemp { get; set; }
    public string EngineOilPressure { get; set; }
    public string EngineOilTemperature { get; set; }
    public string FuelConsumption { get; set; }
    public string FuelLevel { get; set; }
    public string InsidePassengerTemperature { get; set; }
    public string Odometer { get; set; }
    public string OutsideTemperature { get; set; }
    public string TotalDistance { get; set; }
    public string TotalEngineHours { get; set; }
    public string TotalFuelUsed { get; set; }
}