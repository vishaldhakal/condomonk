import ListingCard from "./ListingCard";
import GoodAccountingCard from "./GoodAccountingCard";
import PreconSchema from "../PreconSchema";

/**
 * Card grid in the homebaba-style redesign.
 * When `showAd` is set, the Good Accounting card is placed as the first card
 * of the 2nd row at every breakpoint (1/2 cols → after 2, 3 cols → after 3,
 * 4 cols → after 4). Only one copy is visible at a time.
 */
export default function ListingGrid({
  projects = [],
  showAd = false,
  withSchema = true,
  priorityCount = 0,
}) {
  const adSlots = {
    2: "flex lg:hidden",
    3: "hidden lg:flex xl:hidden",
    4: "hidden xl:flex",
  };

  const items = [];
  projects.forEach((item, index) => {
    if (showAd && adSlots[index]) {
      items.push(
        <GoodAccountingCard key={`ad-${index}`} className={adSlots[index]} />,
      );
    }
    items.push(
      <div key={item.id} className="flex [&>article]:w-full">
        {withSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(PreconSchema(item)),
            }}
          />
        )}
        <ListingCard {...item} priority={index < priorityCount} />
      </div>,
    );
  });

  // Few listings: slots that were never reached get their ad at the end
  if (showAd) {
    Object.entries(adSlots)
      .filter(([pos]) => Number(pos) >= projects.length)
      .forEach(([pos, cls]) =>
        items.push(<GoodAccountingCard key={`ad-end-${pos}`} className={cls} />),
      );
  }

  return (
    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items}
    </div>
  );
}
