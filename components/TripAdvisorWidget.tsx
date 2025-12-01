"use client";

import { useEffect } from "react";

interface TripAdvisorWidgetProps {
  locationId: string; // TripAdvisor location ID (예: d7264223)
  className?: string;
}

/**
 * TripAdvisor 리뷰 위젯 컴포넌트
 *
 * One Day Korea TripAdvisor ID: d7264223
 * https://www.tripadvisor.co.uk/Attraction_Review-g294197-d7264223-Reviews-One_Day_Korea_Day_Tours-Seoul.html
 */
export default function TripAdvisorWidget({ locationId, className = "" }: TripAdvisorWidgetProps) {
  useEffect(() => {
    // TripAdvisor 위젯 스크립트 로드
    const script = document.createElement("script");
    script.src = "https://www.jscache.com/wejs?wtype=selfserveprop&unession=true&locationId=" + locationId + "&lang=en_US&rating=true&n498reviews=true&writereviewlink=true&pop498idx=true&is498498498498498498498=false&border=true&display498498498498498=true";
    script.async = true;

    // 더 간단한 위젯 스크립트 (Rating Widget)
    const container = document.getElementById("tripadvisor-widget-container");
    if (container) {
      container.innerHTML = `
        <div id="TA_selfserveprop${locationId}" class="TA_selfserveprop">
          <ul id="Z${locationId}" class="TA_links">
            <li id="r${locationId}" class="TA_cdswritereviewlg"></li>
          </ul>
        </div>
      `;

      const taScript = document.createElement("script");
      taScript.src = `https://www.jscache.com/wejs?wtype=selfserveprop&unession=true&locationId=${locationId}&lang=en_US&rating=true&nreviews=5&writereviewlink=true&popIdx=true&is498498498498=false&border=true&display498498498498=true`;
      taScript.async = true;
      document.body.appendChild(taScript);
    }

    return () => {
      // Cleanup
      const existingScript = document.querySelector(`script[src*="jscache.com"][src*="${locationId}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [locationId]);

  return (
    <div className={`tripadvisor-widget ${className}`}>
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <div className="flex items-center gap-3 mb-4">
          {/* TripAdvisor 로고 */}
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#00AA6C"/>
            <path d="M12 6C8.5 6 5.5 8 4 11c1.5 3 4.5 5 8 5s6.5-2 8-5c-1.5-3-4.5-5-8-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z" fill="white"/>
          </svg>
          <div>
            <h3 className="font-bold text-gray-900">TripAdvisor Reviews</h3>
            <p className="text-sm text-gray-500">One Day Korea - Day Tours</p>
          </div>
        </div>

        {/* 평점 표시 (하드코딩 - 실제 위젯 로드 전 표시) */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-5 h-5 text-[#00AA6C]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="font-bold text-lg text-gray-900">5.0</span>
          <span className="text-gray-500 text-sm">(19 reviews)</span>
        </div>

        {/* TripAdvisor 위젯 컨테이너 */}
        <div id="tripadvisor-widget-container" className="min-h-[100px]"></div>

        {/* TripAdvisor 링크 */}
        <a
          href={`https://www.tripadvisor.com/Attraction_Review-g294197-d${locationId}-Reviews-One_Day_Korea_Day_Tours-Seoul.html`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-[#00AA6C] hover:underline font-medium"
        >
          Read all reviews on TripAdvisor
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
