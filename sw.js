const CACHE_NAME = 'hesab-app-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// نصب سرویس‌ورکر و ذخیره فایل‌ها در حافظه کش گوشی
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// استفاده از فایل‌های ذخیره‌شده زمانی که اینترنت قطع است
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// پاک کردن حافظه کش قدیمی وقتی کدها را به‌روزرسانی می‌کنید
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
