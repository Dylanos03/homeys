import parse from "html-react-parser";

export function urlify(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const newText = text.replace(urlRegex, function (url) {
    return (
      '<a href="' +
      url +
      '" className="text-blue-600 hover:underline" target="_blank">' +
      url +
      "</a>"
    );
  });
  return parse(newText);
}
