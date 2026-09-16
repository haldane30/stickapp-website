/**
 * App Store links with Apple campaign parameters.
 *
 * App Store Connect only attributes downloads to a link that carries the
 * provider token (`pt`), a campaign token (`ct`) and `mt=8`. The `utm_`
 * parameters the site used before are ignored by Apple, which is why three
 * months of web referrals showed up as nothing in Analytics → Sources.
 *
 * One campaign token per template (header, footer, homepage hero, game guide,
 * blog post, pricing, round invite) is enough to see which pages send
 * installs. Campaign tokens: letters, numbers, hyphen, underscore; ≤ 40 chars.
 */

export const APP_STORE_ID = "6758226317";

/** Apple Ads / App Store Connect provider token for this developer account. */
const PROVIDER_TOKEN = "126765100";

const LISTING = `https://apps.apple.com/us/app/stick-golf-betting/id${APP_STORE_ID}`;

export function campaignToken(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export function appStoreUrl(campaign: string): string {
  return `${LISTING}?pt=${PROVIDER_TOKEN}&ct=${campaignToken(campaign)}&mt=8`;
}

/** Custom-scheme link that opens the app directly to a round when it's installed. */
export function openInAppUrl(inviteCode: string): string {
  return `stick://round/${inviteCode}`;
}
