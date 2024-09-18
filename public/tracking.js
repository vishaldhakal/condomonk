class WidgetTracker {
  constructor(customerId) {
    if (!customerId) {
      throw new Error("Customer ID is required");
    }
    this.customerId = customerId;
    this.baseUrl = "https://api.condomonk.ca/track";
    this.version = "1.0.0";
    this.visitorId =
      this.getCookie("WidgetTrackerCookie") || this.generateVisitorId();
    this.isInitialized = false;
  }

  init() {
    try {
      if (this.isParentTracking()) {
        console.log("Parent is already tracking. Aborting initialization.");
        return;
      }

      this.setCookie("WidgetTrackerCookie", this.visitorId, 365);
      this.loadConfig();
      this.setupFormTracking();
      this.trackPageview();
    } catch (error) {
      console.error("Error initializing WidgetTracker:", error);
    }
  }

  isParentTracking() {
    try {
      let currentWindow = window;
      while (currentWindow !== window.top) {
        currentWindow = currentWindow.parent;
        if (
          currentWindow.widgetTracker &&
          currentWindow.widgetTracker.isInitialized
        ) {
          return true;
        }
      }
    } catch (e) {
      // Cross-origin error, assume no parent tracking
      console.warn("Cross-origin error when checking parent tracking:", e);
    }
    return false;
  }

  loadConfig() {
    this.sendRequest("/config/", {})
      .then((config) => {
        if (config && config.widgetConfig) {
          localStorage.setItem("cta_config", JSON.stringify(config));
        }
        this.isInitialized = true;
        this.injectTrackingPixel();
      })
      .catch((error) => {
        console.error("Error loading config:", error);
      });
  }

  setupFormTracking() {
    document.addEventListener("submit", (event) => {
      if (event.target.tagName === "FORM") {
        this.trackForm(event.target);
      }
    });
  }

  trackPageview() {
    this.sendRequest("/pages/", this.getPageData()).catch((error) => {
      console.error("Error tracking pageview:", error);
    });
  }

  trackForm(form) {
    try {
      const formData = {
        id: form.id,
        action: form.action,
        method: form.method,
        fields: Array.from(form.elements)
          .filter((el) => el.name && !el.name.match(/password/i))
          .map((el) => ({ name: el.name, value: el.value })),
      };
      this.sendRequest("/form/", {
        form: formData,
        page: this.getPageData(),
      }).catch((error) => {
        console.error("Error tracking form:", error);
      });
    } catch (error) {
      console.error("Error preparing form data:", error);
    }
  }

  identify(email) {
    if (email && email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      this.sendRequest("/identify/", { email }).catch((error) => {
        console.error("Error identifying user:", error);
      });
    } else {
      console.warn("Invalid email provided for identification");
    }
  }

  sendRequest(endpoint, data) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", this.baseUrl + endpoint, true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("X-CSRFToken", this.getCookie("csrftoken"));
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              resolve(JSON.parse(xhr.responseText));
            } catch (error) {
              reject(new Error("Invalid JSON response"));
            }
          } else {
            reject(new Error(`HTTP error! status: ${xhr.status}`));
          }
        }
      };
      xhr.onerror = () => {
        reject(new Error("Network error occurred"));
      };
      xhr.send(
        JSON.stringify({
          ...data,
          customerId: this.customerId,
          visitorId: this.visitorId,
          version: this.version,
        })
      );
    });
  }

  getPageData() {
    return {
      url: window.location.href,
      title: document.title,
      referrer: document.referrer,
    };
  }

  injectTrackingPixel() {
    try {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.src = this.baseUrl + "/pixel/";
      document.body.appendChild(iframe);
    } catch (error) {
      console.error("Error injecting tracking pixel:", error);
    }
  }

  setCookie(name, value, days) {
    try {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    } catch (error) {
      console.error("Error setting cookie:", error);
    }
  }

  getCookie(name) {
    try {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? match[2] : null;
    } catch (error) {
      console.error("Error getting cookie:", error);
      return null;
    }
  }

  generateVisitorId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }
}

window.widgetTracker = {
  create: function (customerId) {
    try {
      const tracker = new WidgetTracker(customerId);
      tracker.init();
      this.instance = tracker;
      return tracker;
    } catch (error) {
      console.error("Error creating WidgetTracker:", error);
    }
  },
  identify: function (email) {
    if (this.instance) {
      this.instance.identify(email);
    } else {
      console.warn("WidgetTracker instance not created. Call create() first.");
    }
  },
};

// Auto-initialize if there's a queue
if (window.widgetTrackerQ && Array.isArray(window.widgetTrackerQ)) {
  window.widgetTrackerQ.forEach((args) => {
    if (Array.isArray(args) && args.length > 0) {
      if (args[0] === "create") {
        window.widgetTracker.create.apply(null, args.slice(1));
      } else if (typeof window.widgetTracker[args[0]] === "function") {
        window.widgetTracker[args[0]].apply(
          window.widgetTracker,
          args.slice(1)
        );
      }
    }
  });
}
