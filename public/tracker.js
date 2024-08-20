// public/tracker.js
(function (window) {
  var CustomTracker = function () {
    this.siteId = null;
    this.queue = [];
  };

  CustomTracker.prototype.create = function (siteId) {
    this.siteId = siteId;
  };

  CustomTracker.prototype.send = function (hitType, eventCategory, eventData) {
    var data = {
      site_id: this.siteId,
      hit_type: hitType,
      event_category: eventCategory,
      event_data: eventData,
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
    };

    fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => console.log("Success:", data))
      .catch((error) => console.error("Error:", error));
  };

  var instance = new CustomTracker();

  // Process any queued commands
  var queue = window.customTracker.q || [];
  for (var i = 0; i < queue.length; i++) {
    if (Array.isArray(queue[i])) {
      instance[queue[i][0]].apply(instance, queue[i].slice(1));
    } else if (typeof queue[i] === "function") {
      queue[i](instance);
    }
  }

  // Override the global customTracker function
  window.customTracker = function () {
    var args = Array.prototype.slice.call(arguments);
    var command = args.shift();
    if (typeof instance[command] === "function") {
      instance[command].apply(instance, args);
    }
  };
})(window);
