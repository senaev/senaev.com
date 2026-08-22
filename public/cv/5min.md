<!-- Version for senaev.com website from Obsidian Vault, copy content below  -->

## Experience

### Datadog <time>Jun 1, 2026 — present</time>

#### Senior Full-Stack Engineer in Flex Logs

I work on [Flex Logs](https://docs.datadoghq.com/logs/log_configuration/flex_logs/) – a high-load big data storage for logs. It is multi-tenant and spread across several data centers. Customers can keep petabyte-scale log volumes for months and still query them on demand.

The role is genuinely full-stack: React and TypeScript interfaces, Java and Go services, and monitoring infrastructure as code in Terraform.

My main area is Query Pool Observability – how customers see and control the query capacity they pay for. It covers picking the right capacity for a workload, showing how much of it is still free, deciding what happens to queries once it runs out, and measuring the storage and compute each customer actually uses so it can be billed correctly.

I also own a set of service monitors and runbooks, maintain the project documentation and processes, take interrupt handler duty, and write RFCs on the evolution of the product.

### Yandex <time>Feb 8, 2016 — May 31, 2026</time>

#### Leading Yandex International Advertising Interfaces <time>Dec 2022 - May 2026</time>

In December 2022, I embraced an opportunity at Yandex's International Advertising department in Belgrade, Serbia. I was tasked with building a team and developing infrastructure for a new advertising network interfaces. I was leading both Frontend and Backend teams, focusing primarily on recruitment and architectural decisions.

I chose to build on public cloud infrastructure and personally owned both the interfaces and the DevOps side until we hired a dedicated infrastructure lead. By the four-month mark we had a working proof of concept of the cabinets, and by fall 2023 the team had grown to ten engineers and delivered an MVP.

Our technical infrastructure combined [ClickHouse](https://clickhouse.com/), [YTsaurus](https://ytsaurus.tech/), and [echarts](https://echarts.apache.org/en/index.html) for statistics, with [KeyCloak](https://www.keycloak.org/) handling authentication. We built a modern tech stack using React.js, Typescript, Java, Kotlin, and various other technologies, successfully decoupling our banner rendering infrastructure from Yandex's integrated tools within nine months.

Early 2024 brought significant restructuring as we organized into three specialized departments, and my team grew to 20 people.

Through 2024 we focused on self-service, giving advertisers and agencies the ability to run campaigns without a manager. We reworked authentication and role-based access, integrated with CRM, automated billing with in-interface reports and card payments, and shipped self-registration, banner previews and campaign customization. On the display side we built our own rendering, telemetry and A/B experiments infrastructure, and moved banner serving closer to users across several regions.

We also optimized our [Prebid](https://prebid.org/) product, halving traffic acquisition costs without losing a single publisher, and contributed [User ID](https://docs.prebid.org/dev-docs/modules/userid-submodules/yandex.html) and [Analytics](https://docs.prebid.org/dev-docs/analytics/yandex.html) modules to the Prebid ecosystem. In parallel, I worked on cookieless tracking to reduce the impact of ITP and Google's Privacy Sandbox, and presented our approach at a CMO dinner in Istanbul.

In the middle of 2024 we started a Retail Media project and hired five engineers for it — a complete advertising network that large retailers could embed into their own web, app and customer data platforms. By the end of the year the platform supported mobile attribution and RoAS campaigns, and we rebranded [Yandex Ads](https://yandex.com/adv/) into [Yango Ads](https://yango-ads.com/), a project that involved every team from legal to runtime.

2025 was about finishing what we had started. We rebuilt the cabinets around ad groups, which unblocked media campaigns, replaced [OpenFGA](https://openfga.dev/) with our own access schema, stabilized authentication between [KeyCloak](https://www.keycloak.org/) and [Yandex Passport](https://passport.yandex.com/), migrated the codebase and its pipelines into Yandex's internal monorepo, and completed the move of banner rendering off the legacy platform. In February 2026 the department was restructured and our business was handed over to another office — I spent my last two months making sure that all fifteen of my reports found new positions before leaving myself.

Over my career in Yandex, I conducted more than 250 job interviews and hired more than 50 engineers for my teams. I gave three public speeches in English and even created a programming championship task that's been solved over 1,500 times.

#### Leading Yandex Advertising Player <time>Sep 2019 - Dec 2022</time>

After moving to Moscow in 2019, I took on team leadership. Initially managing three developers (later expanding to five), I balanced hands-on coding with leadership responsibilities while overseeing the complete renovation of both [Instream and Outstream](https://www.waytogrow.com/blog/instream-vs-outstream-video-ads-pros-cons/) advertising players.

The largest piece of engineering I owned personally was a new rendering system for [VPAID](https://iabtechlab.com/standards-old/video-player-ad-interface-definition-vpaid/) creatives. I designed and wrote it, migrated more than half of the legacy inventory onto it, and made those creatives twice as fast — then applied the same approach to non-video VPAID for a comparable speedup.

I also built the infrastructure that kept video ads serving to users running ad blockers, which recovered roughly 12% of video ad revenue, and designed "AdCreative", a single Yandex-wide standard for video creatives covering VPAID, [OMID](https://iabtechlab.com/standards/open-measurement-sdk/) and [SIMID](https://iabtechlab.com/standards/simid/). Every video creative at Yandex still ships in that format. Around it I wrote a VPAID decorator that wraps any third-party creative to add [MRC-compliant](https://mediaratingcouncil.org/) viewability measurement, and a Safe-Frame for running external DSP creatives on Yandex domains.

Performance was a constant thread. Changing how the player selected media files cut first-frame load time by 30%, preloading video and static assets added about 25% of outstream ad revenue, and replacing image-pixel tracking with sendBeacon removed a 100ms delay at the end of every creative. Adding video to image banners lifted revenue on those creatives by 15%. We also built quality telemetry with human assessors and doubled measured playback quality, benchmarked against YouTube.

From 2021 we focused on attracting major international clients through brand safety and anti-fraud tooling. We reached [MRC standards](https://www.iab.com/wp-content/uploads/2015/06/MRC-Viewable-Ad-Impression-Measurement-Guideline.pdf) compliance for [Yandex Direct](https://yandex.com/support/direct/technologies-and-services/iab-compliance.html) and [AdFox](https://yandex.ru/adv/news/daydzhest-dlya-pablisherov-pryamye-razmescheniya-po-mezhdunarodnym-standartam-v-adfox-i-novye-obuchayuschie-roliki) and integrated multiple [verification services](https://clearcode.cc/blog/ad-verification/). I introduced a Zero Bug Policy, and the service then ran without a single incident from July 2022 through 2024 — before it, we had been losing significant money to three or four major incidents a year.

#### Frontend developer in Advertising Player <time>Feb 2016 - Sep 2019</time>

Starting as a junior frontend engineer in [video advertisement](https://yandex.com/adv/products/video), I took on challenging projects like implementing [VPAID](https://iabtechlab.com/standards-old/video-player-ad-interface-definition-vpaid/) and [AdPod](https://www.iab.com/wp-content/uploads/2016/04/VAST4.0_Updated_April_2016.pdf) support, and within a year I had covered every contemporary video ad standard – VPAID, [VAST](https://iabtechlab.com/standards/vast/) and [VMAP](https://iabtechlab.com/standards/vmap/). I worked on the [Content Video Player](https://yandex.ru/support2/video-player/en/) for [Kinopoisk](https://hd.kinopoisk.ru/), implemented [DRM](https://en.wikipedia.org/wiki/Digital_rights_management), and built a "[stitched ads](https://adcism.co.uk/what-is-ad-stitching/)" system that inserted personalized midrolls into live broadcasts server-side.

By 2018 I was the only engineer responsible for the video advertising player across the whole of Yandex, while revenue from video advertising kept growing sharply. In that period I removed [Flash](https://en.wikipedia.org/wiki/Adobe_Flash_Player) support entirely and moved the player to TypeScript, and I researched and built Request Autoplay Ability – a tool that detects and controls whether a browser will permit video autoplay, which the player needed in order to adapt to tightening browser restrictions.

I also built the player's telemetry from scratch: a client-server logging pipeline with its own data bus, [YTsaurus](https://ytsaurus.tech/) storage, dashboards, auto-generated alerts and an on-call schedule, plus detection of publisher-side [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) problems. To make every release reversible I added library versioning and a client-side A/B experiment system, and I introduced unit, end-to-end and screenshot testing to the players.

### MiraLogic <time>Jun 22, 2015 - Feb 3, 2016</time>

#### Frontend developer in telecom services

At [MiraLogic](https://miralogic.ru/), I worked on router interfaces and a major platform update for [weburg.net](https://weburg.net/). Though the platform project eventually disbanded, this role gave me valuable CSS experience and my first exposure to [Angular.js](https://angularjs.org/). During this time, I was also studying [React.js](https://react.dev/) with [Flux](https://legacy.reactjs.org/blog/2014/05/06/flux.html) architecture. Attending my first tech conference, [Front Talks](https://fronttalks.ru/), proved to be a turning point, leading to interviews with Yandex.

### Tensor-SBIS <time>Oct 6, 2014 - Jun 19, 2015</time>

#### Frontend developer in the electronic tenders division

After improving my skills in OOP and [Backbone JS](https://backbonejs.org/), I landed a position at [Tensor-SBIS](https://www.tensor-sbis.ru/) by completing a test task using Backbone JS and CSS Animations. I became their first frontend engineer in the electronic tenders division, working in a small team of three. I was learning internal frameworks based on [Ext.js](https://www.sencha.com/products/extjs/) while developing pet projects in my spare time.

### iTaxio <time>Oct 4, 2013 - Aug 7, 2014</time>

#### Frontend developer for mobile applications

My first real break came with [iTaxio](https://vk.com/itaxio), a [Yandex Taxi](https://go.yandex/) competitor. I had to quickly switch from PHP to JavaScript, learning everything through trial and error. The salary was decent at 25-35 thousand rubles, and I gained valuable experience with [KnockoutJS](https://knockoutjs.com/), [jQuery](https://jquery.com/), and [Apache Cordova](https://cordova.apache.org/) (Phonegap).
