"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = ({
  homeElement,
  separator,
  containerClasses,
  listClasses,
  activeClasses,
  capitalizeLinks,
  removePathName,
}) => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <div className="z-2">
      <ul
        className={`flex items-center whitespace-nowrap text-xs overflow-hidden ${containerClasses}`}
      >
        <li className={`${listClasses} flex-shrink-0`}>
          <Link href={"/"}>{homeElement}</Link>
        </li>
        {pathNames.length > 0 && (
          <span className="flex-shrink-0">{separator}</span>
        )}
        {pathNames.map((link, index) => {
          if (removePathName?.toUpperCase() === link.toUpperCase()) {
            return;
          }
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          let itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          let itemLink = capitalizeLinks
            ? link[0].toUpperCase() + link.slice(1, link.length)
            : link;
          // Remove "-" from itemLink
          itemLink = itemLink.replace(/-/g, " ");

          // Modify city name display in breadcrumb
          if (index === 0) {
            // First path segment is typically the city
            itemLink = `Pre construction home ${itemLink}`;
          }

          const isLastItem = index === pathNames.length - 1;

          return (
            <React.Fragment key={index}>
              <li
                className={`${itemClasses} ${
                  isLastItem
                    ? "max-w-[120px] md:max-w-none truncate"
                    : "flex-shrink-0"
                }`}
              >
                <Link href={href}>{itemLink}</Link>
              </li>
              {pathNames.length !== index + 1 && (
                <span className="flex-shrink-0">{separator}</span>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
