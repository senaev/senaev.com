async function getTopics() {
    try {
      if (
        "browsingTopics" in document &&
        document.featurePolicy.allowsFeature("browsing-topics")
      ) {
        const topics = await document.browsingTopics();
        console.log(
          "Called iframe:",
          window.location.hostname,
          topics,
          "\nNumber of topics: ",
          topics.length
        );
        return Promise.resolve(topics);
      } else {
        console.log("document.browsingTopics() not supported");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }

  (async function () { 
    const topics = await getTopics();
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const message = JSON.stringify({
      segment: {
        domain: window.location.hostname,
        topics,
        bidder: params.get("bidder"),
      },
      date: Date.now(),
    });
    window.parent.postMessage(message, "*");
  })();