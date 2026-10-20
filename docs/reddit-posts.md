# Posting about My Travel Path on Reddit

Lesson learned (October 2026): the account was blocked after posts that were a link to the site with
little else. Reddit's rules and most travel subs treat that as spam, and they also ban content that is
fully AI-generated. Everything below exists to stop that happening again.

## Step zero, before anything is drafted: read all the rules

No outline, draft or reply is prepared until these have been read **on the day**, in full, and the
points that apply to the post are written down at the top of the draft:

1. Reddit Content Policy: https://redditinc.com/policies/content-policy
2. Reddit's self-promotion guidance ("What constitutes spam?"): https://support.reddithelp.com/hc/en-us/articles/360043504051
3. Reddit's rule on AI-generated content in the Content Policy and in the Reddiquette page:
   https://support.reddithelp.com/hc/en-us/articles/205926439
4. The target subreddit's own rules: https://www.reddit.com/r/<sub>/about/rules (and the sidebar wiki
   if it links one), including flair requirements and any "no blogs / no self-promotion / no AI" rule.
5. Any pinned moderator post about promotion or AI in that sub.

If Claude is helping, Claude fetches and reads each of these first and lists the applicable rules with
a one-line note on how the outline satisfies each. If a sub forbids self-promotion outright, the
answer is "do not post there", not a softer post.

## The rules we follow, every time

1. **The post is the content, the link is a footnote.** A reader who never clicks must still get the
   whole value: the route, the stops in order, the times, the food, the pitfalls. If the post would be
   empty without the link, it is not ready.
2. **One link at most, at the end, labelled as yours.** "I keep the map for this walk on my own site
   (free, no sign-up): …". No link in the title. In many subs it is safer to put the link in a comment
   under your own post, or to give it only when someone asks.
3. **Write it yourself, in your own words.** Reddit forbids fully AI-generated content and moderators
   recognise it. The outlines below are fact sheets, not copy. Draft from them, then add what only you
   know: when you last walked it, what went wrong, what you ate, what you would skip. If a sentence
   could appear on any travel site, cut it.
4. **Follow the 10:1 rule.** For every post or comment about the site, make at least ten ordinary
   contributions on Reddit that have nothing to do with it. Answer questions, add corrections, vote.
5. **Read the sub's rules the day you post.** Flair, self-promotion policy and "no blogs" rules differ
   per sub and change. r/korea and r/koreatravel both have explicit self-promotion rules; check them.
6. **One sub per post, days apart, different text.** The same text in three subs in one day is spam
   by Reddit's definition, even when it is good.
7. **Reply to every comment, fix what people correct, and say so.** That is what makes a post look
   like a person, not a campaign.
8. **Never argue with a removal.** Read the reason, fix the post, wait, try a different sub later.

## Starting again after the block

- Appeal once through Reddit's form, briefly: say the posts were link-only, that you understand why,
  and what you will do differently (content in the post, one link, 10:1).
- Then be an ordinary member for a few weeks: answer walking, hiking and food questions in
  r/koreatravel, r/Seoul, r/Busan, r/JejuIsland with full answers and no link.
- The first post about the site comes after that, and it should be the post below that needs the
  link the least.

## Outlines (facts only: write the prose yourself)

Each outline lists what a complete, standalone post needs. Pull the exact stop names, times and
distances from the pins in the kmz file for that path (see the blogwriting skill's `dump_kmz.py`) or
from the guide text in `src/data/travel.ts`, and add your own experience on top.

### A. r/koreatravel: one walk, told in full

Pick one walk you have done recently. Haebangchon late evening or Naksan to Cheonggyecheon work
best because they have a clear order and a dinner stop.

- Title: the walk and the promise, no link. For example "A 2.4 km evening walk through Haebangchon:
  stairs, a roofed market, rooftops, and the city wall".
- Open with why you walk it and when you last did.
- The route, stop by stop, in order, with how to get to the start (bus or station exit) and the
  walking time between stops. Everything the map has, written out.
- Food: the two or three places you actually ate at, what you ordered, roughly what it cost, whether
  there was a queue.
- Pitfalls: steep bits, unlit stairs, the village bus on the narrow road, what time the light goes.
- End with a question that invites answers, such as which rooftop people prefer.
- Last line, optional: the map link, marked as yours.

### B. r/Seoul: a comparison post

"Which Seoul fortress wall section is the best evening walk: Naksan, Inwangsan or Namsan?" Compare
the three with distance, climb, time, view, difficulty, how to get there, and your own pick with a
reason. No link needed at all; add it in a comment only if asked.

### C. r/Busan or r/JejuIsland: a seasonal, dated post

Cherry blossom in Busan, posted in early March with the expected dates and the four walks, each with
start station, length, flat or hilly, and the best time of day. For Jeju, Olle routes 5 to 7 with the
stamp boxes, toilets and where to eat in Seogwipo. These are useful on their own; the site is a footnote.

### D. Replies to existing threads

Answering "any good walks in Seoul?" with a full answer is worth more than any post and is read for
years. Give the route in the reply itself, three to six lines. Mention the map only if it adds
something the reply cannot, and say it is yours.

## What we do not do

- No posts whose body is a link plus a sentence.
- No pasting of text from this file, the site, or an AI assistant as the post.
- No cross-posting the same text, no new accounts to get around a block, no asking friends to upvote.
- No links in titles, no shortened links, no tracking parameters.

## After posting

- Watch GoatCounter (https://jjsoftware-my-travel-path.goatcounter.com) for the referrer and countries.
- A reported closed shop gets the Naver status check and a kmz re-import, then a reply saying it is fixed.
