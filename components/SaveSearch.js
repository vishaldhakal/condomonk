"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { BookmarkPlus } from "lucide-react";

export default function SaveSearch({ currentFilters }) {
  const [searchName, setSearchName] = useState("");

  const handleSaveSearch = () => {
    const savedSearches = JSON.parse(
      localStorage.getItem("savedSearches") || "[]"
    );
    savedSearches.push({
      name: searchName,
      filters: currentFilters,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <BookmarkPlus className="h-4 w-4" />
          Save Search
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Your Search</DialogTitle>
          <DialogDescription>
            Save your current search criteria to quickly access it later.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Dream Home Search"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSaveSearch}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
