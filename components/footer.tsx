"use client";

import { Mail, MapPin, Phone } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on quotation pages
  if (pathname?.startsWith("/quotation")) {
    return null;
  }

  return (
    <footer className="bg-tumakr-dark-blue text-white">
      {/* 메인 푸터 */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* 첫 번째 컬럼 - 회사 정보 */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-xl text-white mb-2">OnedayKorea</h3>
              <div className="w-12 h-0.5 bg-tumakr-maroon mb-4"></div>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/tours"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Tour Recommendation
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/private"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Private Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/history"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  History Tours
                </Link>
              </li>
              <li>
                <Link
                  href="/tours/multiday"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Multi-day Tours
                </Link>
              </li>
            </ul>
          </div>

          {/* 두 번째 컬럼 - 도움말 */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg text-white mb-2">Help</h3>
              <div className="w-12 h-0.5 bg-tumakr-maroon mb-4"></div>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Contact us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/chat"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Plan Your Trip
                </Link>
              </li>
            </ul>
          </div>

          {/* 세 번째 컬럼 - 연락처 */}
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg text-white mb-2">Contact</h3>
              <div className="w-12 h-0.5 bg-tumakr-maroon mb-4"></div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-tumakr-maroon mt-1 shrink-0" />
                <span className="text-gray-300 text-sm leading-relaxed">
                  2F, Bukhansan TheSharp Sang-ga,
                  <br />
                  510, Tongil-ro, Seodaemun-gu,
                  <br />
                  Seoul, Korea
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-tumakr-maroon shrink-0" />
                <div className="text-gray-300 text-sm">
                  <a
                    href="tel:+82707556355"
                    className="hover:text-white transition-colors"
                  >
                    +82 70 7556 5355
                  </a>
                  <br />
                  <a
                    href="tel:+821024791242"
                    className="hover:text-white transition-colors"
                  >
                    +82 10 2479 1242
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-tumakr-maroon shrink-0" />
                <a
                  href="mailto:info@onedaykorea.com"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  info@onedaykorea.com
                </a>
              </li>
            </ul>
          </div>

          {/* 네 번째 컬럼 - TripAdvisor + 소셜 */}
          <div className="space-y-4">
            {/* TripAdvisor 위젯 */}
            <a
              href="https://www.tripadvisor.com/Attraction_Review-g294197-d7264223-Reviews-OnedayKorea_Tours-Seoul.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#00AA6C] rounded-full flex items-center justify-center shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">OnedayKorea Tours</p>
                  <p className="text-gray-500 text-xs">Seoul, South Korea</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-[#00AA6C]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-900 font-bold text-sm">5.0</span>
                <span className="text-gray-500 text-xs">(716 reviews)</span>
              </div>
              <p className="text-[#00AA6C] text-xs font-medium flex items-center gap-1">
                Read reviews on TripAdvisor
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </p>
            </a>

            {/* 소셜 미디어 아이콘 */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/traveltokorea"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#1877F2] rounded-full flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/onedaykorea"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-linear-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] rounded-full flex items-center justify-center transition-all"
                title="Instagram"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.27.2-6.78,2.71-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.27,2.71,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.27-.2,6.78-2.71,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.27-2.71-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/onedaykorea"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-black rounded-full flex items-center justify-center transition-colors"
                title="X (Twitter)"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.flickr.com/photos/59006301@N07/albums"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#0063dc] rounded-full flex items-center justify-center transition-colors"
                title="Flickr"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.5 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm13 0a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 저작권 */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 OnedayKorea Tours. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
