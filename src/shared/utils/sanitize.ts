import DOMPurify from 'isomorphic-dompurify';

/**
 * HTML 문자열을 안전하게 sanitize
 * XSS 공격 방지를 위해 dangerouslySetInnerHTML 사용 전에 반드시 호출
 */
export function sanitizeHtml(html: string): string {
	if (!html) return '';

	return DOMPurify.sanitize(html, {
		ALLOWED_TAGS: [
			'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's',
			'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
			'ul', 'ol', 'li',
			'a', 'span', 'div',
			'table', 'thead', 'tbody', 'tr', 'th', 'td',
			'blockquote', 'pre', 'code',
			'img'
		],
		ALLOWED_ATTR: [
			'href', 'target', 'rel', 'class', 'style',
			'src', 'alt', 'width', 'height',
			'colspan', 'rowspan'
		],
		ALLOW_DATA_ATTR: false,
		// 링크는 새 탭에서 열고, noopener noreferrer 적용
		ADD_ATTR: ['target', 'rel'],
	});
}

/**
 * 텍스트만 추출 (모든 HTML 태그 제거)
 */
export function stripHtml(html: string): string {
	if (!html) return '';
	return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] });
}
