"use client";
import React, { useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useRouter } from "next/navigation";

function MainSearch(props) {
  const route = useRouter();
  const items = props.cities;

  const handleOnSelect = (item) => {
    console.log(item);
    route.push(`/${item.slug}/`);
  };

  const formatResult = (item) => {
    return (
      <div className="d-flex">
        <span className="d-none d-sm-inline me-3">{/* SVG icon */}</span>
        <span style={{ display: "block", textAlign: "left", padding: "5px" }}>
          {item.name}
        </span>
      </div>
    );
  };

  useEffect(() => {
    // Set focus programmatically if needed
    document.querySelector(".zzz input").focus();
  }, []);

  return (
    <div className="App zzz">
      <header className="App-header">
        <div className="muuuuu">
          <ReactSearchAutocomplete
            items={items}
            onSearch={(string, results) => console.log(string, results)}
            onHover={(result) => console.log(result)}
            onSelect={handleOnSelect}
            onFocus={() => console.log("Focused")}
            placeholder="Search by city"
            styling={{
              boxShadow: "none",
              backgroundColor: "#f5f5f5",
              border: "1px solid black",
              borderRadius: "20px",
            }}
            showIcon={false}
            formatResult={formatResult}
          />
        </div>
      </header>
    </div>
  );
}

export default MainSearch;
