import React from "react";

import relatedArticleCoverImage from "../../../static/img/hexagonal-pattern.webp";

import "./RelatedArticles.module.css";

export default function RelatedArticlesCard({ article }) {
  return (
    <a
      className="max-w-xs rounded overflow-hidden shadow-lg cursor-pointer bg-neutral-800 no-underline"
      href={article.url}
      target="_blank"
    >
      <img
        className="w-full h-24 object-cover"
        src={relatedArticleCoverImage}
        alt=""
      />

      <div className="px-2 py-2 bg-neutral-800">
        <div className="font-bold text-md mb-2 text-left tracking-tight text-white line-clamp-2 text-ellipsis">
          {article.title}
        </div>
        <div className="text-xs mb-2 text-left text-white">
          {article.publishedOn}
        </div>
      </div>
    </a>
  );
}
