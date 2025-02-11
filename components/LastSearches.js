"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, Bookmark } from "lucide-react";

export default function LastSearches() {
  const [savedSearches, setSavedSearches] = useState([]);
  const [lastSearch, setLastSearch] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedSearches") || "[]");
    setSavedSearches(saved);
    const last = JSON.parse(localStorage.getItem("lastSearch") || "null");
    setLastSearch(last);
  }, []);

  const applySearch = (filters) => {
    const params = new URLSearchParams(filters);
    router.push(`/resale/ontario?${params.toString()}`);
  };

  if (!savedSearches.length && !lastSearch) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {lastSearch && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <History className="h-5 w-5" />
              Continue your last search
            </CardTitle>
            <CardDescription>
              {new Date(lastSearch.timestamp).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="secondary"
              onClick={() => applySearch(lastSearch.filters)}
            >
              Continue Search
            </Button>
          </CardContent>
        </Card>
      )}

      {savedSearches.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bookmark className="h-5 w-5" />
              Saved Searches
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {savedSearches.slice(0, 3).map((search, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{search.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => applySearch(search.filters)}
                >
                  Apply
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
