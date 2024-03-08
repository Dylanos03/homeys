import parse from "html-react-parser";

export function urlify(text: string) {
  const urlRegex =
    /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
  const newText = text.replace(urlRegex, function (url) {
    const displayUrl = url.replace(/(^\w+:|^)\/\//, "");
    return (
      '<a href="' +
      url +
      '" className="text-blue-600 underline break-all w-8" target="_blank">' +
      displayUrl +
      "</a>"
    );
  });
  return parse(newText);
}
