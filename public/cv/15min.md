
<!-- Version for senaev.com website from Obsidian Vault, copy content below  -->

## About Me

Frontend Engineer with a strong background in advertising and multimedia technologies and over five years of team leadership.

Strive to continuously improve professional and personal skills.

## My Journey to Becoming a Software Engineer

My passion for software development started in childhood, though I initially believed it was "too cool and too smart for me."

At 14, I moved to Yekaterinburg to attend college. [College](https://urtt.ru/) introduced me to programming basics, but I struggled to understand how to build upon or apply this knowledge. After the graduation, I decided to continue my education through correspondence courses at the [Ural Federal University](https://urfu.ru/en/), focusing on computer networks in the Faculty of Radio Engineering. This format meant spending only about one month per year at the university.

During university laboratory work, I discovered I had a natural aptitude for C++ programming, completing an entire semester's worth of assignments in a single day while my classmates struggled. At the time, I was running a computer repair business with my best friend throughout Yekaterinburg. While the income was decent and I enjoyed the work, I knew it wouldn't lead to becoming a highly sought-after specialist.

This realization, combined with my growing confidence in programming, led me to make a pivotal decision: I closed my computer repair business to focus on learning to code and pursuing a software development career. I was so committed that I was willing to work for free to gain experience.

## iTaxio

My journey began with learning PHP and sending countless resumes while working on personal projects. In October 2013, I got my first break with a startup developing a Yandex Taxi competitor called [iTaxio](https://vk.com/itaxio). The startup, founded by the owner of Novosibirsk's most popular taxi service, hired me largely based on my professional appearance and ability to use technical terminology, despite my limited experience.

I was brought in to replace another developer who had already built the MVP using KnockoutJS. I quickly switched from PHP to JavaScript and learned through trial and error. The salary of 25-35 thousand rubles was decent, and I gained valuable experience with KnockoutJS, jQuery, and Apache Cordova. However, without proper mentorship my progress was slow, and after one year founder decided to let me go along with the CTO when a more experienced developer joined the company.

## Tensor-SBIS

This setback proved beneficial, as the experienced developer who replaced me pointed out crucial areas for improvement: OOP, Backbone JS, and fundamental layout principles. I spent the next few months intensively studying these technologies, eventually landing a position at [Tensor-SBIS](https://www.tensor-sbis.ru/) in October 2014 after completing an impressive test task using Backbone JS and CSS Animations.

At Tensor-SBIS, I became the first frontend engineer in their electronic tenders division, working in a small team of three. The environment allowed me to learn their internal frameworks wile [Ext.js](https://www.sencha.com/products/extjs/) while spending my spare time developing pet projects.

## MiraLogic

In June 2015, I joined [MiraLogic](https://miralogic.ru/), a B2B and B2C telecom company in Yekaterinburg, where I worked on router interfaces and a major platform update for weburg.net. Though the platform project eventually disbanded, I gained valuable CSS experience and had my first exposure to Angular.js, though I preferred studying React.js with [Flux](https://ru.legacy.reactjs.org/blog/2014/05/06/flux.html) architecture at that time.

My first tech conference attendance, [Front Talks](https://fronttalks.ru/), proved to be a turning point, leading to interviews with Yandex. After a two-month interview process, I secured a position there, with my CSS skills particularly impressing my future supervisor.

## Yandex

### Frontend developer in Video Advertisement

My adventure at Yandex began on February 8, 2016, when I joined as a junior frontend engineer. I had an interesting choice to make between joining either the Geo services or [advertisement department](https://yandex.ru/adv). I chose advertisement after being told "There are all the money, in advertisement" - a statement that would prove quite true over the years.

I was assigned to the video advertisement team, where my initial task was to support the JavaScript version of their ad player. At the time, Adobe Flash Player was still the primary tool for displaying ads, but the team was in transition. The JavaScript implementation was basic, with only half the code converted to TypeScript. It took me two weeks to fully grasp the player's codebase.

The transition to Yandex was challenging - the work was twice as demanding as my previous roles. I felt a strong responsibility to prove myself worthy of their trust, which meant setting aside old habits and focusing entirely on the project.

My first major challenge was implementing [VPAID](https://iabtechlab.com/standards-old/video-player-ad-interface-definition-vpaid/) and AdPod support (enabling multiple videos in one ad slot, similar to YouTube's system). After studying the specifications and examining other VPAID players, I completed the implementation within a couple of weeks.

Over the next year, I mastered all contemporary Video Advertisement standards - VPAID, VAST, and VMAP. Our team's scope expanded significantly: we developed a Content Video Player for [Kinopoisk](https://hd.kinopoisk.ru/) trailers, supported online sports event streams, implemented DRM in the Content Player, and enhanced the InStream player with preloading capabilities.

One of our ambitious projects involved implementing "[stitched ads](https://adcism.co.uk/what-is-ad-stitching/)" in the Stream player - a server-side ad insertion system with dynamic ad controls and visibility measurements. We successfully created a system supporting targeted, personalized instream midrolls that could replace traditional TV broadcast advertisements. However, the project was eventually discontinued due to the extensive hardware requirements needed for real-time stream transcoding for each user.

Not all projects succeeded. I experimented with a dual video element player solution aimed at improving performance, but despite thorough testing, we couldn't achieve the expected performance improvements across any metrics.

A significant milestone was completely phasing out Adobe Flash Player support in both Advertisement and Content players, rewriting everything in TypeScript. By late 2017, our Video Advertisement team merged with the "Advertising interfaces" team, which also handled Banner Advertisement.

By 2018, I had become the sole developer responsible for both [Yandex Video Player](https://yandex.ru/support2/video-player/en/) and[ Yandex Advertising Player](https://yandex.ru/support2/adfox/en/banners/specs/video), despite video advertisement revenue growing substantially. The team eventually expanded, and I focused primarily on the advertising aspects while helping to mentor new team members.

I led several key initiatives, including developing a tool to detect video autoplay capabilities across different browsers (Request Autoplay Ability). We implemented comprehensive telemetry in our players, created a client-server logs infrastructure with data bus, [YTsaurus](https://ytsaurus.tech/) database, dashboards, and automated alerts. I also integrated CSP problem detection to identify publisher-side issues.

To ensure reliable deployments, I implemented a versioned release system for the advertising player library and developed a client-side A/B testing framework. The testing infrastructure I built included unit tests (using Jest), end-to-end tests (using [Selenium](https://www.selenium.dev/) with [Karma](https://karma-runner.github.io/latest/index.html) and [Hermione](https://www.npmjs.com/package/hermione) frameworks), and screenshot testing (using Selenium with Hermione).

### Team Leader of Advertising Player

In March 2019, I relocated to Moscow amid political changes in the team at Yandex. After some team members moved to another department and new people joined, my new management structure was established. A decision was made to separate the Advertising and Content player into two distinct units, and I chose to work with the Advertising player. After proving myself, I was given a team to lead, first informally for over six months before receiving official team leader status.

While the Content player's technology moved to another department, I remained with the Advertising Player, leading a team of three developers. Though I continued to spend most of my time coding, I gradually took on more management responsibilities, including customer communications and planning negotiations. Initially, I thought I needed to improve my delegation skills, but looking back, this wasn't a major issue. Instead, I focused on learning how to work with people effectively and optimize communication.

As team leader, I oversaw all projects and integrations in the Video Advertisement player. Over two years, my team significantly enhanced both the [Instream and Outstream](https://www.waytogrow.com/blog/instream-vs-outstream-video-ads-pros-cons/) versions of the Yandex Advertising Video Player. We partnered with various organizations, completely rebuilt our public library's API, updated documentation, and created specialized integrations for platforms like [Maxima Telecom's](https://maximatelecom.ru/en) Underground Wi-Fi monetization (AdLoader integration with domains limitation), https://tvrain.tv/ (Header Bidding approach to play video ads) and others.

The player underwent a complete visual redesign implemented in strategic phases for optimal user experience and profitability. For instream players, we introduced new video advertising formats, including tailored solutions for https://dzen.ru that boosted instream revenue by 10% on Android and 2% on Desktop (iOS had minimal impact). We added support for Overlay (ad block above the video content), Inroll (ad block by publisher request), and PauseRoll formats for InStream video.

Our outstream achievements were equally impressive. We developed a new outstream block for Yandex Video with light and dark themes, resulting in a 6% revenue increase on mobile. The outstream redesign generated about 30% more long clicks. We implemented support for Fullscreen, FlyRoll (in the corner of website), and Sticky Block (in the bottom of the screen) formats, packshot capabilities for all creative types and players, social advertisement integration, and vertical video formats. Adding video to image banners improved conventional web advertisement quality, earning 15% more revenue for creatives featuring video.

We enhanced the audio experience by supporting subtitles in the advertising player, implemented in 2024 after my departure. We also unified volume levels across creatives and handled muted ads appropriately.

To enable third-party DSP advertisements on Yandex services, we developed a Safe-Frame for playing external creatives.

In terms of technical standards, we created a VPAID "decorator" to enhance viewability measurement according to [MRC standards](https://www.iab.com/wp-content/uploads/2015/06/MRC-Viewable-Ad-Impression-Measurement-Guideline.pdf), for all creatives, supported OMID verification, and developed the "AdCreative" standard for video creatives, incorporating VPAID, OMID, and SIMID support.

We successfully combated ad blockers, recovering about 12% of video ad revenue.

We also supported [AdFox Header Bidding](https://yandex.ru/support2/adfox/en/monetization/hb-about) integration in Video Ads.

Performance optimization was a key focus. We implemented first-frame image technology using WebP format, significantly improving visual performance. Our telemetry system for measuring "real quality" utilized real-time metrics and Yandex Crowd assessors, and these metrics helped us doubling our quality metrics to reach YouTube's standards. We optimized media file selection algorithms, achieving 30% faster first-frame loading speeds. Preloading video files and static assets is also helped and resulted in approximately 25% increased ad revenue in outstream during early 2020.

We improved VPAID creative performance, making legacy creatives more than twice as fast through a new system I developed. We eliminated a 100ms delay in creative end processing by transitioning from image pixel tracking to sendBeacon.

To enhance cookie effectiveness, we consolidated all video advertisement under the yandex.ru hostname.

The "Unified Video Session" project optimized ad viewing across Yandex Video Supply, requiring extensive telemetry and underlying logic support from our player.

I also implemented release automation that reduced deployment time from hours to just a few clicks and added merge queue automation.

In fall 2022, I was promoted while working on the [Media Advertisement](https://yandex.ru/support2/partner/en/web/units/formats/video) project. We aimed to attract major clients like Coca-Cola and Apple by developing comprehensive tools for Brand Safety, Brand Lift, Anti Fraud, and Statistics. Despite facing challenges from sanctions against Russia that impacted advertising budgets, we made significant strides in improving media campaigns across our ad network. We achieved MRC standard compliance for [Yandex Direct](https://yandex.com/support/direct/technologies-and-services/iab-compliance.html) and [AdFox](https://yandex.ru/adv/news/daydzhest-dlya-pablisherov-pryamye-razmescheniya-po-mezhdunarodnym-standartam-v-adfox-i-novye-obuchayuschie-roliki), passed IAB audit, and integrated numerous verifiers including Weborama, Adriver, Adloox, Oracle Moat, Adserving, Mediascope, Sizmek, and OM SDK.

My implementation of Zero Bug Policy (ZBP) led to successful bug fix plans. From July 2022 through the end of 2024, we maintained an incident-free record – a marked improvement from our previous experience of three to four major money-losing incidents. This success came through enhanced test coverage, improved regression testing systems, and robust telemetry.

Throughout my tenure, my team composition evolved, growing from three to five members. Despite these changes, we consistently delivered innovative solutions and maintained high performance standards in video advertising technology.

### Team leader of International Advertising Interfaces

In December 2022, an opportunity arose in the International Advertising department at Yandex. They were seeking someone to build a team and develop both render infrastructure and a content management system for a new advertising network interfaces. Despite the ambitious and daunting nature of the task, I embraced this startup-like opportunity I had been seeking. The position required relocation to Belgrade, Serbia - a move I was eager to make.

Within two weeks, I completed my existing tasks and transitioned my responsibilities, which proved I could have made this transition earlier. I began researching my potential contributions in the new role, facing extreme uncertainty about the project's implementation. My initial task was to explore options and reduce this uncertainty.

After two weeks, I was appointed team leader of both Frontend and Backend teams. With a Backend team leader already in place, I focused on hiring people and making architectural decisions. Within two months, we decided to deploy our services in AWS cloud, and by the four-month mark, we had a proof of concept for our interfaces.

🤷‍♂️ This part of the document is missing because the information is too recent. Please contact me if you would like to clarify the details.

### Looking back

During my time at Yandex, I conducted over 150 job interviews covering layout, algorithms, system design, and culture fit. I personally hired around 20 people for my team.

I have also delivered three public speeches in English and designed the “Knight’s Move” task for a programming championship, which has been solved more than 1,500 times to date.

## Skills

### Hard

- HTML / CSS / JavaScript / TypeScript
- React.js / Webpack
- Node.js
- Multimedia in browser (MSE, DRM, Encoding)
- Jest / Selenium / Playwright
- A/B Testing, Availability
-  Browser Telemetry and Performance Optimization

### Soft

- Team Leadership / People and Project Management
- Hiring / Technical Interviews
- Mentoring
- Public Speaking
