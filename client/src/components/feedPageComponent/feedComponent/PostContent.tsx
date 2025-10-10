import React, { useState } from "react";

interface PostContentProps {
  text: string;
  maxWords?: number; // optional: number of words before showing "show more"
}

const PostContent: React.FC<PostContentProps> = ({ text, maxWords = 25 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Regex to detect URLs
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;

  // Split text into words
  const words = text.split(' ');
  const itCanOverflow = words.length > maxWords;
  const beginText = itCanOverflow ? words.slice(0, maxWords).join(' ') : text;
  const endText = itCanOverflow ? words.slice(maxWords).join(' ') : '';

  // Function to render text with clickable URLs
  const renderTextWithLinks = (content: string) => {
    const parts = content.split(urlRegex);
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        const href = part.startsWith("http") ? part : `https://${part}`;
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-500 font-bold"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <pre className="font-sans dark:text-white whitespace-pre-wrap break-words">
      {renderTextWithLinks(beginText)}
      {itCanOverflow && (
        <>
          {!isExpanded && <span>...</span>}
          {isExpanded && <>{renderTextWithLinks(' ' + endText)}</>}
          <span
            className="text-blue-600 dark:text-blue-500 font-bold cursor-pointer ml-1"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? " (show less)" : " (show more)"}
          </span>
        </>
      )}
    </pre>
  );
};

export default PostContent;
