import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      {/* Header */}
      <div className="pt-32 pb-12 bg-sky-600 text-white">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-sky-100">Get in touch with our travel experts for personalized assistance</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center space-x-2">
                  <MessageCircle className="w-6 h-6 text-sky-600" />
                  <span>Send us a Message</span>
                </CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <Input placeholder="Your first name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <Input placeholder="Your last name" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <Input type="email" placeholder="your.email@example.com" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <Input placeholder="+1 (555) 123-4567" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select a topic</option>
                      <option>Tour Booking Inquiry</option>
                      <option>Custom Tour Request</option>
                      <option>Service Information</option>
                      <option>Product Purchase</option>
                      <option>General Question</option>
                      <option>Complaint or Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <Textarea placeholder="Please provide details about your inquiry..." rows={5} />
                  </div>

                  <Button className="w-full bg-sky-600 hover:bg-sky-700 flex items-center justify-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
                <CardDescription>Multiple ways to reach our friendly team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-sky-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Office Address</h3>
                    <p className="text-gray-600">
                      123 Gangnam-daero, Gangnam-gu
                      <br />
                      Seoul, South Korea 06292
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-sky-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone Numbers</h3>
                    <p className="text-gray-600">
                      Korea: +82-2-1234-5678
                      <br />
                      International: +1-555-KOREA-01
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-sky-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Email Addresses</h3>
                    <p className="text-gray-600">
                      General: info@onedaykorea.com
                      <br />
                      Tours: tours@onedaykorea.com
                      <br />
                      Shop: shop@onedaykorea.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-sky-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM KST
                      <br />
                      Saturday: 10:00 AM - 4:00 PM KST
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-xl text-red-800">Emergency Contact</CardTitle>
                <CardDescription className="text-red-600">24/7 support for travelers in Korea</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="font-semibold text-red-800">Emergency Hotline:</p>
                  <p className="text-red-700 text-lg font-bold">+82-10-1234-5678</p>
                  <p className="text-sm text-red-600">Available 24/7 for urgent assistance during your tour</p>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Link */}
            <Card className="bg-sky-50 border-sky-200">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-sky-800 mb-2">Frequently Asked Questions</h3>
                <p className="text-sky-600 text-sm mb-4">
                  Find quick answers to common questions about our tours and services.
                </p>
                <Button variant="outline" className="border-sky-300 text-sky-700 hover:bg-sky-100 bg-transparent">
                  View FAQ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Find Our Office</CardTitle>
              <CardDescription>Located in the heart of Gangnam, Seoul</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-4" />
                  <p>Interactive Map</p>
                  <p className="text-sm">Google Maps integration would be placed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
