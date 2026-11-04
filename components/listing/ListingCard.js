"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import SideContactForm from "../SideContactForm";

function formatPrice(n) {
  const num = Number(n) || 0;
  if (!num) return null;
  if (num >= 1_000_000)
    return "$" + (num / 1_000_000).toFixed(2).replace(/\.?0+$/, "") + "M";
  const k = num / 1000;
  return (
    "$" +
    (k >= 100
      ? (Math.round(k * 10) / 10).toString().replace(/\.0$/, "")
      : k.toFixed(0)) +
    "K"
  );
}

export default function ListingCard(props) {
  const city = props.city?.name?.toLowerCase() || "";
  const url = `/${city}/${props.slug}`;
  const price = formatPrice(props.price_starting_from);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClose = () => setOpen(false);
    window.addEventListener("homebaba:lead-followup", handleClose);
    return () =>
      window.removeEventListener("homebaba:lead-followup", handleClose);
  }, []);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#ececec] bg-white text-left text-black shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)] transition hover:shadow-[0_8px_24px_-10px_rgba(0,0,0,0.18)]">
      <Link href={url} className="block">
        <div className="relative aspect-[3/2] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
          <img
            loading={props.priority ? "eager" : "lazy"}
            src={
              props.image?.image
                ? `https://api.condomonk.ca${props.image.image}`
                : "/noimage.webp"
            }
            alt={`${props.project_name} located at ${props.project_address} cover image`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-[12px] font-medium text-black shadow-sm">
            {props.status}
          </span>
          {props.is_featured && (
            <span className="absolute right-3 top-3 rounded-full bg-black px-3 py-1 text-[11px] font-medium text-white shadow-sm">
              Featured
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link
          href={url}
          className="truncate text-[16px] font-bold underline-offset-2 hover:underline"
        >
          {props.project_name}
        </Link>
        <p className="mt-1.5 truncate text-[13px]">{props.project_address}</p>
        <p className="mt-1 truncate text-[13px]">
          Project type:{" "}
          <span className="font-semibold">{props.project_type}</span>
        </p>
        <p className="mt-1 truncate text-[13px]">
          Developed by{" "}
          {props.developer?.slug ? (
            <Link
              href={`/builders/${props.developer.slug}`}
              className="font-semibold hover:underline"
            >
              {props.developer.name}
            </Link>
          ) : (
            <span className="font-semibold">
              {props.developer?.name || "TBA"}
            </span>
          )}
        </p>
        <p className="mt-1 truncate text-[13px]">
          Occupancy:{" "}
          <span className="font-semibold">{props.occupancy || "TBA"}</span>
        </p>
        <p className="mt-3 text-[18px] font-bold">
          {price ? `From ${price}` : "Price coming soon"}
        </p>

        <div className="mt-auto pt-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="block w-full rounded-xl bg-[#fffbe6] py-2.5 text-center text-[14px] font-semibold text-black transition hover:bg-[#fff4c2]">
                Request more info
              </button>
            </DialogTrigger>
            <DialogContent className="p-6 w-[90%] md:w-[32rem] max-h-fit">
              <DialogTitle className="sr-only">
                {props.project_name} - Request more info
              </DialogTitle>
              <div className="flex flex-col items-center mb-6">
                <h2 className="text-xl md:text-2xl text-gray-800 mb-2 text-center">
                  {props.project_name}
                </h2>
                <p className="text-gray-600 text-center text-sm">
                  Send Me Pricing Details
                </p>
              </div>
              <SideContactForm
                proj_name={props.project_name}
                defaultmessage={`Please send me additional information about ${props.project_name}. Thank you !`}
                city={city}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </article>
  );
}
