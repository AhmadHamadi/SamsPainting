// ---------------------------------------------------------------------------
// Line-icon set drawn specifically for a painting contractor.
//
// These are real, hand-built 24x24 shapes on a consistent 1.6 stroke — a paint
// roller reads as a paint roller. Generic gradient blobs or a reused checkmark
// on every service card make a site look auto-generated, which is exactly the
// impression a local trade site cannot afford.
// ---------------------------------------------------------------------------

export type IconName =
  | 'roller'
  | 'brush'
  | 'spray'
  | 'house'
  | 'cabinet'
  | 'ceiling'
  | 'wall'
  | 'trim'
  | 'door'
  | 'window'
  | 'stairs'
  | 'deck'
  | 'fence'
  | 'stain'
  | 'epoxy'
  | 'drywall'
  | 'wallpaper'
  | 'sand'
  | 'caulk'
  | 'primer'
  | 'rust'
  | 'washer'
  | 'palette'
  | 'swatch'
  | 'touchup'
  | 'garage'
  | 'boxes'
  | 'shield'
  | 'check'
  | 'phone'
  | 'mail'
  | 'pin'
  | 'clock'
  | 'calendar'
  | 'arrow'
  | 'chevron'
  | 'star'
  | 'menu'
  | 'close'
  | 'quote'
  | 'leaf'
  | 'ruler';

const paths: Record<IconName, JSX.Element> = {
  // Paint roller: frame arm + cylinder + handle
  roller: (
    <>
      <rect x="3" y="3.5" width="13" height="6" rx="1.6" />
      <path d="M16 6.5h3.2a1.8 1.8 0 0 1 1.8 1.8v2.4a1.8 1.8 0 0 1-1.8 1.8h-7.7a1.6 1.6 0 0 0-1.6 1.6V16" />
      <rect x="8.6" y="16" width="2.8" height="5" rx="1.2" />
    </>
  ),
  // Paintbrush: handle, ferrule, bristles
  brush: (
    <>
      <path d="M17.6 3.1 21 6.5l-7.6 7.6-3.4-3.4Z" />
      <path d="m9.2 11.4 3.4 3.4-1.5 1.5a2.4 2.4 0 0 1-3.4 0l-.1-.1a2.4 2.4 0 0 1 0-3.3Z" />
      <path d="M7.5 16.6c-.6 1.6-1.6 2.8-4 3.6 1.2-2.1 1-3.4 1.4-4.6" />
    </>
  ),
  // Spray gun: canister + nozzle + mist
  spray: (
    <>
      <path d="M8 8.5h4.5a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5H8A1.5 1.5 0 0 1 6.5 19v-9A1.5 1.5 0 0 1 8 8.5Z" />
      <path d="M8.5 8.5V5.2A1.7 1.7 0 0 1 10.2 3.5h1.1" />
      <path d="M14 11.5h2.6" />
      <path d="M18.5 8.2h.01M21 6.4h.01M18.9 12.2h.01M21.2 10.6h.01M20.6 14.6h.01" />
    </>
  ),
  house: (
    <>
      <path d="M3.5 10.6 12 3.7l8.5 6.9" />
      <path d="M5.6 12.3V20a.8.8 0 0 0 .8.8h11.2a.8.8 0 0 0 .8-.8v-7.7" />
      <path d="M10 20.8v-5.2h4v5.2" />
    </>
  ),
  // Kitchen cabinet: carcass, centre stile, two knobs
  cabinet: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="1.6" />
      <path d="M12 3.5v17" />
      <path d="M9.6 9.4v2.2M14.4 9.4v2.2" />
    </>
  ),
  // Ceiling: joists above a room outline
  ceiling: (
    <>
      <path d="M3 6.2h18" />
      <path d="M6.4 6.2 4.6 3.4M12 6.2V3.4M17.6 6.2l1.8-2.8" />
      <path d="M5.2 10.4h13.6a1 1 0 0 1 1 1v8.2a1 1 0 0 1-1 1H5.2a1 1 0 0 1-1-1v-8.2a1 1 0 0 1 1-1Z" />
    </>
  ),
  // Wall: brick courses
  wall: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="1.2" />
      <path d="M3 9.5h18M3 14.5h18" />
      <path d="M9 4.5v5M15 9.5v5M9 14.5v5" />
    </>
  ),
  // Trim / baseboard: floor line with a moulding profile
  trim: (
    <>
      <path d="M3 17.5h18" />
      <path d="M4.5 17.5v-3.2a1.4 1.4 0 0 1 1.4-1.4h1.3a1.4 1.4 0 0 0 1.4-1.4V6.5" />
      <path d="M8.6 6.5h11.9" />
      <path d="M3 20.6h18" />
    </>
  ),
  door: (
    <>
      <path d="M6 21V4.4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1V21" />
      <path d="M4.2 21h15.6" />
      <circle cx="14.8" cy="12.4" r="1" />
    </>
  ),
  window: (
    <>
      <rect x="3.8" y="3.8" width="16.4" height="16.4" rx="1.4" />
      <path d="M12 3.8v16.4M3.8 12h16.4" />
    </>
  ),
  // Staircase with a handrail
  stairs: (
    <>
      <path d="M3.5 20.5v-3.6h4.2v-3.6h4.2V9.7h4.2V6.1h4.4" />
      <path d="M3.5 20.5h17" />
      <path d="M6.6 13.6 18.4 3.9" />
    </>
  ),
  // Deck boards in perspective with a post
  deck: (
    <>
      <path d="M3 9.5h18M3 13h18M3 16.5h18" />
      <path d="M6.5 9.5v10M17.5 9.5v10" />
      <path d="M3 6 12 3l9 3" />
    </>
  ),
  // Picket fence
  fence: (
    <>
      <path d="M5 20V8.4L7.4 6l2.4 2.4V20M14.2 20V8.4L16.6 6 19 8.4V20" />
      <path d="M3 11.4h18M3 15.4h18" />
    </>
  ),
  // Stain can with a drip
  stain: (
    <>
      <path d="M5.5 8.5h13v10.6a1.4 1.4 0 0 1-1.4 1.4H6.9a1.4 1.4 0 0 1-1.4-1.4Z" />
      <path d="M5.5 8.5 7 4.4a1.2 1.2 0 0 1 1.1-.8h7.8a1.2 1.2 0 0 1 1.1.8l1.5 4.1" />
      <path d="M12 12.2c1.2 1.5 1.9 2.6 1.9 3.4a1.9 1.9 0 0 1-3.8 0c0-.8.7-1.9 1.9-3.4Z" />
    </>
  ),
  // Epoxy floor: glossy tile grid with a shine
  epoxy: (
    <>
      <path d="M3.4 8.2 12 4l8.6 4.2L12 12.4Z" />
      <path d="M3.4 12.2 12 16.4l8.6-4.2" />
      <path d="M3.4 16.2 12 20.4l8.6-4.2" />
    </>
  ),
  // Drywall sheet with a taping knife
  drywall: (
    <>
      <rect x="3.4" y="4.4" width="12.4" height="15.2" rx="1" />
      <path d="M6.2 8.4h6.8M6.2 12h4.6" />
      <path d="M17.4 6.6 21 10.2l-4.6 4.6-3.6-3.6Z" />
    </>
  ),
  // Wallpaper peeling off a wall
  wallpaper: (
    <>
      <path d="M4.2 3.8h15.6v16.4H4.2Z" />
      <path d="M14.6 3.8c0 5.4 0 10.8-2.4 13.2-1.6 1.6-4 1.9-5.6 1.4" />
      <path d="M8.4 7.6h.01M11 10.6h.01M8.6 13.4h.01" />
    </>
  ),
  // Sanding block on a surface
  sand: (
    <>
      <path d="M4 14.6h16a1 1 0 0 1 1 1v2.2a1.6 1.6 0 0 1-1.6 1.6H4.6A1.6 1.6 0 0 1 3 17.8v-2.2a1 1 0 0 1 1-1Z" />
      <path d="M6.6 14.6v-2.2M12 14.6v-2.2M17.4 14.6v-2.2" />
      <path d="M5 8.4h.01M9 6.6h.01M13 8.2h.01M17.6 6.8h.01M19.4 9.4h.01M7.2 10.2h.01" />
    </>
  ),
  // Caulking gun
  caulk: (
    <>
      <path d="M4 9.4h10.6v5.2H4z" />
      <path d="M14.6 10.6h2.6l3.2-2.4v7l-3.2-2.4h-2.6" />
      <path d="M6.4 14.6v3a1.6 1.6 0 0 0 1.6 1.6h1.2" />
      <path d="M4 9.4 6 6.6" />
    </>
  ),
  // Primer can with a brush stroke
  primer: (
    <>
      <rect x="5" y="7.6" width="11" height="12.4" rx="1.3" />
      <path d="M5 11.4h11" />
      <path d="M16 10.6h2.4a1.6 1.6 0 0 0 1.6-1.6V4.4" />
      <path d="M18.2 3h3.6v2.6h-3.6z" />
    </>
  ),
  // Rust flaking off a metal rail
  rust: (
    <>
      <path d="M3.4 12h17.2" />
      <path d="M6 12V7.4M18 12v-4.6" />
      <path d="M5.2 15.6c1.4-.6 2.2.7 3.6.2s1.6-1.5 3.1-1.2 1.9 1.6 3.4 1.2 1.9-1.4 3.5-.9" />
      <path d="M8.6 19.4h.01M12.6 20h.01M16.4 19.2h.01" />
    </>
  ),
  // Pressure washer wand with a spray fan
  washer: (
    <>
      <path d="M3.6 18.8 12 10.4" />
      <path d="m10.6 9 4.4 4.4" />
      <path d="M15 13.4 20.6 7.8" />
      <path d="M17.4 4.6c1.4.4 2.6 1.6 3 3M15.6 2.4c2.4.5 4.4 2.5 5 5" />
      <rect x="2.6" y="17.6" width="3.4" height="3.4" rx="1.2" />
    </>
  ),
  // Colour palette
  palette: (
    <>
      <path d="M12 3.4a8.6 8.6 0 0 0 0 17.2c1.2 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.7 1.8-1.7h1.6a4.4 4.4 0 0 0 4.4-4.4c0-3.9-3.9-7-8.6-7Z" />
      <circle cx="7.6" cy="12" r="1.1" />
      <circle cx="9.8" cy="8" r="1.1" />
      <circle cx="14.4" cy="7.6" r="1.1" />
    </>
  ),
  // Colour swatch fan
  swatch: (
    <>
      <rect x="3.4" y="8.6" width="4.2" height="12" rx="1.2" />
      <rect x="8.8" y="5.4" width="4.2" height="15.2" rx="1.2" />
      <rect x="14.2" y="2.6" width="4.2" height="18" rx="1.2" />
      <path d="M4.6 16.4h1.8M10 13.2h1.8M15.4 10h1.8" />
    </>
  ),
  // Touch-up: small brush over a patch
  touchup: (
    <>
      <circle cx="9" cy="9" r="5.2" strokeDasharray="2.4 2.2" />
      <path d="M15.4 12.6 21 18.2l-2.8 2.8-5.6-5.6Z" />
      <path d="m13.2 14.8 1.6-1.6" />
    </>
  ),
  garage: (
    <>
      <path d="M3 10.4 12 4.6l9 5.8" />
      <path d="M4.8 11.6V20.4h14.4v-8.8" />
      <path d="M4.8 14.2h14.4M4.8 17.3h14.4" />
    </>
  ),
  // Moving boxes (move-in / move-out painting)
  boxes: (
    <>
      <rect x="3" y="11.6" width="8.4" height="8.4" rx="1" />
      <rect x="12.6" y="11.6" width="8.4" height="8.4" rx="1" />
      <rect x="7.8" y="3.4" width="8.4" height="8.2" rx="1" />
      <path d="M7.2 11.6v2.4M16.8 11.6v2.4M12 3.4v2.4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2 5 6v5.4c0 4.3 2.9 8.1 7 9.4 4.1-1.3 7-5.1 7-9.4V6Z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </>
  ),
  check: <path d="m4.8 12.6 4.6 4.6L19.4 7.2" />,
  phone: (
    <path d="M6.3 3.6h3.1l1.6 3.9-2 1.3a11 11 0 0 0 5.2 5.2l1.3-2 3.9 1.6v3.1a1.7 1.7 0 0 1-1.9 1.7C10.1 17.7 6.3 13.9 4.6 5.5a1.7 1.7 0 0 1 1.7-1.9Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5.2" width="18" height="13.6" rx="1.8" />
      <path d="m3.6 6.6 8.4 6 8.4-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21.2s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M12 6.6V12l3.6 2.2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.4" y="5" width="17.2" height="16" rx="1.8" />
      <path d="M3.4 9.8h17.2M8.4 3v4M15.6 3v4" />
    </>
  ),
  arrow: <path d="M4.4 12h15.2m-6-6 6 6-6 6" />,
  chevron: <path d="m8.6 4.8 7.2 7.2-7.2 7.2" />,
  star: (
    <path d="m12 3.4 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.9l6.1-.9Z" />
  ),
  menu: <path d="M3.6 6.6h16.8M3.6 12h16.8M3.6 17.4h16.8" />,
  close: <path d="M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />,
  quote: (
    <path d="M9.4 6.4c-3 1.2-4.6 3.6-4.6 7.2v4h5.6v-5.8H7.2c0-1.8.9-3 2.6-3.7Zm9.4 0c-3 1.2-4.6 3.6-4.6 7.2v4h5.6v-5.8h-3.2c0-1.8.9-3 2.6-3.7Z" />
  ),
  leaf: (
    <>
      <path d="M20.4 3.6c-9 0-14.4 3.4-14.4 9a5.4 5.4 0 0 0 5.4 5.4c5.6 0 9-5.4 9-14.4Z" />
      <path d="M4 20.4c1.8-4.4 5-7.6 9.4-9.6" />
    </>
  ),
  ruler: (
    <>
      <path d="M15.6 2.8 21.2 8.4 8.4 21.2 2.8 15.6Z" />
      <path d="m12.4 6 2 2M9.6 8.8l2 2M6.8 11.6l2 2" />
    </>
  ),
};

export default function Icon({
  name,
  size = 24,
  className = '',
  strokeWidth = 1.6,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  // Solid-fill glyphs read better filled than stroked at small sizes.
  const filled = name === 'star' || name === 'quote' || name === 'phone';

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
