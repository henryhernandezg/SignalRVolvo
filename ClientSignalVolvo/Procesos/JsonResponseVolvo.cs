using System;
using System.Collections.Generic;

namespace ClientSignalVolvo.Procesos
{

    public class JsonResponseVolvo
    {
    }

    public class Header
    {
        public string MessageName { get; set; }
    }

    public class Vehicle
    {
        public string ExternalId { get; set; }
    }

    public class Company
    {
        public string ExternalId { get; set; }
    }

    public class Event
    {
        public string EventType { get; set; }
        public DateTime VehicleTimestamp { get; set; }
    }

    public class Position
    {
        public DateTime Timestamp { get; set; }
        public double Heading { get; set; }
        public double Hdop { get; set; }
        public double Vdop { get; set; }
        public double Speed { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Altitude { get; set; }
    }

    public class Signal
    {
        public string Name { get; set; }
        public string Value { get; set; }
    }

    public class Metadata
    {
        public List<Signal> Signals { get; set; }
    }

    public class Message
    {
        public Vehicle Vehicle { get; set; }
        public Company Company { get; set; }
        public Event Event { get; set; }
        public Position Position { get; set; }
        public Metadata Metadata { get; set; }
    }

    public class Root
    {
        public Header Header { get; set; }
        public Message Message { get; set; }
    }



}
