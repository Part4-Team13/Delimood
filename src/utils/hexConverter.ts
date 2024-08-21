/**
특수 기호를 16진법으로 변환하는 함수
@param input 검색어 문자열
@returns 16진법으로 변환된 문자열
 */

export function hexConverter(input: string): string {
  return input
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);

      //영어, 숫자, 한글은 변환하지 않음
      if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code >= 48 && code <= 57) || (code >= 44032 && code <= 55203)) {
        return char;
      }

      //특수 기호를 16진법으로 변환
      return `%${code.toString(16).toUpperCase()}`;
    })
    .join('');
}
