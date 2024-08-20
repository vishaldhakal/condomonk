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
      siteId: this.siteId,
      hitType: hitType,
      eventCategory: eventCategory,
      eventData: eventData,
      pageUrl: window.location.href,
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

  var queue = window.customTracker.q || [];
  for (var i = 0; i < queue.length; i++) {
    instance[queue[i][0]].apply(instance, queue[i].slice(1));
  }

  window.customTracker = function () {
    instance[arguments[0]].apply(
      instance,
      Array.prototype.slice.call(arguments, 1)
    );
  };
})(window);
