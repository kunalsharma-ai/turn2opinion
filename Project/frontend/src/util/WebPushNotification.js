export default class PushNotification {
    #permission;
    #sw;
    #subscription;
    #serverUrl;

    constructor(file = "/sw.js", serverUrl = "/api/v1/notification") {
        return false; // Disable this class by default
        this.#sw = new SW(file);
        this.#serverUrl = serverUrl;
    }

    static isSupported() {
        return false;
        return 'serviceWorker' in navigator && 'PushManager' in window;
    }

    decodeUrl(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
    }

    async request() {
        if (this.#permission) return this.#permission === "granted";
        this.#permission = await Notification.requestPermission();
        return this.#permission === "granted";
    }

    async subscribePush() {
        if (!PushNotification.isSupported()) {
            console.warn("Push notifications are not supported in this browser.");
            return false;
        }

        if (!(await this.request())) return false;

        try {
            const registration = await this.#sw.register();
            let subscription = await registration.pushManager.getSubscription();

            if (!subscription) {
                subscription = await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: this.decodeUrl(
                        'BEl62iUYgUivxIkv69yViEuiBIa40HI6RNcvdM3_KLZ4YQ8M4B_jXZOhNJmn7hSEKsVNnLTzjkIDUlXX7Z5rXoA'
                    )
                });
            }

            this.#subscription = subscription;

            // Send to server
            await this.sendSubscriptionToServer(subscription);

            return subscription;
        } catch (err) {
            console.error("Push subscription failed:", err);
            return false;
        }
    }

    async sendSubscriptionToServer(subscription) {
        try {
            const res = await fetch(this.#serverUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(subscription)
            });

            if (!res.ok) {
                console.warn("Failed to save subscription on server:", await res.text());
            }
        } catch (err) {
            console.error("Error sending subscription to server:", err);
        }
    }

    async unsubscribe() {
        if (!this.#subscription) return;
        try {
            await this.#subscription.unsubscribe();
            this.#subscription = null;

            // Tell server this user unsubscribed
            await fetch(this.#serverUrl, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ endpoint: this.#subscription?.endpoint })
            });

        } catch (err) {
            console.error("Unsubscribe failed:", err);
        }
    }

    get subscription() {
        return this.#subscription;
    }
}

class SW {
    #registration;
    #file;

    constructor(file = "/sw.js") {
        this.#file = file;
        this.register();
    }

    async register() {
        if (!this.#registration) {
            this.#registration = await navigator.serviceWorker.register(this.#file);
        }
        return this.#registration;
    }
}
