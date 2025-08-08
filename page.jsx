\
"use client";
import "./styles/globals.css";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Clock, BedDouble, Plane, Search, ChevronRight, ChevronLeft } from "lucide-react";

const ITINERARY = [
  {
    id: 1,
    date: "Sat 10 Aug",
    title: "Arrive in Dubai",
    location: "Forte Tower (Downtown Dubai)",
    blocks: [
      { time: "Late night (lands ~00:00–01:00 Sun)", label: "Airport → Check-in at Forte Tower", icon: "plane" },
      { time: "Overnight", label: "Sleep & recover", icon: "bed" },
    ],
    media: [
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Dubai_skyline_2015.jpg" },
    ],
    notes: "Late arrival. Keep luggage essentials handy (pjs, toothbrush, kids’ comfort items).",
  },
  {
    id: 2,
    date: "Sun 11 Aug",
    title: "Boo Boo Laand + Downtown",
    location: "Dubai Mall / Downtown",
    blocks: [
      { time: "Late morning", label: "Brunch at Dubai Mall", icon: "clock" },
      { time: "Midday", label: "Boo Boo Laand play session", icon: "map" },
      { time: "Afternoon", label: "Nap/quiet time back at Forte Tower", icon: "bed" },
      { time: "Evening", label: "Dubai Fountain walk + easy dinner", icon: "clock" },
    ],
    media: [
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/e/ee/The_Dubai_Mall%2C_Downtown_Dubai.jpg" },
      { type: "video", src: "https://www.youtube.com/embed/f5lmqdq9mlQ" },
    ],
    notes: "Keep this day light after the red-eye arrival.",
  },
  {
    id: 3,
    date: "Mon 12 Aug",
    title: "Warner Bros. World",
    location: "Yas Island, Abu Dhabi",
    blocks: [
      { time: "Morning", label: "Drive to Abu Dhabi & check-in (WB Hotel)", icon: "map" },
      { time: "Daytime", label: "Warner Bros. World Abu Dhabi", icon: "map" },
      { time: "Afternoon", label: "Hotel rest/pool & nap", icon: "bed" },
      { time: "Evening", label: "Dinner at Yas Bay/Yas Mall", icon: "clock" },
    ],
    media: [
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Warner_Bros._World_Abu_Dhabi_entrance.jpg" },
      { type: "video", src: "https://www.youtube.com/embed/qYVIAy2XsVA" },
    ],
    notes: "Indoor park — great for August heat.",
  },
  {
    id: 4,
    date: "Tue 13 Aug",
    title: "SeaWorld Abu Dhabi",
    location: "Yas Island, Abu Dhabi",
    blocks: [
      { time: "Morning", label: "Hotel breakfast", icon: "clock" },
      { time: "Daytime", label: "SeaWorld Abu Dhabi", icon: "map" },
      { time: "Afternoon", label: "Rest/nap", icon: "bed" },
      { time: "Evening", label: "Easy dinner nearby", icon: "clock" },
    ],
    media: [
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Seaworld_Abu_Dhabi_Logo.png" },
      { type: "video", src: "https://www.youtube.com/embed/V8HoxY6hZgM" },
    ],
    notes: "Massive indoor marine park; stroller friendly.",
  },
  {
    id: 5,
    date: "Wed 14 Aug",
    title: "Ferrari World → Back to Dubai",
    location: "Yas Island → Downtown Dubai (Forte Tower)",
    blocks: [
      { time: "Morning", label: "Ferrari World (kid zones + junior driving)", icon: "map" },
      { time: "Late afternoon", label: "Drive back to Dubai & check-in (Forte Tower)", icon: "map" },
      { time: "Evening", label: "Relaxed dinner near Burj", icon: "clock" },
    ],
    media: [
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Ferrari_World_Abu_Dhabi.jpg" },
      { type: "video", src: "https://www.youtube.com/embed/mRvBHrO0a4M" },
    ],
    notes: "Aim for an early-ish night after the drive.",
  },
  {
    id: 6,
    date: "Thu 15 Aug",
    title: "Chaos Karts + Souk Al Bahar",
    location: "Al Quoz / Downtown Dubai",
    blocks: [
      { time: "Morning", label: "Brunch downtown", icon: "clock" },
      { time: "Late morning", label: "Chaos Karts (Mario Kart-style)", icon: "map" },
      { time: "Afternoon", label: "Nap/quiet time", icon: "bed" },
      { time: "Evening", label: "Souk Al Bahar dinner & fountain views", icon: "clock" },
    ],
    media: [
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Alserkal_Avenue%2C_Al_Quoz_Industrial_Area%2C_Dubai.jpg" },
      { type: "video", src: "https://www.youtube.com/embed/PiB1fzgf8DU" },
    ],
    notes: "Height rules apply; book ahead to avoid queues.",
  },
  {
    id: 7,
    date: "Fri 16 Aug",
    title: "Atlantis – Waterpark Day",
    location: "Atlantis, The Palm (Imperial Club)",
    blocks: [
      { time: "Early morning", label: "Check-out & head to Atlantis for Imperial Club breakfast", icon: "map" },
      { time: "Daytime", label: "Aquaventure Waterpark", icon: "map" },
      { time: "Afternoon", label: "Lounge snacks / rest time", icon: "bed" },
      { time: "Evening", label: "Wavehouse dinner (bowling & arcade)", icon: "clock" },
    ],
    media: [
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Atlantis_The_Palm%2C_Dubai_%28cropped%29.jpg" },
      { type: "video", src: "https://www.youtube.com/embed/FCASDszNaQw" },
      { type: "video", src: "https://www.youtube.com/embed/IHCbBan6-MI" },
    ],
    notes: "Pack swimwear in a separate day-bag for early access.",
  },
  {
    id: 8,
    date: "Sat 17 Aug",
    title: "Atlantis – Aquarium + Slides",
    location: "Atlantis, The Palm",
    blocks: [
      { time: "Morning", label: "Imperial Club breakfast", icon: "clock" },
      { time: "Late morning", label: "The Lost Chambers Aquarium", icon: "map" },
      { time: "Afternoon", label: "Aquaventure round 2 / pool nap", icon: "bed" },
      { time: "Evening", label: "Casual dinner on The Palm", icon: "clock" },
    ],
    media: [
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Atlas_Village%2C_The_Lost_Chambers_Aquarium%2C_Dubai.jpg" },
      { type: "video", src: "https://www.youtube.com/embed/7d6gmnmFGS4" },
    ],
    notes: "Bring waterproof phone pouch for photos.",
  },
  {
    id: 9,
    date: "Sun 18 Aug",
    title: "Atlantis Checkout + Last Night",
    location: "Atlantis → Final-night Hotel (TBD)",
    blocks: [
      { time: "Morning", label: "Imperial breakfast & last splash at Aquaventure", icon: "clock" },
      { time: "Afternoon", label: "Late checkout if possible; move to final-night hotel", icon: "map" },
      { time: "Evening", label: "Easy dinner near hotel (airport-friendly)", icon: "clock" },
    ],
    media: [
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Address_Downtown%2C_Dubai.jpg" },
    ],
    notes: "Good options: Address Sky View, Rove City Walk, Le Méridien Dubai.",
  },
  {
    id: 10,
    date: "Mon 19 Aug",
    title: "Fly Home (2 pm)",
    location: "DXB Airport",
    blocks: [
      { time: "Morning", label: "Leisurely breakfast & pack", icon: "clock" },
      { time: "~11:00", label: "Head to DXB for 14:00 flight", icon: "plane" },
    ],
    media: [
      { type: "image", src: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Dubai_International_Airport_Terminal_3_Interior.jpg" },
    ],
    notes: "Keep passports/board passes in one parent’s sling bag for speed.",
  },
];

const IconChip = ({ name }) => {
  const map = {
    plane: <Plane className="h-4 w-4" />, bed: <BedDouble className="h-4 w-4" />, clock: <Clock className="h-4 w-4" />, map: <MapPin className="h-4 w-4" />,
  };
  return <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-amber-900 text-xs">{map[name] || <Clock className="h-4 w-4" />}</span>;
};

function SafeImage({ src, alt, className }) {
  const [failed, setFailed] = React.useState(false);
  const fallback = "https://placehold.co/800x450?text=Image+unavailable";
  return <img src={failed ? fallback : src} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />;
}

function youtubeIdFromUrl(url) {
  try {
    const u = new URL(url);
    const id = u.pathname.split("/").filter(Boolean).pop();
    if (u.hostname.includes("youtube.com") && id && id.length >= 8) return id;
  } catch {}
  return null;
}
function expandMedia(media) {
  const out = [];
  for (const m of media) {
    if (m.type === "video") {
      const id = youtubeIdFromUrl(m.src);
      if (id) out.push({ type: "image", src: `https://img.youtube.com/vi/${id}/hqdefault.jpg` });
      out.push(m);
    } else {
      out.push(m);
    }
  }
  return out;
}

function MediaViewer({ media }) {
  const computed = expandMedia(media);
  const [index, setIndex] = useState(0);
  const item = computed[index] || media[0];
  const prev = () => setIndex((i) => (i === 0 ? computed.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === computed.length - 1 ? 0 : i + 1));

  return (
    <div className="w-full rounded-2xl overflow-hidden border bg-white shadow-sm">
      <div className="relative aspect-video">
        {item?.type === "image" ? (
          <SafeImage src={item.src} alt="media" className="h-full w-full object-cover" />
        ) : (
          <iframe className="h-full w-full" src={item.src} title="video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        )}
      </div>
      {computed.length > 1 && (
        <div className="flex items-center justify-between px-2 py-1 bg-white">
          <Button variant="ghost" size="icon" onClick={prev}><ChevronLeft /></Button>
          <div className="text-xs text-neutral-600">{index + 1} / {computed.length}</div>
          <Button variant="ghost" size="icon" onClick={next}><ChevronRight /></Button>
        </div>
      )}
    </div>
  );
}

function DayCard({ day }) {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="text-sm"><CalendarDays className="mr-1 h-4 w-4" />{day.date}</Badge>
          <CardTitle className="text-xl">{day.title}</CardTitle>
        </div>
        <div className="mt-1 flex items-center text-sm text-neutral-600"><MapPin className="mr-2 h-4 w-4" />{day.location}</div>
      </CardHeader>
      <CardContent className="space-y-4">
        <MediaViewer media={day.media} />
        <div className="w-full">
          <div className="text-base px-4 py-3 bg-white rounded-xl border">Plan & schedule</div>
          <div className="px-4 py-3">
            <ul className="space-y-2">
              {day.blocks.map((b, i) => (
                <li key={i} className="flex items-center gap-3 rounded-xl bg-amber-50 px-3 py-2">
                  <IconChip name={b.icon} />
                  <div>
                    <div className="font-medium">{b.time}</div>
                    <div className="text-sm text-neutral-600">{b.label}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-base px-4 py-3 bg-white rounded-xl border mt-3">Tips & notes</div>
          <div className="px-4 py-3">
            <p className="text-sm leading-relaxed">{day.notes}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function runSelfTests() {
  try {
    console.group("Itinerary self-tests");
    console.assert(Array.isArray(ITINERARY) && ITINERARY.length > 0, "ITINERARY should be a non-empty array");
    ITINERARY.forEach((d, idx) => {
      console.assert(!!d.date && !!d.title && !!d.location, `Day ${idx + 1} must have date/title/location`);
      console.assert(Array.isArray(d.blocks) && d.blocks.length > 0, `Day ${idx + 1} must have blocks`);
      console.assert(Array.isArray(d.media) && d.media.length > 0, `Day ${idx + 1} must have media`);
    });
    const haystack = ITINERARY.map(d => [d.date, d.title, d.location, d.notes, ...d.blocks.map(b=>b.label)].join(" ")).join(" ").toLowerCase();
    console.assert(haystack.includes("atlantis"), "Search haystack should include 'Atlantis'");
    console.groupEnd();
  } catch (e) { console.error("Self-tests failed:", e); }
}

export default function Page() {
  const [query, setQuery] = useState("");
  const [showNapHints, setShowNapHints] = useState(true);

  useEffect(() => { runSelfTests(); }, []);

  const filtered = useMemo(() => {
    if (!query) return ITINERARY;
    const q = query.toLowerCase();
    return ITINERARY.filter(d => [d.date, d.title, d.location, d.notes, ...d.blocks.map(b=>b.label)].join(" ").toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-8 space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Dubai & Abu Dhabi Family Planner</h1>
          <p className="text-neutral-600">Aug 10–19, 2025 • Kid-friendly schedule with breaks & naps.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Switch checked={showNapHints} onCheckedChange={setShowNapHints} id="nap" />
            <label htmlFor="nap" className="text-sm">Show nap & break hints</label>
          </div>
          <div className="flex items-center gap-2">
            <Input placeholder="Search days, places, notes…" value={query} onChange={e=>setQuery(e.target.value)} className="w-56" />
            <Button variant="secondary"><Search className="h-4 w-4 mr-1" />Search</Button>
          </div>
        </div>
      </header>

      {showNapHints && (
        <div className="rounded-2xl border bg-amber-50 p-4 text-amber-900">
          <strong>Pro tip:</strong> Build in 60–90 minutes of quiet time after lunch most days. Keep a small “go bag” with snacks, wipes, power bank, and spare clothes for the kids.
        </div>
      )}

      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="map">Quick View</TabsTrigger>
          <TabsTrigger value="media">All Media</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6">
          {filtered.map(day => (<DayCard key={day.id} day={day} />))}
        </TabsContent>

        <TabsContent value="map">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>At-a-glance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ITINERARY.map(d => (
                  <div key={d.id} className="flex items-center gap-3 rounded-xl border p-3">
                    <Badge variant="outline" className="shrink-0">{d.date}</Badge>
                    <div>
                      <div className="font-semibold">{d.title}</div>
                      <div className="text-xs text-neutral-600">{d.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ITINERARY.map(d => (
              <Card key={d.id} className="rounded-2xl overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{d.date} • {d.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {expandMedia(d.media).map((m, i) => (
                    m.type === "image" ? (
                      <div key={i} className="aspect-video w-full overflow-hidden rounded-xl border">
                        <SafeImage src={m.src} alt={d.title + " image"} className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div key={i} className="aspect-video w-full overflow-hidden rounded-xl border">
                        <iframe className="h-full w-full" src={m.src} title={`${d.title} video ${i+1}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                      </div>
                    )
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <footer className="pt-6 text-sm text-neutral-600">
        Replace any image or video by editing the <code>media</code> arrays above.
      </footer>
    </div>
  );
}
