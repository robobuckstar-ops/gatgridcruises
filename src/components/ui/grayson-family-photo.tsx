/**
 * Grayson's family aboard a Disney sailing — the one real photo of the person
 * behind the concierge service. Kept in one place so every surface points at
 * the same asset and alt text.
 *
 * Before this existed, /book pointed at a file that was never committed, so
 * visitors got the "GS" initials fallback instead of a face.
 */

export const GRAYSON_FAMILY_PHOTO_SRC = '/images/grayson-family-castaway.jpg'
export const GRAYSON_FAMILY_PHOTO_ALT =
  'Grayson Starbuck with his wife Crystal and their two kids in pirate costumes on the deck of a Disney cruise ship'

type Variant = 'avatar' | 'portrait'

interface GraysonFamilyPhotoProps {
  /** 'avatar' is the small circular crop next to a byline; 'portrait' is the full photo. */
  variant?: Variant
  /** Tailwind sizing/positioning for the wrapper — overrides the variant default. */
  className?: string
  /** Caption rendered under the portrait variant. */
  caption?: string
}

export function GraysonFamilyPhoto({
  variant = 'avatar',
  className,
  caption,
}: GraysonFamilyPhotoProps) {
  if (variant === 'avatar') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={GRAYSON_FAMILY_PHOTO_SRC}
        alt={GRAYSON_FAMILY_PHOTO_ALT}
        width={80}
        height={80}
        loading="lazy"
        decoding="async"
        className={className ?? 'w-10 h-10 rounded-full object-cover flex-shrink-0 bg-[#1E3A5F]'}
      />
    )
  }

  return (
    <figure className={className ?? 'w-full max-w-xs'}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={GRAYSON_FAMILY_PHOTO_SRC}
        alt={GRAYSON_FAMILY_PHOTO_ALT}
        width={750}
        height={1000}
        loading="lazy"
        decoding="async"
        className="w-full h-auto rounded-2xl object-cover shadow-sm border border-slate-200"
      />
      {caption && (
        <figcaption className="font-inter text-xs text-slate-500 mt-2 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
