import type { GlobalScope } from './GlobalScope';

export type Bid = {
    adId: string;
    adUnitCode: string;
};

export type BidderTopicsApiConfig = {
    bidder: string;
    iframeURL?: string;
    expiry: number;
};

export type PrebidConfig = {
    userSync?: {
        topics?: {
            maxTopicCaller?: number;
            bidders: BidderTopicsApiConfig[];
        };
    };
};

export type PrebidWindow = GlobalScope & {
    googletag?: {
        cmd: object[];
        pubads: () => {
            disableInitialLoad: VoidFunction;
            refresh: VoidFunction;
            enableSingleRequest: VoidFunction;
        };
        defineSlot: (
            TODO: string,
            size: unknown,
            id: string,
        ) => {
            addService: (arg: unknown) => void;
        };
        enableServices: VoidFunction;
        display: (id: string) => void;
    };
    pbjs?: {
        que: unknown[];
        addAdUnits: (adUnits: unknown) => void;
        requestBids: (params: {
            bidsBackHandler: unknown;
            timeout: unknown;
        }) => void;
        initAdserverSet?: true;
        setTargetingForGPTAsync: VoidFunction;
        getHighestCpmBids: () => Bid[];
        renderAd: (iframeDoc: Document, adId: string) => void;
        setConfig: (config: PrebidConfig) => void;
    };
};
