import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, Users, Car, Bus, Ticket, Clock, CheckCircle, MapPin, Shield, Headphones, Star } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      title: "Layover Tour",
      description: "Make the most of your layover time in Seoul",
      icon: <Plane className="w-8 h-8 text-sky-600" />,
      duration: "4-10 hours",
      price: "From $45",
      features: [
        "Airport pickup & drop-off included",
        "Professional English-speaking guide",
        "Flexible itinerary based on layover time",
        "Major attractions visit",
        "Luggage storage service",
      ],
      popular: true,
    },
    {
      title: "Group Tour",
      description: "Perfect for families and friends traveling together",
      icon: <Users className="w-8 h-8 text-sky-600" />,
      duration: "Full day",
      price: "From $35/person",
      features: [
        "Minimum 6 people, maximum 20",
        "Discounted group rates",
        "Customizable itinerary",
        "Professional tour guide",
        "Group photo service",
      ],
    },
    {
      title: "Private Vehicle & Driver",
      description: "Comfortable private transportation with professional driver",
      icon: <Car className="w-8 h-8 text-sky-600" />,
      duration: "Hourly/Daily",
      price: "From $80/day",
      features: [
        "Clean, comfortable vehicle",
        "Professional Korean driver",
        "Flexible schedule",
        "English GPS navigation",
        "Fuel and tolls included",
      ],
    },
    {
      title: "Incheon Airport Transfer",
      description: "Reliable airport transfer service to/from Seoul",
      icon: <Plane className="w-8 h-8 text-sky-600" />,
      duration: "1-2 hours",
      price: "From $25",
      features: [
        "Door-to-door service",
        "Flight monitoring",
        "Meet & greet service",
        "24/7 availability",
        "Fixed price guarantee",
      ],
    },
    {
      title: "Shuttle Bus Package",
      description: "Convenient shuttle service to popular destinations",
      icon: <Bus className="w-8 h-8 text-sky-600" />,
      duration: "Various",
      price: "From $15",
      features: [
        "Regular scheduled departures",
        "Multiple pickup points",
        "Air-conditioned buses",
        "English announcements",
        "Tourist-friendly routes",
      ],
    },
    {
      title: "Tickets / Wifi / Sim Card",
      description: "Essential travel necessities for your Korea trip",
      icon: <Ticket className="w-8 h-8 text-sky-600" />,
      duration: "Various",
      price: "From $10",
      features: [
        "Attraction tickets booking",
        "Unlimited WiFi rental",
        "Korean SIM cards",
        "T-money transportation cards",
        "Convenient pickup locations",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <div className="pt-28 pb-12 bg-gradient-to-br from-sky-400 to-sky-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-400/90 to-sky-600/90"></div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Top right area icons */}
          <div className="absolute top-20 right-20 opacity-20">
            <Plane className="w-16 h-16 text-white transform rotate-12" />
          </div>
          <div className="absolute top-32 right-40 opacity-15">
            <Car className="w-12 h-12 text-sky-200" />
          </div>
          <div className="absolute top-16 right-60 opacity-25">
            <MapPin className="w-10 h-10 text-sky-100" />
          </div>

          {/* Middle right area */}
          <div className="absolute top-40 right-16 opacity-20">
            <Users className="w-14 h-14 text-white" />
          </div>
          <div className="absolute top-52 right-52 opacity-15">
            <Bus className="w-12 h-12 text-sky-200" />
          </div>

          {/* Bottom right area */}
          <div className="absolute bottom-20 right-24 opacity-25">
            <Shield className="w-12 h-12 text-sky-100" />
          </div>
          <div className="absolute bottom-32 right-48 opacity-20">
            <Headphones className="w-10 h-10 text-white" />
          </div>
          <div className="absolute bottom-16 right-72 opacity-15">
            <Star className="w-8 h-8 text-sky-200" />
          </div>

          {/* Additional decorative elements */}
          <div className="absolute top-24 right-32 opacity-10">
            <Ticket className="w-8 h-8 text-white transform -rotate-12" />
          </div>
          <div className="absolute bottom-40 right-36 opacity-10">
            <Clock className="w-8 h-8 text-sky-100 transform rotate-45" />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-lg text-sky-100 leading-relaxed mb-6">
              Comprehensive travel services to make your Korea experience seamless and unforgettable
            </p>
            <div className="flex items-center space-x-8 text-sky-100">
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-sm">Services Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Customer Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400"></div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {service.popular && <Badge className="absolute top-4 right-4 bg-red-500 text-white">Popular</Badge>}

              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{service.duration}</span>
                    </div>
                    <div className="font-bold text-sky-600 text-lg">{service.price}</div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Service Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-sky-600 hover:bg-sky-700">Book {service.title}</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-sky-50 py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Need Custom Service?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Contact us for customized travel solutions tailored to your needs.
          </p>
          <Button className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3">Contact Us</Button>
        </div>
      </div>
    </div>
  )
}
